console.log('service-worker 확인');
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
    .then(function(registration){
        console.log('Registered:', registration);
    })
    .catch(function(error){
        console.log('Registration failed: ', error);
    });
} else {
    console.log('This Browser is not support service worker!');
}

console.log('fetch 확인');
if (!('fetch' in window)){
    console.log('Fetch API not found. try including the polyfill');
    return;
  }


let deferredPrompt;

// 모바일 홈화면 설치 전
window.addEventListener('beforeinstallprompt', event => {

    // Prevent Chrome 67 and earlier from automatically showing the prompt
    event.preventDefault();

    // Stash the event so it can be triggered later.
    deferredPrompt = event;

    // Attach the install prompt to a user gesture
    document.querySelector('#installBtn').addEventListener('click', event => {
        console.log('#installBtn ', event);
        // Show the prompt
        deferredPrompt.prompt();

        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice
        .then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
        });
    });

    // Update UI notify the user they can add to home screen
    document.querySelector('#installBanner').style.display = 'flex';
});