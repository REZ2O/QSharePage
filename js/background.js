const settings = {
    enable: true
};

function buildContent({ selection, url, title }){
    selection = selection.length > 0 ? selection + '\n' : '';
    let content = `${ selection }${ url }\n${ title }`;
    let dom = document.getElementById('qrcode');
    let qrcode = new QRCode('qrcode', {
        text: url,
        width: 256,
        height: 256,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });
    let img = document.getElementById('clipboard-img');
    img.src = localStorage[this.screenshotURIName]; // I store the image URI in localStorage
    let div = document.getElementById('clipboard-div');
    div.contentEditable = true;
    let range;
    if (document.createRange) {
      range = document.createRange();
      range.selectNodeContents(div);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      div.focus();
      document.execCommand('copy');
    }
    div.contentEditable = false;
}

function create() {
    if (settings.enable) {
        chrome.contextMenus.create({
            id: 'QShareCopy',
            title: "分享此页面",
            onclick: function (info,tab) {
                let url = info.pageUrl || '';
                let selection = info.selectionText || '';
                let title = tab.title || '';
                buildContent({selection, url, title});
            }
        });
    }
}

function eventHandler(changes, namespace) {
    for (var key in changes) {
        if (key == 'enable') {
            settings.enable = changes[key];
        }
    }
}

chrome.storage.onChanged.addListener(eventHandler);
