// if ('serviceWorker' in navigator) {
// 	navigator.serviceWorker.register('../sw.js')
// 	.then(() => {console.log('Service Worker is Registred');
//     })
// 	.catch(() => {console.log('Registration Failed');
//     })
// }

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}