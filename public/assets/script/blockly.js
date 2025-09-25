(() => {
    function getBlock(start) {
        var blockList = [];
        for (var key in Blockly.Blocks) {
            if (key.startsWith(start)) {
                var toolbox = typeof Blockly.Blocks[key].toolbox == 'object' ? Blockly.Blocks[key].toolbox : {};
                blockList.push({
                    kind: 'block',
                    type: key,
                    ...toolbox
                });
            }
        }
        return blockList;
    }

    function getCategory(name) {
        var blockList = [];
        for (var key in Blockly.Blocks) {
            if (Blockly.Blocks[key].category == name) {
                var toolbox = typeof Blockly.Blocks[key].toolbox == 'object' ? Blockly.Blocks[key].toolbox : {};
                blockList.push({
                    kind: 'block',
                    type: key,
                    ...toolbox
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
                "custom": "VARIABLE_DYNAMIC"
            },
            {
                "kind": "category",
                "name": "逻辑",
                "contents": getBlock('logic'),
            },
            {
                "kind": "category",
                "name": "控制",
                "contents": getBlock('controls'),
            },
            {
                "kind": "category",
                "name": "列表",
                "contents": getBlock('lists'),
            },
            {
                "kind": "category",
                "name": "数学",
                "contents": getBlock('math'),
            },
            {
                "kind": "category",
                "name": "函数",
                // "contents": getBlock('procedures'),
                "custom": 'PROCEDURE',
            },
            {
                "kind": "category",
                "name": "文本",
                "contents": getBlock('text'),
            },
            {
                "kind": "category",
                "name": "Espruino",
                "contents": getCategory('Espruino'),
            },
            {
                "kind": "category",
                "name": "ESP8266",
                "contents": getCategory('esp8266'),
            },
            {
                "kind": "category",
                "name": "网络",
                "contents": [
                    {
                        "kind": "category",
                        "name": "Wifi连接",
                        "contents": getCategory('wifi'),
                    },
                    {
                        "kind": "category",
                        "name": "Web服务",
                        "contents": getCategory('web'),
                    },
                    {
                        "kind": "category",
                        "name": "MQTT服务",
                        "contents": getCategory('mqtt'),
                    },
                    {
                        "kind": "category",
                        "name": "网络请求",
                        "contents": getCategory('http'),

                    },
                ]
            },
            {
                "kind": "category",
                "name": "传感器",
                "contents": [
                    // {
                    //     "kind": "category",
                    //     "name": "温湿度DHT11",
                    //     "contents": getBlock('dht11'),
                    // },
                    {
                        "kind": "category",
                        "name": "温度DS18B20",
                        "contents": getBlock('DS18B20'),
                    },
                    // {
                    //     "kind": "category",
                    //     "name": "超声波",
                    //     "contents": getBlock('HC-SR04'),
                    // },
                    // {
                    //     "kind": "category",
                    //     "name": "红外线",
                    //     "contents": getBlock('ir'),
                    // },
                ],

            },
            {
                "kind": "category",
                "name": "外设",
                "contents": [
                    {
                        "kind": "category",
                        "name": "伺服电机",
                        "contents": getBlock('hw_'),
                    }
                ],

            },
            // {
            //     "kind": "category",
            //     "name": "全部",
            //     "contents": getBlock('')
            // },
            // {
            //     "kind": "category",
            //     "name": "创建块",
            //     "contents": [
            //         {
            //             "kind": "category",
            //             "name": "输入",
            //             "contents": getCategory('create_block_input'),
            //         },
            //         {
            //             "kind": "category",
            //             "name": "字段",
            //             "contents": getCategory('create_block_fields'),
            //         },
            //         {
            //             "kind": "category",
            //             "name": "连接检测",
            //             "contents": getCategory('create_block_connection_check'),
            //         },
            //         {
            //             "kind": "category",
            //             "name": "颜色",
            //             "contents": getCategory('create_block_colour'),
            //         }
            //     ]
            // }

        ]
    };

    Blockly.workspace = Blockly.inject('cardWorkspace', {
        toolbox: toolbox,
        collapse: true,
        comments: true,
        media: 'https://unpkg.com/blockly@12.3.0/media/',
    });

    Blockly.JavaScript.scrub__ = Blockly.JavaScript.scrub_;
    Blockly.JavaScript.scrub_ = function (block, code) {
        var callbackIdx = ("string" == typeof code) ? code.indexOf(MAGIC_CALLBACK_CODE) : -1;
        if (callbackIdx >= 0) {
            var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
            var nextCode = Blockly.JavaScript.blockToCode(nextBlock);
            return code.substr(0, callbackIdx) + "function() {\n" +
                "  " + nextCode + "}" + code.substr(callbackIdx + MAGIC_CALLBACK_CODE.length);
        } else {

            return Blockly.JavaScript.scrub__(block, code);
        }
    }

    function updateCode() {
        var code = Blockly.JavaScript.workspaceToCode(Blockly.workspace);
        window.dispatchEvent(new CustomEvent('updateCode', { detail: code }));
    }

    Blockly.workspace.addChangeListener(() => {
        updateCode();
        const state = Blockly.serialization.workspaces.save(Blockly.workspace);
        localStorage.setItem('workspace-state', JSON.stringify(state));
    });

    window.addEventListener('updateBlockly', function (e) {
        const state = JSON.parse(e.detail);
        if (state) {
            Blockly.serialization.workspaces.load(state, Blockly.workspace);
        }
    });

    // window.workspace = Blockly.workspace;

    setTimeout(() => {
        const state = JSON.parse(localStorage.getItem('workspace-state'));
        if (state) {
            Blockly.serialization.workspaces.load(state, Blockly.workspace);
        }
    }, 2000);


})();