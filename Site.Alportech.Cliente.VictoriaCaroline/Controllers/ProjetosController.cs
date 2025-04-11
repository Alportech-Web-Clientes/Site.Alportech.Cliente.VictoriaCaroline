using Microsoft.AspNetCore.Mvc;
using Site.Alportech.Cliente.VictoriaCaroline.Models;

namespace Site.Alportech.Cliente.VictoriaCaroline.Controllers
{
    public class ProjetosController : Controller
    {
        private readonly GoogleSheetsService _googleSheetsService;
        private const string UsuarioIdFixo = "18a2427d-2e93-4cb2-b292-a8517a6a77af";

        public ProjetosController(GoogleSheetsService googleSheetsService)
        {
            _googleSheetsService = googleSheetsService;
        }

        public async Task<IActionResult> Index()
        {
            // Obter todos os projetos do usuário específico
            var projetos = await _googleSheetsService.ObterDadosDaAba<Projeto>("Projetos");
            var projetosDoUsuario = projetos.Where(p => p.IdUsuario == UsuarioIdFixo).ToList();

            // Extrair todas as tags únicas para os filtros
            var todasTags = new List<string>();
            foreach (var projeto in projetosDoUsuario)
            {
                if (!string.IsNullOrEmpty(projeto.TagsProjeto))
                {
                    // Dividir tags por vírgula ou ponto-e-vírgula e remover espaços em branco
                    var tags = projeto.TagsProjeto.Split(new[] { ',', ';' }, StringSplitOptions.RemoveEmptyEntries)
                                        .Select(t => t.Trim())
                                        .Where(t => !string.IsNullOrEmpty(t));
                    todasTags.AddRange(tags);
                }
            }

            // Remover tags duplicadas e ordenar
            var tagsUnicas = todasTags.Distinct().OrderBy(t => t).ToList();

            ViewBag.TagsUnicas = tagsUnicas;
            return View("Projetos", projetosDoUsuario);
        }
    }
}