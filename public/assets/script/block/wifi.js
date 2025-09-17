Blockly.Blocks.espruino_wifi = {
    category: 'wifi',
    init: function () {
        this.jsonInit({
            "type": "espruino_wifi",
            "tooltip": "",
            "helpUrl": "",
            "message0": "配置无线连接 %1 无线名称 %2 无线密码 %3 连接成功 %4 连接失败 %5",
            "args0": [
                {
                    "type": "input_dummy",
                    "name": "n"
                },
                {
                    "type": "input_value",
                    "name": "ssid",
                    "align": "RIGHT",
                    "check": "String"
                },
                {
                    "type": "input_value",
                    "name": "pwd",
                    "align": "RIGHT",
                    "check": "String"
                },
                {
                    "type": "input_statement",
                    "name": "success"
                },
                {
                    "type": "input_statement",
                    "name": "error"
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": 225
        });
    },
    "inputs": {
        "ssid": {
            "block": {
                "type": "text",
                "fields": {
                    "TEXT": "无线名称"
                }
            }
        },
        "pwd": {
            "block": {
                "type": "text",
                "fields": {
                    "TEXT": "无线密码"
                }
            }
        },
    }
};

Blockly.JavaScript.forBlock.espruino_wifi = function (block, generator) {
    const value_ssid = generator.valueToCode(block, 'ssid', Blockly.JavaScript.ORDER_ATOMIC);
    const value_pwd = generator.valueToCode(block, 'pwd', Blockly.JavaScript.ORDER_ATOMIC);
    const statement_success = generator.statementToCode(block, 'success');
    const statement_error = generator.statementToCode(block, 'error');
    // TODO: Assemble javascript into the code variable.
    return `require('Wifi').connect(${value_ssid}, {password: ${value_pwd}}, function (err) {
        if (err) {
            ${statement_error}
        } else {     
            ${statement_success}       
        }        
    });\n`;
};

Blockly.Blocks.espruino_wifi_get_ip = {
    category: 'wifi',
    init: function () {
        this.jsonInit({
            "type": "espruino_wifi_get_ip",
            "tooltip": "",
            "helpUrl": "",
            "message0": "获取IP地址 %1",
            "args0": [
                {
                    "type": "input_end_row",
                    "name": "NAME"
                }
            ],
            "output": "String",
            "colour": 225
        });
    }
};

Blockly.JavaScript.forBlock.espruino_wifi_get_ip = function (block, generator) {
    var code = "require('Wifi').getIP().ip";
    return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.Blocks.espruino_wifi_get_mac = {
    category: 'wifi',
    init: function () {
        this.jsonInit({
            "type": "espruino_wifi_get_ip",
            "tooltip": "",
            "helpUrl": "",
            "message0": "获取MAC地址 %1",
            "args0": [
                {
                    "type": "input_end_row",
                    "name": "NAME"
                }
            ],
            "output": "String",
            "colour": 225
        });
    }
};

Blockly.JavaScript.forBlock.espruino_wifi_get_mac = function (block, generator) {
    var code = "require('Wifi').getIP().mac";
    return [code, Blockly.JavaScript.ORDER_NONE];
}

