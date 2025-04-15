using Microsoft.AspNetCore.Mvc;
using Site.Alportech.Cliente.VictoriaCaroline.Models;
using System.Globalization;

namespace Site.Alportech.Cliente.VictoriaCaroline.Controllers
{
    public class ExperienciasController : Controller
    {
        private readonly GoogleSheetsService _googleSheetsService;
        private const string UsuarioIdFixo = "18a2427d-2e93-4cb2-b292-a8517a6a77af";

        public ExperienciasController(GoogleSheetsService googleSheetsService)
        {
            _googleSheetsService = googleSheetsService;
        }

        public async Task<IActionResult> Index()
        {
            var experiencias = (await _googleSheetsService.ObterDadosDaAba<Experiencia>("Experiencias"))
                .Where(e => e.IdUsuario == UsuarioIdFixo)
                .OrderByDescending(e => OrdenarExperiencias(e))
                .ToList();

            // Passar dados para a view
            ViewBag.Experiencias = experiencias;

            return View("Experiencias");
        }

        private static DateTime OrdenarExperiencias(Experiencia experiencia)
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
    }
}