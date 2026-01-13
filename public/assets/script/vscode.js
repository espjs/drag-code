async function createVSCode(id, code = '') {

    var promise = new Promise(function (resolve, reject) {
        window.addEventListener('monaco_init', function (e) {
            resolve(e.detail);
        });
        window.addEventListener('monaco_init_error', function (e) {
            reject(e.detail);
        });
    });

    var st = setTimeout(function () {
        window.dispatchEvent(new CustomEvent('monaco_init_error', { detail: '加载超时!' }));
    }, 60000);

    let editor;
    // 配置Monaco Editor
    require.config({
        paths: {
            'vs': './plugin/monaco-editor/min/vs'
        }
    });

    // 初始化编辑器
    require(['vs/editor/editor.main'], function () {
        // 创建编辑器实例
        editor = monaco.editor.create(document.getElementById(id), {
            value: code,
            language: 'javascript',
            theme: 'vs-dark',
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            readOnly: false,
            automaticLayout: true,
            minimap: {
                enabled: true
            },
            wordWrap: 'on',
            folding: true,
            lineNumbersMinChars: 3,
            scrollbar: {
                vertical: 'visible',
                horizontal: 'visible',
                useShadows: false,
                verticalHasArrows: false,
                horizontalHasArrows: false,
                verticalScrollbarSize: 10,
                horizontalScrollbarSize: 10
            }
        });

        // 监听内容变化
        editor.onDidChangeModelContent(() => {
            // updateStatus('已修改');
        });

        // 监听语言变化
        editor.onDidChangeModelLanguage(() => {
            // const model = editor.getModel();
        });

        // 添加快捷键
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
            // saveCode();
        });

        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
            // runCode();
        });
        window.addEventListener('updateCode', function (e) {
            try {
                if (editor.getValue() !== e.detail) {
                    var options = {
                        indent_size: 4,
                        space_in_empty_paren: true
                    }
                    var code = js_beautify(e.detail, options)
                    editor.setValue(code);
                }
            } catch (error) {
                console.log(error);
            }
        });

        window.monacoWorkspace = editor;

        clearTimeout(st);
        st = null;
        window.dispatchEvent(new CustomEvent('monaco_init', { detail: 'ok' }));
    });

    return promise;
}