using Microsoft.AspNetCore.Mvc;
using Site.Alportech.Cliente.VictoriaCaroline.Models;

public class PerfilUsuarioViewComponent : ViewComponent
{
    private readonly GoogleSheetsService _sheetsService;

    public PerfilUsuarioViewComponent(GoogleSheetsService sheetsService)
    {
        _sheetsService = sheetsService;
    }

    public async Task<IViewComponentResult> InvokeAsync()
    {
        var usuario = await _sheetsService.ObterUsuarioPrincipal();
        var redes = await _sheetsService.ObterRedesSociaisDoUsuario();

        var redesDoUsuario = redes.Where(r => r.IdUsuario == usuario?.IdUsuario).ToList();

        var viewModel = new PerfilUsuarioViewModel
        {
            Usuario = usuario!,
            RedesSociais = redesDoUsuario
        };

        return View(viewModel);
    }
}


