var CACHE_NAME = 'cache-v2'; // 반영 버전별 캐시명 변경
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
    console.log('install .....');
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache){
            console.log(cache);
            return cache.addAll(urlsToCache);
        })
    )
});


self.addEventListener('fetch', function(event){
    console.log('fetch .....');
    event.respondWith(
        caches.match(event.request)
        .then(function(response){
            return response || fetchAndCache(event.request);
        })
    )
});

// helper functions ----------

function logResult(result) {
    console.log(result);
  }
  
  function logError(error) {
    console.log('Looks like there was a problem:', error);
  }
  
  function validateResponse(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }
  
  function readResponseAsJSON(response) {
    return response.json();
  }
  
  function readResponseAsBlob(response) {
    return response.blob();
  }
  
  function readResponseAsText(response) {
    return response.text();
  }
  
  function showImage(responseAsBlob) {
    const container = document.getElementById('img-container');
    const imgElem = document.createElement('img');
    container.appendChild(imgElem);
    const imgUrl = URL.createObjectURL(responseAsBlob);
    imgElem.src = imgUrl;
  }
  
  function showText(responseAsText) {
    const message = document.getElementById('message');
    message.textContent = responseAsText;
  }
  
  function logSize(response) {
    const url = response.url;
    const size = response.headers.get('content-length');
    console.log(`${url} is ${size} bytes`);
  }
  
  
  // Fetch JSON ----------
  
  function fetchJSON() {
    fetch('examples/animals.json')
      .then(validateResponse)
      .then(readResponseAsJSON)
      .then(logResult)
      .catch(logError);
  }
  console.log(document);
  const jsonButton = document.getElementById('json-btn');
  console.log('jsonButton', jsonButton);
  jsonButton.addEventListener('click', fetchJSON);

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




// ServiceWorkerRegistration.active 신규 등록시
self.addEventListener('activate', event => {
    console.log('Activating new service worker...');
  
    const cacheWhitelist = [staticCacheName];
  
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                    return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
  