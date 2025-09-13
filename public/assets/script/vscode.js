(() => {
    let editor;
    let currentLanguage = 'javascript';

    // 配置Monaco Editor
    require.config({
        paths: {
            'vs': 'https://unpkg.com/monaco-editor@0.53.0/min/vs'
        }
    });

    // 初始化编辑器
    require(['vs/editor/editor.main'], async function () {
        var code = '';
        // 创建编辑器实例
        editor = monaco.editor.create(document.getElementById('codeDisplay'), {
            value: code,
            language: currentLanguage,
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
            updateStatus('已修改');
        });

        // 监听语言变化
        editor.onDidChangeModelLanguage(() => {
            const model = editor.getModel();
            currentLanguage = model.getLanguageId();
            updateStatus(`语言: ${currentLanguage}`);
        });

        // 添加快捷键
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
            // saveCode();
        });

        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
            // runCode();
        });

        window.addEventListener('updateCode', function (e) {
            if (editor.getValue() !== e.detail) {
                var options = {
                    indent_size: 4,
                    space_in_empty_paren: true
                }
                var code = js_beautify(e.detail, options)
                editor.setValue(code);
            }
        });

        monaco.workspace = editor;

        updateStatus('编辑器已就绪');
    });

    function updateStatus(msg) {
        document.getElementById('status').innerHTML = msg;
    }

})();