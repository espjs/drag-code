let currentLanguage = 'javascript';


// 更新状态栏
function 更新状态(消息) {
    document.getElementById('status').textContent = 消息;
}


// 新增窗口控制函数
function minimizeWindow() {
}

function maximizeWindow() {
}

function closeWindow() {
}

async function 打开文件() {
    var options = {
        types: [
            {
                description: 'JSON 文件',
                accept: {
                    'application/json': ['.json'],
                },
            },
        ],
        excludeAcceptAllOption: true,
        multiple: true,
    };
    var [fileHandle] = await window.showOpenFilePicker(options);
    if (!fileHandle) return;
    var file = await fileHandle.getFile();
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
        window.dispatchEvent(new CustomEvent('updateBlockly', { detail: reader.result }));
    };
    reader.readAsText(file);
}


async function 保存文件() {
    var options = {
        types: [
            {
                description: 'JSON 文件',
                accept: {
                    'application/json': ['.json'],
                },
            },
        ],
        excludeAcceptAllOption: true,
        multiple: false,
    };
    var fileHandle = await window.showSaveFilePicker(options);
    if (!fileHandle) return;
    var file = await fileHandle.createWritable();
    var state = Blockly.serialization.workspaces.save(Blockly.workspace);
    var json = JSON.stringify(state);
    await file.write(js_beautify(json));
    await file.close();
}

var port = null;
var writer = null;
var reader = null;

async function 等待(毫秒) {
    await new Promise(resolve => setTimeout(resolve, 毫秒));
}

function 显示日志(日志信息) {
    var console = document.getElementById('consoleContent');
    console.innerHTML += `<div class="console-output">${日志信息.replace(/\s/g, '&nbsp;')}</div>`;
    console.scrollTop = console.scrollHeight;
}

function 显示错误日志(错误信息) {
    var console = document.getElementById('consoleContent');
    console.innerHTML += `<div class="console-output error">${错误信息.replace(/\s/g, '&nbsp;')}</div>`;
    console.scrollTop = console.scrollHeight;
}

function 显示成功日志(提示信息) {
    var console = document.getElementById('consoleContent');
    console.innerHTML += `<div class="console-output success">${提示信息.replace(/\s/g, '&nbsp;')}</div>`;
    console.scrollTop = console.scrollHeight;
}

function 清除日志() {
    var console = document.getElementById('consoleContent');
    console.innerHTML = '';
}

async function 连接开发板() {
    if (!port) {
        port = await navigator.serial.requestPort();
        await port.open({ baudRate: 115200 });
        document.getElementById('device-close-btn').classList.remove('hide');

        监听串口数据();
    };
}

async function 监听串口数据() {
    while (port && port.readable) {
        reader = port.readable.getReader();
        try {
            var text = '';
            while (true) {
                const { value, done } = await reader.read();
                if (done) {
                    // |reader| has been canceled.
                    显示日志(text);
                    break;
                }
                text += new TextDecoder().decode(value);
                if (text.includes('\n')) {
                    var lines = text.split('\n');
                    for (var i = 0; i < lines.length - 1; i++) {
                        var line = lines[i];
                        显示日志(line);
                    }
                    text = lines[lines.length - 1];
                }
            }
        } catch (error) {
            // Handle |error|…
        } finally {
            reader.releaseLock();
        }
    }
}
async function 运行代码() {
    显示日志('连接开发板');
    await 连接开发板();

    显示日志('获取代码');
    var code = monaco.workspace.getValue();

    显示日志('正在发送代码');
    await 发送代码(code);

    显示日志('运行代码完成');
}

async function 写入设备() {

    显示日志('连接开发板');
    await 连接开发板();

    显示日志('获取代码');
    var 代码 = monaco.workspace.getValue();
    var 模块代码 = '';

    var 用到的模块列表 = 提取模块(代码);
    for (var i = 0; i < 用到的模块列表.length; i++) {
        var 模块名 = 用到的模块列表[i];
        var 模块源码 = await 获取模块源码(模块名);
        模块代码 += `require("Storage").write("${模块名}", \`${模块源码}\`);\n`;
    }
    var 要发送的代码 = `${模块代码}\nrequire("Storage").write(".bootcde", \`${代码}\`);E.reboot();\n`;
    显示日志('正在写入代码...');
    await 发送代码(要发送的代码);
    显示日志('代码写入完成!');
}

async function 发送代码(code) {
    writer = port.writable.getWriter();
    var data = new TextEncoder().encode(code + '\n');
    await writer.write(data);
    writer.releaseLock();
    writer = null;
}

function 提取模块(code) {
    var 内置模块 = ['Wifi', 'http', 'Storage', 'Bangle'];
    var reg = /require\(["'](.+)["']\)/g;
    var modules = [];
    while ((match = reg.exec(code)) != null) {
        var module = match[1];
        if (!modules.includes(module) && !内置模块.includes(module)) {
            modules.push(module);
        }
    }

    return modules;
}

async function 获取模块源码(模块名) {
    return await fetch(`/modules/${模块名}.min.js`).then(res => res.text());
}

async function 断开连接() {
    if (writer) {
        writer.releaseLock();
        writer = null;
    }
    if (reader) {
        reader.cancel();
        reader = null;
    }

    if (port) {
        await port.close();
        port = null;
    }
    document.getElementById('device-close-btn').classList.add('hide');
    显示日志('已断开连接');
}

async function 清除设备代码() {
    await 连接开发板();
    显示日志('正在清除代码');
    await 发送代码("require('Storage').eraseAll();E.reboot();");
    显示日志('代码清除完成');
}

async function 重启设备() {
    await 连接开发板();
    await 发送代码("E.reboot();");
    显示日志('设备重启完成');
}

显示日志('初始化...');