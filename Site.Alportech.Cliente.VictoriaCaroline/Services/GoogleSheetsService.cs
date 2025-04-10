using System.Globalization;
using CsvHelper;
using CsvHelper.Configuration;
using Site.Alportech.Cliente.VictoriaCaroline.Models; // Substitua pelo namespace do seu projeto

public class GoogleSheetsService
{
    private readonly HttpClient _httpClient;
    private readonly string _baseSheetUrl = "https://docs.google.com/spreadsheets/d/1pfvcWvSELjRCuts9Aih_ydKvNsBQDGXG_b4gUNkZe5o/gviz/tq?tqx=out:csv&sheet=";
    private const string UsuarioIdFixo = "18a2427d-2e93-4cb2-b292-a8517a6a77af";

    public GoogleSheetsService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<List<T>> ObterDadosDaAba<T>(string aba)
    {
        var url = $"{_baseSheetUrl}{aba}";
        var response = await _httpClient.GetAsync(url);
        response.EnsureSuccessStatusCode();

        using var stream = await response.Content.ReadAsStreamAsync();
        using var reader = new StreamReader(stream);

        var config = new CsvConfiguration(CultureInfo.InvariantCulture)
        {
            PrepareHeaderForMatch = args => args.Header.ToLower(),
        };

        using var csv = new CsvReader(reader, config);
        return csv.GetRecords<T>().ToList();
    }

    public async Task<Usuario?> ObterUsuarioPrincipal()
    {
        var usuarios = await ObterDadosDaAba<Usuario>("Sobre");
        return usuarios.FirstOrDefault(u => u.IdUsuario == UsuarioIdFixo);
    }

    public async Task<List<RedeSocial>> ObterRedesSociaisDoUsuario()
    {
        var redes = await ObterDadosDaAba<RedeSocial>("RedesSociais");
        return redes.Where(r => r.IdUsuario == UsuarioIdFixo).ToList();
    }
}
