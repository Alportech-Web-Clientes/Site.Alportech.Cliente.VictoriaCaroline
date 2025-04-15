using Microsoft.AspNetCore.Mvc;
using Site.Alportech.Cliente.VictoriaCaroline.Models;
using System.Globalization;

namespace Site.Alportech.Cliente.VictoriaCaroline.Controllers
{
    public class FormacoesController : Controller
    {
        private readonly GoogleSheetsService _googleSheetsService;
        private const string UsuarioIdFixo = "18a2427d-2e93-4cb2-b292-a8517a6a77af";

        public FormacoesController(GoogleSheetsService googleSheetsService)
        {
            _googleSheetsService = googleSheetsService;
        }

        public async Task<IActionResult> Index()
        {
            var formacoes = (await _googleSheetsService.ObterDadosDaAba<Formacao>("Formacoes"))
                .Where(f => f.IdUsuario == UsuarioIdFixo)
                .OrderByDescending(f => OrdenarFormacoes(f))
                .ToList();

            // Passar dados para a view
            ViewBag.Formacoes = formacoes;

            return View("Formacoes");
        }

        private static DateTime OrdenarFormacoes(Formacao formacao)
        {
            // Formações em andamento primeiro
            if (string.IsNullOrEmpty(formacao.DataFimFormacao))
                return DateTime.MaxValue;

            // Depois ordena por data de término (mais recente primeiro)
            if (DateTime.TryParseExact(formacao.DataFimFormacao, "MM/yyyy",
                CultureInfo.InvariantCulture, DateTimeStyles.None, out var data))
            {
                return data;
            }
            return DateTime.MinValue;
        }
    }
}