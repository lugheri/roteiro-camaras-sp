// Service worker do roteiro: o uso é na estrada, onde o sinal cai.
// A página é um arquivo só, pesado e inteiro — então vale guardar completo e servir do cache.
//
// Estratégia, e o porquê de cada uma:
// - navegação (abrir o app): REDE PRIMEIRO, cache como rede de segurança. Assim uma versão nova da
//   página chega assim que houver sinal, em vez de o app ficar preso numa cópia velha para sempre.
// - resto (ícone, manifesto, fonte): CACHE PRIMEIRO. Não muda e não precisa de viagem à rede.
// Trocar o número de CACHE abaixo invalida tudo e força o app a baixar de novo.
const CACHE = 'roteiro-camaras-v3';
const INICIO = new URL('./', self.registration.scope).href;
const ESSENCIAIS = [INICIO, './manifest.webmanifest', './icone-192.png', './icone-512.png'];

self.addEventListener('install', ev => {
  ev.waitUntil((async () => {
    const c = await caches.open(CACHE);
    // um item que falhe não pode derrubar a instalação inteira (addAll é tudo ou nada)
    await Promise.all(ESSENCIAIS.map(u => c.add(u).catch(() => {})));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', ev => {
  ev.waitUntil((async () => {
    const nomes = await caches.keys();
    await Promise.all(nomes.filter(n => n !== CACHE).map(n => caches.delete(n)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', ev => {
  const req = ev.request;
  if (req.method !== 'GET') return;

  if (req.mode === 'navigate') {
    ev.respondWith((async () => {
      try {
        const resp = await fetch(req);
        const c = await caches.open(CACHE);
        c.put(req, resp.clone()).catch(() => {});
        return resp;
      } catch (e) {
        return (await caches.match(req)) || (await caches.match(INICIO)) ||
          new Response('Sem conexão e sem cópia guardada desta página.',
            { status: 503, headers: { 'content-type': 'text/plain; charset=utf-8' } });
      }
    })());
    return;
  }

  ev.respondWith((async () => {
    const guardado = await caches.match(req);
    if (guardado) return guardado;
    try {
      const resp = await fetch(req);
      // resposta opaca (fonte de outro domínio) também vale guardar: serve offline, só não dá para ler
      if (resp && (resp.ok || resp.type === 'opaque')) {
        const c = await caches.open(CACHE);
        c.put(req, resp.clone()).catch(() => {});
      }
      return resp;
    } catch (e) {
      return new Response('', { status: 504 });
    }
  })());
});
