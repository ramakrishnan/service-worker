var CACHE_NAME = 'ram-cache-1';
this.addEventListener('install', (event) => {
    this.skipWaiting();
    console.log('Install properly Service Worker');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Opened cache');
            return cache.addAll([
                './',
                'http://localhost:3000/lib/js/jquery.min.js',
                'http://localhost:3000/lib/js/app.js'
            ])
        })
    );
});

this.addEventListener('activate', () => {
    console.log('onactivate Service Worker');
});

this.addEventListener('fetch', async (event) => {
    console.log('In FETCH');
    const isWebFirst = () => {
        const url = new URL(event.request.url);
        if (url.pathname === '/books.json') {
            return true;
        } else {
            return false;
        }
    };
    const cacheAndRespond = async () => {
        let response;
        try {
            const cache = await caches.open(CACHE_NAME);
            response = await fetch(event.request);
            console.log('JSON API response', response);
            if (response) {
                await cache.put(event.request, response.clone());
            }
        } catch (error) {
            // In case any failure get it from cache
            console.log('TRY catch ERROR', error)
            response = await caches.match(event.request);
        }
        return response;
    };
    const fetchFromCache = async () => {
        let response;
        response = await caches.match(event.request);
        if (!response) {
            response = await cacheAndRespond();
        }
        return response;
    };

    if (isWebFirst()) {
        event.respondWith(cacheAndRespond());
    } else {
        event.respondWith(fetchFromCache());
    }
});
