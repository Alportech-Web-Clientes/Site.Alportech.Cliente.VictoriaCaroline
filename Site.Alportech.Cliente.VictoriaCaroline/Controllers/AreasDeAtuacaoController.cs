using Microsoft.AspNetCore.Mvc;
using Site.Alportech.Cliente.VictoriaCaroline.Models;
using System.Globalization;

namespace Site.Alportech.Cliente.VictoriaCaroline.Controllers
{
    public class AreasDeAtuacaoController : Controller
    {
        private readonly GoogleSheetsService _googleSheetsService;
        private const string UsuarioIdFixo = "18a2427d-2e93-4cb2-b292-a8517a6a77af";

        public AreasDeAtuacaoController(GoogleSheetsService googleSheetsService)
        {
            _googleSheetsService = googleSheetsService;
        }

        public async Task<IActionResult> Index()
        {
            var areasAtuacao = (await _googleSheetsService.ObterDadosDaAba<AreaAtuacao>("AreasAtuacao"))
                .Where(a => a.IdUsuario == UsuarioIdFixo)
                .OrderByDescending(a => DateTime.ParseExact(
                    a.DataCriacaoAreaAtuacao!,
                    "dd-MM-yyyy HH:mm:ss",
                    CultureInfo.InvariantCulture))
                .ToList();

            // Passar dados para a view
            ViewBag.AreasAtuacao = areasAtuacao;

            return View("AreasDeAtuacao");
        }
    }
}