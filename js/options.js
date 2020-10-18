const settings = config || {
    enable: true,
    selection: true,
    title: true,
    url: true,
    qrcode: true,
    bilicopy: true,
    version: '1.0.1'
};

function checkboxHandler() {
    settings[this.name] = this.checked;
    chrome.storage.sync.set(settings, result => {
        document.getElementById('message').textContent = chrome.i18n.getMessage("success");
    });
    setTimeout(() => { document.getElementById('message').textContent = ''; }, 800);
}

/**
 * language setting
 */
function i18n() {
    for (let key in settings) {
        switch (key) {
            case 'success':
            case 'version': break;
            default: {
                let selector = `label[for="${key}"]`;
                document.querySelector(selector).textContent = chrome.i18n.getMessage(key);
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    i18n();
    let defaultSettings = chrome.extension.getBackgroundPage().settings || settings; // 默认配置
    // 读取数据，第一个参数是指定要读取的key以及设置默认值
    chrome.storage.sync.get(defaultSettings, function (items) {
        for (let key in items) {
            let val = items[key];
            switch (key) {
                case 'version': break;
                default: {
                    try {
                        document.getElementById(key).checked = val;
                        settings[key] = val;
                    } catch { }
                }
            }
        }
    });
});



document.querySelectorAll('input').forEach(e => { e.addEventListener('click', checkboxHandler) });

/* document.querySelector('#check').addEventListener('click', function (e) {
    let el = this;
    settings.enable = el.checked;
    chrome.storage.sync.set({ ...settings }, result => {
        document.getElementById('message').textContent = chrome.i18n.getMessage("success");
    });
    setTimeout(() => { document.getElementById('message').textContent = ''; }, 800);
}); */
