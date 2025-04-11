using Microsoft.AspNetCore.Mvc;

namespace Site.Alportech.Cliente.VictoriaCaroline.Controllers
{
    public class ConquistasController : Controller
    {
        public IActionResult Index()
        {
            return View("Conquistas");
        }
    }
}
