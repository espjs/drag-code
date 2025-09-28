
Blockly.Blocks.espruino_start = {
    category: 'esp8266',
    init: function () {
        this.jsonInit({
            "type": "espruino_start",
            "tooltip": "",
            "helpUrl": "",
            "message0": "设备启动完成 %1",
            "args0": [
                {
                    "type": "input_statement",
                    "name": "NAME"
                }
            ],
            "colour": 225
        });
    }
};

Blockly.JavaScript.forBlock.espruino_start = function (block, generator) {
    const statement_name = generator.statementToCode(block, 'NAME');
    return `(function (){
        ${statement_name}
    })();\n`;
}


Blockly.Blocks.espruino_console_log = {
    category: 'esp8266',
    init: function () {
        this.jsonInit({
            "type": "espruino_console_log",
            "tooltip": "",
            "helpUrl": "",
            "message0": "调试输出 %1",
            "args0": [
                {
                    "type": "input_value",
                    "name": "VAL"
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": 0
        });
    },
    toolbox: {
        inputs: {
            VAL: {
                "shadow": {
                    "type": "text",
                }
            },
        }
    }
};
Blockly.JavaScript.forBlock.espruino_console_log = function (block, generator) {
    const value_name = generator.valueToCode(block, 'VAL', Blockly.JavaScript.ORDER_ATOMIC);
    return `console.log(${value_name});\n`;
}



Blockly.Blocks.esp8266_led = {
    category: 'esp8266',
    init: function () {
        this.appendDummyInput('NAME')
            .appendField(new Blockly.FieldDropdown([
                ['打开', 'open'],
                ['关闭', 'close'],
                ['反转', 'reverse'],
            ]), 'status')
            .appendField('指示灯');
        this.setInputsInline(true)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(210);
    }
};

Blockly.JavaScript.forBlock.esp8266_led = function (block, generator) {
    var dropdown_status = block.getFieldValue('status');
    if (dropdown_status == 'reverse') {
        dropdown_status = '!digitalRead(NodeMCU.D4)';
        return 'global.led_status = !global.led_status;digitalWrite(NodeMCU.D4, global.led_status);\n';
    }
    var status = dropdown_status == 'open' ? 'LOW' : 'HIGH';
    return `digitalWrite(NodeMCU.D4, ${status});global.led_status = ${status};\n`;
};

Blockly.Blocks.esp8266_led_blink = {
    category: 'esp8266',
    init: function () {
        this.appendDummyInput('NAME')
            .appendField('闪烁指示灯, 间隔')
            .appendField(new Blockly.FieldTextInput('500'), 'time')
            .appendField('毫秒');
        this.setInputsInline(true)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(225);
    }
};

Blockly.JavaScript.forBlock.esp8266_led_blink = function (block, generator) {
    const text_time = block.getFieldValue('time');
    return `global.led_st = setInterval(() => {
                global.led_status = !global.led_status;
                digitalWrite(NodeMCU.D4, global.led_status);
            }, ${text_time});\n`;
};

Blockly.Blocks.esp8266_stop_led_blink = {
    category: 'esp8266',
    init: function () {
        this.appendDummyInput('NAME')
            .appendField('停止闪烁指示灯');
        this.setInputsInline(true)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(225);
    }
};

Blockly.JavaScript.forBlock.esp8266_stop_led_blink = function (block, generator) {
    const text_time = block.getFieldValue('time');
    return `if (global.led_st) {
                clearInterval(global.led_st);
                global.led_st = null;
            };
            digitalWrite(NodeMCU.D4, 1);\n`;
};


Blockly.Blocks.esp8266_pin_gpio = {
    category: 'esp8266',
    init: function () {
        this.appendDummyInput('gpio')
            .appendField('GPIO_')
            .appendField(new Blockly.FieldTextInput('0'), 'NAME');
        this.setOutput(true, 'Pin');
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(225);
    }
};

Blockly.JavaScript.forBlock.esp8266_pin_gpio = function () {
    const text_name = this.getFieldValue('NAME');
    const code = text_name;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.Blocks.esp8266_pin = {
    category: 'esp8266',
    init: function () {
        this.appendDummyInput('pin')
            .appendField('NodeMCU.')
            .appendField(new Blockly.FieldTextInput('D0'), 'pin');
        this.setOutput(true, 'Pin');
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(225);
    }
};

Blockly.JavaScript.forBlock.esp8266_pin = function () {
    const text_name = this.getFieldValue('pin');
    const code = 'NodeMCU.' + text_name;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
}