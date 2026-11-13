// O portfólio antigo (Gatsby) registrava um service worker neste endereço,
// que mantinha a versão velha em cache. Este arquivo o substitui:
// apaga os caches, remove o registro e recarrega as abas abertas.
self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((key) => caches.delete(key)));
    await self.registration.unregister();
    const clients = await self.clients.matchAll({ type: "window" });
    clients.forEach((client) => client.navigate(client.url));
  })());
});
