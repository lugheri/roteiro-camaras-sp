# Roteiro das Câmaras SP — app instalável (PWA)

Esta pasta é o app completo: 7 arquivos, 1,2 MB. Depois de instalado ele **abre sem internet**,
com os mapas, os traçados e as fichas das 199 câmaras guardados no aparelho.

```
index.html             a página inteira, com os dados embutidos
manifest.webmanifest   nome, ícones e o modo de janela própria
sw.js                  guarda o app no aparelho e serve quando não há sinal
icone-*.png            ícones (o maskable é o que o Android recorta)
```

## Para instalar

O navegador só instala um app servido por **HTTPS** (ou por `localhost`). Abrir o `index.html`
com dois cliques funciona como página, mas **não** oferece instalação nem funciona offline —
`file://` não permite service worker.

Três caminhos, do mais simples ao mais durável:

1. **Teste rápido na própria máquina** — sobe um servidor na pasta e abre no Chrome:
   ```
   npx --yes serve -l 8080 .
   ```
   Depois abra <http://localhost:8080>. O ícone de instalar aparece na barra de endereço, e a
   página também mostra o botão "Instalar o app no aparelho".

2. **Hospedagem estática gratuita** (GitHub Pages, Netlify, Cloudflare Pages): jogue os 7 arquivos
   na raiz do site. Nada de build, nada de servidor.

3. **No servidor de vocês**: qualquer pasta servida por HTTPS. O único cuidado é o tipo MIME:
   `.webmanifest` precisa sair como `application/manifest+json` e `sw.js` como `text/javascript`.

No **iPhone** não existe botão de instalar: é Safari › Compartilhar › "Adicionar à Tela de Início".
O app abre em tela cheia e funciona offline do mesmo jeito.

## O que foi testado rodando

Servido em `http://localhost` e conferido com o navegador automatizado: os 5 arquivos saem com o
tipo certo, o service worker registra e assume a página, o cache guarda a página, os ícones, o
manifesto e até as fontes do Google — e, com a **rede desligada**, o app abre, lista as cidades e
desenha o mapa da rota com as 784 rodovias de fundo.

**Não testado:** instalar a partir do endereço do artifact no claude.ai (o navegador que uso aqui
não está logado). Os arquivos estão publicados lá com o tipo certo, então deve funcionar ao abrir o
artifact em aba própria — mas quem confirma é você, olhando se o ícone de instalar aparece.

## Atualizar o app

O service worker busca a página na rede primeiro e só cai no cache quando não há sinal — então uma
versão nova chega sozinha na próxima abertura com internet. Se mudar algum arquivo de apoio
(ícone, manifesto), troque o número em `const CACHE = 'roteiro-camaras-v1'` no `sw.js` para forçar
a limpeza do que está guardado.
