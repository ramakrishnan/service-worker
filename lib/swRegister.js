if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then((registration) => {
            console.log('My service worker registered', registration.scope);
            console.log('My service worker registered', registration);
        });
}