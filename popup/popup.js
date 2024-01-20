chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    document.getElementById('enable-boringless').addEventListener('click', () => {

        chrome.tabs.sendMessage(tabs[0].id, {'showVideo': true});

    });


});
