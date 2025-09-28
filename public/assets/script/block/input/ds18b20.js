Blockly.Blocks.DS18B20 = {
    category: 'DS18B20',
    init: function () {
        this.appendValueInput('pin')
            .appendField('获取');
        this.appendDummyInput('variable')
            .appendField('上DS18B20的温度数值, 存入')
            .appendField(new Blockly.FieldVariable('温度'), 'temp');
        this.setInputsInline(true)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('DS18B20温度传感器只能接在D3引脚, 我也不知道为什么.');
        this.setHelpUrl('');
        this.setColour(225);
    },
    toolbox: {
        inputs: {
            pin: {
                block: {
                    type: 'espruino_pin',
                    fields: {
                        PIN: 'D3'
                    }
                }
            }
        },
        next: {
            block: {
                type: 'espruino_console_log',
                inputs: {
                    VAL: {
                        block: {
                            type: 'variables_get',
                            fields: {
                                VAR: {
                                    name: '温度'
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

Blockly.JavaScript.forBlock.DS18B20 = function (block, generator) {
    const value_pin = generator.valueToCode(block, 'pin', javascript.Order.ATOMIC);
    const variable_temp = generator.getVariableName(block.getFieldValue('temp'));
    // var text_key = Math.random().toString(36).substring(2);

    return `global.DS18B20 = global.DS18B20 ? global.DS18B20 : {};
        if (!global.DS18B20['${value_pin}']) {
            global.DS18B20['${value_pin}'] = require("DS18B20").connect(new OneWire(${value_pin}));
        } 
        ${variable_temp} = global.DS18B20['${value_pin}'].getTemp();
    `;
}


// Blockly.Blocks.DS18B20_temp = {
//     category: 'DS18B20',
//     init: function () {
//         this.appendDummyInput('NAME')
//             .appendField('温度');
//         this.setOutput(true, null);
//         this.setTooltip('');
//         this.setHelpUrl('');
//         this.setColour(300);
//     }
// };

// Blockly.JavaScript.forBlock.DS18B20_temp = function (block, generator) {
//     return ['temp', javascript.Order.NONE];
// }