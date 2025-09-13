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
    // 使用web file system api 读取json文件
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
    // 使用web file system api 保存json文件
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

async function 等待(毫秒) {
    await new Promise(resolve => setTimeout(resolve, 毫秒));
}

async function 连接开发板() {
    if (!port) {
        port = await navigator.serial.requestPort();
        await port.open({ baudRate: 115200 });
        document.getElementById('device-close-btn').classList.remove('hide');
    };
}
async function 运行代码() {
    更新状态('连接开发板');
    await 连接开发板();
    更新状态('获取代码');
    var code = monaco.workspace.getValue();
    更新状态('正在发送代码');
    await 发送代码(code);
    更新状态('运行代码完成');
}

async function 发送代码(code) {
    var writer = port.writable.getWriter();
    var data = new TextEncoder().encode(code + '\n');
    await writer.write(data);
    writer.releaseLock();
}

async function 断开连接() {
    if (port) {
        await port.close();
        port = null;
    }
    document.getElementById('device-close-btn').classList.add('hide');
    更新状态('已断开连接');
}

async function 清除设备代码() {
    await 连接开发板();
    更新状态('正在清除代码');
    await 发送代码("require('Storage').eraseAll();E.reboot();");
    更新状态('代码清除完成');
}