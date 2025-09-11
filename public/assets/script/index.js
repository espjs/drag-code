let currentLanguage = 'javascript';


// 更新状态栏
function updateStatus() {
    // const codeLines = document.getElementById('codeDisplay').textContent.split('\n').length;
    // document.getElementById('lineCount').textContent = codeLines;
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
    var state = Blockly.serialization.workspaces.save(workspace);
    var json = JSON.stringify(state);
    await file.write(js_beautify(json));
    await file.close();
}