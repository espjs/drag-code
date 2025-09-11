(() => {
    function getBlock(start) {
        var blockList = [];
        for (var key in Blockly.Blocks) {
            if (key.startsWith(start)) {
                blockList.push({
                    kind: 'block',
                    type: key,
                });
            }
        }
        return blockList;
    }

    const toolbox = {
        // There are two kinds of toolboxes. The simpler one is a flyout toolbox.
        kind: 'categoryToolbox',
        // The contents is the blocks and other items that exist in your toolbox.
        contents: [
            {
                "kind": "category",
                "name": "变量",
                "contents": getBlock('variables_'),
            },
            {
                "kind": "category",
                "name": "控制",
                "contents": getBlock('controls_'),
            },
            {
                "kind": "category",
                "name": "列表",
                "contents": getBlock('lists_'),
            },
            {
                "kind": "category",
                "name": "数学",
                "contents": getBlock('math_'),
            },
            {
                "kind": "category",
                "name": "函数",
                "contents": getBlock('procedures_'),
            },
            {
                "kind": "category",
                "name": "文本",
                "contents": getBlock('text_'),
            },
            {
                "kind": "category",
                "name": "Espruino",
                "contents": getBlock('espruino_'),
            },
            {
                "kind": "category",
                "name": "全部",
                "contents": getBlock('')
            },

        ]
    };

    const workspace = Blockly.inject('cardWorkspace', {
        toolbox: toolbox,
        collapse: true,
        comments: true,
        media: 'https://unpkg.com/blockly@12.3.0/media/',
    });

    function updateCode() {
        var code = Blockly.JavaScript.workspaceToCode(workspace);
        window.dispatchEvent(new CustomEvent('updateCode', { detail: code }));
    }

    workspace.addChangeListener(() => {
        updateCode();
        const state = Blockly.serialization.workspaces.save(workspace);
        localStorage.setItem('workspace-state', JSON.stringify(state));
    });

    window.addEventListener('updateBlockly', function (e) {
        const state = JSON.parse(e.detail);
        if (state) {
            Blockly.serialization.workspaces.load(state, workspace);
        }
    });

    window.workspace = workspace;

    setTimeout(() => {
        const state = JSON.parse(localStorage.getItem('workspace-state'));
        if (state) {
            Blockly.serialization.workspaces.load(state, workspace);
        }
    }, 2000);


})();