const settings = config || {
    enable: true,
    version: '1.0.0'
};

/* window.ready = () => {
    document.getElementById('label').textContent = chrome.i18n.getMessage("isEnable");
    let defaultSettings = { enable: true }; // 默认配置
    // 读取数据，第一个参数是指定要读取的key以及设置默认值
    chrome.storage.sync.get(defaultSettings, function (items) {
        document.getElementById('check').value = items.enable;
        chrome.chrome.extension.getBackgroundPage().settings = { enable: items.enable };
    });
} */

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('label').textContent = chrome.i18n.getMessage("isEnable");
    let defaultSettings = chrome.extension.getBackgroundPage().settings || settings; // 默认配置
    // 读取数据，第一个参数是指定要读取的key以及设置默认值
    chrome.storage.sync.get(defaultSettings, function (items) {
        document.getElementById('check').checked = items.enable;
        settings.enable = items.enable;
    });
});



document.querySelector('#check').addEventListener('click', function (e) {
    let el = this;
    settings.enable = el.checked;
    chrome.storage.sync.set({ ...settings }, result => {
        document.getElementById('message').textContent = chrome.i18n.getMessage("success");
    });
    setTimeout(() => { document.getElementById('message').textContent = ''; }, 800);
});
