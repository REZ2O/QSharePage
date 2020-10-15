document.querySelector('#check').addEventListener('click', function (e){
    var el =  this;
    chrome.storage.sync.get(['enable'], result => {
        if(result.enable) {
            el.checked = true;
        }
    });
});
