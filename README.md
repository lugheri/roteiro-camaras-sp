# Roteiro das Câmaras SP

As 199 cidades de São Paulo acima de 30 mil habitantes, divididas em **15 viagens** saindo da
capital. Cada rota tem o trajeto rodoviário no mapa, as paradas na ordem, e a ficha de cada câmara
com os gabinetes ligados à pauta da mulher.

Site estático, sem backend: sete arquivos. Instalável como aplicativo e **funciona sem internet**
depois da primeira visita.

## Publicar

É só servir esta pasta por HTTPS. No GitHub Pages, ative em *Settings › Pages › Deploy from a
branch › main / (root)*.

Funciona tanto na raiz de um domínio quanto num subcaminho (`/usuario.github.io/repositorio/`):
todos os caminhos são relativos e o service worker se registra no escopo da pasta.

## O que confiar e o que não

- **População**: estimativa do IBGE para 1º/7/2025, conferida número a número — zero divergência.
- **Vereadores e contatos**: ponto de partida de prospecção, **não lista verificada**. Uma
  reconferência em 12 cidades achou erro em 11: 43 itens errados em 222, cerca de 19%, quase tudo
  contato de gabinete e composição de comissão. **Confirme por telefone antes de viajar.**
- **Quilometragem e ordem das paradas**: roteamento sobre o OpenStreetMap (OSRM). É distância de
  estrada de verdade, mas sem pedágio, trânsito nem obra; o tempo é de fluxo livre e não inclui
  parada em cada câmara. A rota 8 passa pela balsa de Ilhabela, que entra com velocidade fixa.
- **Situação × oposição** não é dado público: o selo diz apenas se o vereador é do mesmo partido
  do prefeito.

## Fontes

Contorno do estado, divisas municipais e população: IBGE. Traçado das estradas, nomes de via e
centro urbano das cidades: OpenStreetMap (ODbL), roteado pelo OSRM. Câmaras e gabinetes: pesquisa
em fonte oficial, legislatura 2025–2028, com link e data de consulta em cada nome.

## Arquivos

| | |
| --- | --- |
| `index.html` | a página inteira, com os dados embutidos (1,2 MB) |
| `manifest.webmanifest` | nome, ícones e o modo de janela própria |
| `sw.js` | guarda o app no aparelho e serve quando não há sinal |
| `icone-*.png`, `icone.svg` | ícones do app |

As marcações de "visitada" ficam só no navegador de quem usa.
