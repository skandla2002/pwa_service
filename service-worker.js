var CACHE_NAME = 'static-cache';
var urlsToCache = [
    'app/',
    'app/index.html',
    'app/style',
    'style/main.css',
    'images/still_life_medium.jpg',
    'index.html',
    'pages/offline.html',
    'pages/404.html'
];

self.addEventListener('install', function(event){
    event.waitUntil(
        cache.open(CACHE_NAME)
        .then(function(cache){
            return cache.addAll(urlsToCache);
        })
    )
});

self.addEventListener('fetch', function(event){
    event.respondWith(
        caches.match(event.request)
        .then(function(response){
            return response || fetchAndCache(event.request);
        })
    )
});


function fetchAndCache(url){
    return fetch(url)
        .then(function(response){
            if(!response.ok){
                throw Error(response.statusText);
            }
            return caches.open(CACHE_NAME)
                .then(function(cache){
                    cache.put(url, response.clone());
                    return response;
                })
        })
        .then(function(error){
            console.log('Request fail: ', error);
        })
}

