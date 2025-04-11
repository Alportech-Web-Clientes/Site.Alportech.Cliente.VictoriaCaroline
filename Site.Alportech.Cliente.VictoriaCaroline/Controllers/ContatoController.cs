using Microsoft.AspNetCore.Mvc;
using Site.Alportech.Cliente.VictoriaCaroline.Models;
using System.Net.Mail;
using System.Net;


namespace Site.Alportech.Cliente.VictoriaCaroline.Controllers
{
    public class ContatoController : Controller
    {
        private readonly GoogleSheetsService _googleSheetsService;
        private const string UsuarioIdFixo = "18a2427d-2e93-4cb2-b292-a8517a6a77af";
        private const string EmailDestino = "viniciussouzaalves@gmail.com";
        private const string SenhaApp = "hogf hpmb xsce varc"; // Sua senha de app

        public ContatoController(GoogleSheetsService googleSheetsService)
        {
            _googleSheetsService = googleSheetsService;
        }

        public async Task<IActionResult> Index()
        {
            var contatos = await _googleSheetsService.ObterDadosDaAba<Contato>("Contato");
            var contatoUsuario = contatos.FirstOrDefault(c => c.IdUsuario == UsuarioIdFixo);

            return View("Contato", contatoUsuario);
        }
    }
}