"use strict";

const staticCacheName = 'restaurant-reviews-v1';

const urlsToCache = [
  '/',
  '/index.html',
  '/restaurant.html',
  'css/styles.css',
  'data/restaurants.json',
  'favicon.ico',
  'img/1.jpg',
  'img/2.jpg',
  'img/3.jpg',
  'img/4.jpg',
  'img/5.jpg',
  'img/6.jpg',
  'img/7.jpg',
  'img/8.jpg',
  'img/9.jpg',
  'img/10.jpg',
  'js/dbhelper.js',
  'js/main.js',
  'js/restaurant_info.js',
  'js/sw_register.js',
  'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
  'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
  'https://cdnjs.cloudflare.com/ajax/libs/vanilla-lazyload/8.10.0/lazyload.min.js'
];


self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(staticCacheName).then(cache => {
        return cache.addAll(urlsToCache);
      }).catch(err => {
          console.log(err);
      })
  );
});


self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch: true}).then(response => {
      if (response) {
        return response;
      }
      return fetch(event.request).then(response => {
        return caches.open(staticCacheName).then(cache => {
          cache.put(event.request, response.clone());
          return response;
        });
      }).catch(err => {
        throw err;
      });
    })
  );
});


self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName.startsWith('restaurant-reviews-') && cacheName != staticCacheName;
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
