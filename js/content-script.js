(function unlockBiliBiliCopy() {
    let defaultSettings = {
        bilicopy: true
    };
    chrome.storage.sync.get(defaultSettings, function (items) {
        if (items.bilicopy) {
            document.querySelectorAll('.unable-reprint').forEach(function () {
                let css = this.getAttribute("class");
                css = css.replace('unable-reprint', '');
                this.setAttribute("class", css);
            });
        }
    });
})();