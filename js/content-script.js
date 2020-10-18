function unlockCopy(){
    document.querySelectorAll('.unable-reprint').forEach(function (e) {
        let css = e.getAttribute("class");
        css = css.replace('unable-reprint', '');
        e.setAttribute("class", css);
    });
}

(() => {
    let defaultSettings = {
        bilicopy: true
    };
    chrome.storage.sync.get(defaultSettings, function (items) {
        if (items.bilicopy) {
            let id = setInterval(()=>{
                if(document.readyState == 'complete'){
                    clearInterval(id);
                    unlockCopy();
                }
            }, 1000);
        }
    });
})()