using Microsoft.AspNetCore.Mvc;
using Site.Alportech.Cliente.VictoriaCaroline.Models;
using System.Globalization;

namespace Site.Alportech.Cliente.VictoriaCaroline.Controllers
{
    public class SobreController : Controller
    {
        private readonly GoogleSheetsService _googleSheetsService;
        private const string UsuarioIdFixo = "18a2427d-2e93-4cb2-b292-a8517a6a77af";

        public SobreController(GoogleSheetsService googleSheetsService)
        {
            _googleSheetsService = googleSheetsService;
        }

        public async Task<IActionResult> Index()
        {
            // Obter dados de todas as abas
            var sobre = (await _googleSheetsService.ObterDadosDaAba<Sobre>("Sobre"))
                .FirstOrDefault(s => s.IdUsuario == UsuarioIdFixo);

            var areasAtuacao = (await _googleSheetsService.ObterDadosDaAba<AreaAtuacao>("AreasAtuacao"))
                .Where(a => a.IdUsuario == UsuarioIdFixo)
                .OrderByDescending(a => DateTime.ParseExact(
                    a.DataCriacaoAreaAtuacao!,
                    "dd-MM-yyyy HH:mm:ss",
                    CultureInfo.InvariantCulture))
                .ToList();

            var experiencias = (await _googleSheetsService.ObterDadosDaAba<Experiencia>("Experiencias"))
                .Where(e => e.IdUsuario == UsuarioIdFixo)
                .OrderByDescending(e => OrdenarExperiencias(e))
                .ToList();

            var formacoes = (await _googleSheetsService.ObterDadosDaAba<Formacao>("Formacoes"))
                .Where(f => f.IdUsuario == UsuarioIdFixo)
                .OrderByDescending(f => OrdenarFormacoes(f))
                .ToList();

            // Passar dados para a view
            ViewBag.Sobre = sobre;
            ViewBag.AreasAtuacao = areasAtuacao;
            ViewBag.Experiencias = experiencias;
            ViewBag.Formacoes = formacoes;

            return View("Sobre");
        }

        private DateTime OrdenarExperiencias(Experiencia experiencia)
        {
            // Trabalhos atuais primeiro
            if (experiencia.TrabalhoAtual == "S")
                return DateTime.MaxValue;

            // Depois ordena por data de início (mais recente primeiro)
            if (DateTime.TryParseExact(experiencia.DataInicioExperiencia, "MM/yyyy",
                CultureInfo.InvariantCulture, DateTimeStyles.None, out var data))
            {
                return data;
            }
            return DateTime.MinValue;
        }

        private DateTime OrdenarFormacoes(Formacao formacao)
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