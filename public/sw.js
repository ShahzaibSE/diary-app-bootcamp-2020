let cache_name = "diary_app_cache"
let urlsToCache = [
    '/',
    'index.html',
    '/logo192.png',
    '/logo512.png',
    '/favicon.ico',
    '/static/js/bundle.js',
    '/static/js/main.chunk.js',
    '/static/js/0.chunk.js',
    '/static/js/1.chunk.js',
    'static/diary-office-background.jpg'
  ];

console.log("Service Worker started: ",cache_name)

this.addEventListener('install',(event)=>{
  event.waitUntil(
    caches.open(cache_name).then((cache)=>{
      cache.addAll(urlsToCache)
    }).catch(err => {
      console.log("Unable to cache file")
    })
  )
})

this.addEventListener('fetch',(event)=>{
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
})