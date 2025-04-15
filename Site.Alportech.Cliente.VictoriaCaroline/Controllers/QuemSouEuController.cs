using Microsoft.AspNetCore.Mvc;
using Site.Alportech.Cliente.VictoriaCaroline.Models;

namespace Site.Alportech.Cliente.VictoriaCaroline.Controllers
{
    public class QuemSouEuController : Controller
    {
        private readonly GoogleSheetsService _googleSheetsService;
        private const string UsuarioIdFixo = "18a2427d-2e93-4cb2-b292-a8517a6a77af";

        public QuemSouEuController(GoogleSheetsService googleSheetsService)
        {
            _googleSheetsService = googleSheetsService;
        }

        public async Task<IActionResult> Index()
        {
            // Obter dados de todas as abas
            var sobre = (await _googleSheetsService.ObterDadosDaAba<Sobre>("Sobre"))
                .FirstOrDefault(s => s.IdUsuario == UsuarioIdFixo);

            // Passar dados para a view
            ViewBag.Sobre = sobre;

            return View("QuemSouEu");
        }
    }
}