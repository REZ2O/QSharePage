const settings = config || {
    enable: true,
    version: '1.0.0'
};

/**
 * Build content by background.html elements 
 * @param { Object } { selection, url, title }
 * @todo The QRcode was not copied, perhaps canvas is not rendered in background.html
 */
function buildContent({ selection, url, title }){
    let selection_dom = document.getElementById('selection');
    let url_dom = document.getElementById('url');
    let title_dom = document.getElementById('title');
    selection_dom.textContent = selection + (selection.length > 0 ? '\n' : '');
    url_dom.textContent = url + '\n';
    title_dom.textContent = title;
    let qrcode = new QRCode('qrcode', {
        text: url,
        width: 256,
        height: 256,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });
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

    selection_dom.textContent = '';
    url_dom.textContent = '';
    title_dom.textContent = '';
    qrcode.clear();
}

function buildMenu(enable = settings.enable) {
    // chrome.contextMenus.remove('QShareCopy');
    chrome.contextMenus.removeAll();
    if (enable) {
        chrome.contextMenus.create({
            id: 'QShareCopy',
            title: "分享此页面",
            contexts: ['page', "selection"],
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
        let val = changes[key].newValue;
        if (key == 'enable') {
            settings.enable = val;
            buildMenu();
        }
    }
}

chrome.storage.onChanged.addListener(eventHandler);
buildMenu();