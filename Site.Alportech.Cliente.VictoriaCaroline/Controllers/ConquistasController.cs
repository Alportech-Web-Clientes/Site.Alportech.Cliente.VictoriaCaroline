using Microsoft.AspNetCore.Mvc;
using Site.Alportech.Cliente.VictoriaCaroline.Models;
using System.Globalization;

namespace Site.Alportech.Cliente.VictoriaCaroline.Controllers
{
    public class ConquistasController : Controller
    {
        private readonly GoogleSheetsService _googleSheetsService;
        private const string UsuarioIdFixo = "18a2427d-2e93-4cb2-b292-a8517a6a77af";

        public ConquistasController(GoogleSheetsService googleSheetsService)
        {
            _googleSheetsService = googleSheetsService;
        }

        public async Task<IActionResult> Index()
        {
            var conquistas = await _googleSheetsService.ObterDadosDaAba<Conquista>("Conquistas");

            var conquistasOrdenadas = conquistas
                .Where(c => c.IdUsuario == UsuarioIdFixo)
                .OrderByDescending(c => ParseDataConquista(c.DataConquista!))
                .ToList();

            return View("Conquistas", conquistasOrdenadas);
        }

        private DateTime ParseDataConquista(string dataConquista)
        {
            // Assume formato "MM/yyyy" ou "MM-yyyy"
            if (DateTime.TryParseExact(dataConquista, new[] { "MM/yyyy", "MM-yyyy" },
                CultureInfo.InvariantCulture, DateTimeStyles.None, out var result))
            {
                return result;
            }

            // Fallback para o primeiro dia do mês se não conseguir parsear
            return DateTime.MinValue;
        }
    }
}