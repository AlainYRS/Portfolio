'use strict';
importScripts('https://www.gstatic.com/firebasejs/6.3.3/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.3.3/firebase-messaging.js');

//La versión forza a la actualización del cache Estatico ó Dinamico
const AYRS_STATIC_CACHE = 'AYRSUser-StaticCache-V2022OCT04';//Cache estático de pagina inicial
const AYRS_DYNAMIC_CACHE = 'AYRSUser-DynamicCache-V2022OCT04';//Cache dinámico de paginas visitadas

const AYRS_FILES_TO_CACHE = [
  '/',
  '/static/Icons/AYRSIcon700.png',
  '/static/Icons/AYRSIcon192.png',
  '/static/Icons/AYRSIcon168.png',
  '/static/Icons/AYRSIcon144.png',
  '/static/Icons/AYRSIcon96.png',
  '/static/Icons/AYRSIcon72.png',
  '/static/Icons/AYRSIcon48.png',
  '/static/Icons/AYRSMaskable.png',
  '/static/Icons/SWBackground.png',
  '/static/manifest.json',
];

const limitCache = (name, size) => {
  caches.open(name)
    .then(cache => {
      cache.keys()
        .then(keys => {
          if (keys.length > size) {
            cache.delete(keys[0])
              .then(limitCache(name, size))
          }
        })
    })
}

self.addEventListener('install', event => {
    const preCache = async () => {
      const cache = await caches.open(AYRS_STATIC_CACHE);
      return cache.addAll(AYRS_FILES_TO_CACHE);
    };
    event.waitUntil(preCache())
    self.skipWaiting()
  });
  
  self.addEventListener('activate', (event) => {
    const preactivate = async()=>{
      await caches.keys().then(keyList => {
        return Promise.all(keyList
          .filter(key => key !== AYRS_STATIC_CACHE && key !== AYRS_DYNAMIC_CACHE)
          .map(key => caches.delete(key))
        )
      })
    }
    event.waitUntil(preactivate())
    // self.ClientRectList.claim();
  });

self.addEventListener('fetch', (event) => {
  // console.log('SW Fetch', event.request);
  event.respondWith(
    caches
      .match(event.request)
      .then(cacheRes => {
        return cacheRes || fetch(event.request)
          .then(fetchRes => {
            return caches.open(AYRS_DYNAMIC_CACHE)
              .then(cache => {
                if (event.request.url.indexOf("chrome-extension") === -1) {  //Agregado como solución a error de "failed to execute 'put' on 'cache': request scheme 'chrome-extension' is unsupported"
                  cache.put(event.request.url, fetchRes.clone())
                  limitCache(AYRS_DYNAMIC_CACHE, 140)
                  return fetchRes;
                } else {  //Agregado como solución a error de "failed to execute 'put' on 'cache': request scheme 'chrome-extension' is unsupported"
                  return fetchRes;  //Agregado como solución a error de "failed to execute 'put' on 'cache': request scheme 'chrome-extension' is unsupported"
                }  //Agregado como solución a error de "failed to execute 'put' on 'cache': request scheme 'chrome-extension' is unsupported"
              })
          })
      })
      .catch(() => {
        caches.match('/offline.js')
        // if(event.request.url.indexOf('.png')>-1){
        //   return cache.match('/_next/static/chunks/pages/offline.js?ts=1617519020359')//Verificar la ruta en caso de que no funcione
        // }
      })
  );
});