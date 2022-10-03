self.addEventListener('install', (event) => {
    console.log("[SW] Installed")
    event.waitUntil((async () => {
        const cache = await caches.open("ccw-v1")
        console.log("[SW] Caching all")
        await cache.addAll([
            "/",
            "/login",
            "/members",
            "/members/1",
            "/members/new",
            "/meetings",
            "/meetings/1",
            "/meetings/new",
            "/ohmyfuckinggod",
        ])
    })())
})

self.addEventListener('fetch', (event) => {
    console.log("[SW] Fetching")
})
