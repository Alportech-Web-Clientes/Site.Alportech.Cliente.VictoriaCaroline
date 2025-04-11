using Microsoft.AspNetCore.Mvc;

namespace Site.Alportech.Cliente.VictoriaCaroline.Controllers
{
    public class SobreController : Controller
    {
        public IActionResult Index()
        {
            return View("Sobre");
        }
    }
}