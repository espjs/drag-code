async function loadWifiNetworks() {
    const select = document.getElementById('wifi-select');
    select.innerHTML = '<option value="">正在扫描网络...</option>';
    select.className = 'loading';

    try {
        const response = await fetch('/scan');
        const networks = await response.json();

        select.innerHTML = '<option value="">请选择网络...</option>';

        networks.forEach(network => {
            const option = document.createElement('option');
            option.value = network.ssid;
            option.textContent = network.ssid;
            select.appendChild(option);
        });

        select.className = '';
    } catch (error) {
        console.error('加载WiFi网络失败:', error);
        select.innerHTML = '<option value="">加载失败, 请重试</option>';
        select.className = '';
    }
}


var st = null;
async function connect() {
    const wifi = document.getElementById('wifi-select').value;
    const password = document.getElementById('password').value;

    if (!wifi) {
        alert('请选择WiFi网络');
        return;
    }

    if (!password) {
        alert('请输入WiFi密码');
        return;
    }

    document.getElementById('connect-btn').innerHTML = '连接中...';
    await fetch('/config?ssid=' + wifi + '&password=' + password);
    if (st) clearInterval(st);
    st = setInterval(async function () {
        var response = await fetch('/check');
        var json = await response.json();
        if (json.station == 'connected') {
            document.getElementById('connect-btn').innerHTML = '连接';
            alert('连接成功');
            clearInterval(st);
            return;
        }
        if (json.station == 'bad_password') {
            document.getElementById('connect-btn').innerHTML = '连接';
            alert('密码错误');
            clearInterval(st);
            return;
        }
    }, 5000);

}

window.onload = function () {
    loadWifiNetworks();
};