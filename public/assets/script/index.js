// 更新状态栏
function 更新状态(消息) {
    document.getElementById('status').textContent = 消息;
}

function 显示日志(日志信息, 日志类型 = '') {
    var console = document.getElementById('consoleContent');
    console.innerHTML += `<div class="console-output ${日志类型}">${日志信息.replace(/\s/g, '&nbsp;')}</div>`;
    console.scrollTop = console.scrollHeight;
}

function 清除日志() {
    var console = document.getElementById('consoleContent');
    console.innerHTML = '';
}


// 新增窗口控制函数
function minimizeWindow() {
}

function maximizeWindow() {
}

function closeWindow() {
}

var 选择的文件 = null;
async function 打开文件() {
    选择的文件 = await 文件.选择一个文件('JSON 文件', ['.json']);
    if (!选择的文件) return;
    var 文件内容 = await 选择的文件.读取内容();
    window.dispatchEvent(new CustomEvent('updateBlockly', { detail: 文件内容 }));
}


async function 保存文件() {
    var 工作区数据 = Blockly.serialization.workspaces.save(Blockly.workspace);
    工作区数据 = JSON.stringify(工作区数据);
    工作区数据 = js_beautify(工作区数据);
    if (选择的文件) {
        await 选择的文件.写入内容(工作区数据);
    } else {
        选择的文件 = await 文件.保存文件(工作区数据, 'JSON 文件', ['.json']);
    }
}

var 选择的设备 = null;
async function 等待(毫秒) {
    await new Promise(resolve => setTimeout(resolve, 毫秒));
}

async function 连接开发板() {
    if (!选择的设备) {
        选择的设备 = await 设备.选择一个设备();
        if (!选择的设备) {
            显示日志('未选择设备!');
            return;
        }
        await 选择的设备.打开(115200);
        document.getElementById('device-close-btn').classList.remove('hide');
        选择的设备.监听串口数据(function (收到的数据) {
            显示日志(收到的数据);
        });
    };
}

async function 运行代码() {
    写入设备();
}

async function 写入设备() {

    显示日志('连接开发板');
    await 连接开发板();

    await 选择的设备.发送代码('echo(false);');
    var 代码 = monaco.workspace.getValue();

    await 等待(200);

    var 用到的模块列表 = 提取模块(代码);
    显示日志('提取到的模块: ' + 用到的模块列表.join(','));
    for (var i = 0; i < 用到的模块列表.length; i++) {
        var 模块名 = 用到的模块列表[i];
        显示日志('正在写入模块: ' + 模块名);
        var 模块源码 = await 获取模块源码(模块名);
        await 选择的设备.写入文件(模块名, 模块源码);
        await 等待(200);
    }

    var 资源文件列表 = 提取资源文件(代码);
    显示日志('提取到的资源: ' + Object.keys(资源文件列表).join(','));
    for (var 资源名 in 资源文件列表) {
        var 资源路径 = 资源文件列表[资源名];
        显示日志('正在写入资源: ' + 资源名);
        var 资源内容 = await 获取资源文件内容(资源路径);
        await 选择的设备.写入文件(资源名, 资源内容);
        await 等待(200);
    }

    显示日志('正在写入启动文件...');
    await 选择的设备.写入文件('.bootcde', 代码);
    显示日志('代码写入完成!');

    await 等待(200);
    显示日志('重启设备');
    await 选择的设备.重启();
}

function 提取模块(code) {
    var 内置模块 = ['Flash', 'Storage', 'heatshrink', 'net', 'dgram', 'http', 'NetworkJS', 'Wifi', 'ESP8266', 'TelnetServer', 'crypto', 'neopixel'];
    var 正则 = /require\(["']([^'"]*)["']\)/g;
    var 提取到的模块 = [];
    while ((查找结果 = 正则.exec(code)) != null) {
        var 模块名 = 查找结果[1];
        if (!提取到的模块.includes(模块名) && !内置模块.includes(模块名)) {
            提取到的模块.push(模块名);
        }
    }
    return 提取到的模块;
}

function 提取资源文件(代码) {
    var 正则 = /@assets\(["']([^'"]*)["']\s*\,\s*["']([^'"]*)["']\)/g;
    var 提取到的资源文件 = {};
    while ((查找结果 = 正则.exec(代码)) != null) {
        var 文件名 = 查找结果[1];
        var 文件路径 = 查找结果[2];
        提取到的资源文件[文件名] = 文件路径;
    }

    return 提取到的资源文件;
}

async function 获取模块源码(模块名) {
    return await fetch(`/modules/${模块名}.min.js`).then(res => res.text());
}
async function 获取资源文件内容(资源路径) {
    return await fetch(`/assets/script/block/assets/${资源路径}`).then(res => res.text());
}

async function 断开连接() {
    if (!选择的设备) return;
    await 选择的设备.关闭();
    选择的设备 = null;
    document.getElementById('device-close-btn').classList.add('hide');
    显示日志('已断开连接');
}

async function 清除设备代码() {
    await 连接开发板();
    显示日志('正在清除代码...');
    await 选择的设备.清除代码();

}

async function 重启设备() {
    await 连接开发板();
    await 选择的设备.重启();
    显示日志('设备重启完成');
}

显示日志('初始化完成!');