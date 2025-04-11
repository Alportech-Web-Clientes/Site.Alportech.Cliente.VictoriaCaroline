using Microsoft.AspNetCore.Mvc;

namespace Site.Alportech.Cliente.VictoriaCaroline.Controllers
{
    public class ContatoController : Controller
    {
        public IActionResult Index()
        {
            return View("Contato");
        }
    }
}
