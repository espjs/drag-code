
Blockly.Blocks.espruino_console_log = {
    category: 'Espruino',
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
    inputs: {
        VAL: {
            "block": {
                "type": "text",
            }
        },
    }
};
Blockly.JavaScript.forBlock.espruino_console_log = function (block, generator) {
    const value_name = generator.valueToCode(block, 'VAL', Blockly.JavaScript.ORDER_ATOMIC);
    return `console.log(${value_name});\n`;
}

Blockly.Blocks.espruino_start = {
    category: 'Espruino',
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

Blockly.Blocks.espruino_led = {
    category: 'Espruino',
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

Blockly.JavaScript.forBlock.espruino_led = function (block, generator) {
    var dropdown_status = block.getFieldValue('status');
    if (dropdown_status == 'reverse') {
        dropdown_status = '!digitalRead(NodeMCU.D4)';
        return 'global.led_status = !global.led_status;digitalWrite(NodeMCU.D4, global.led_status);\n';
    }
    var status = dropdown_status == 'open' ? 'LOW' : 'HIGH';
    return `digitalWrite(NodeMCU.D4, ${status});global.led_status = ${status};\n`;
};


Blockly.Blocks.espruino_pin_gpio = {
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

Blockly.JavaScript.forBlock.espruino_pin_gpio = function () {
    const text_name = this.getFieldValue('NAME');
    const code = text_name;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
}