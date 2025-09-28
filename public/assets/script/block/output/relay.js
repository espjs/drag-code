Blockly.Blocks.relay = {
    category: 'relay',
    init: function () {
        this.appendValueInput('name')
            .appendField('继电器');
        this.appendValueInput('pin')
            .appendField('连接到');
        this.appendDummyInput('mode')
            .appendField('控制模式')
            .appendField(new Blockly.FieldDropdown([
                ['低电压触发', 'low'],
                ['高电压触发', 'high']
            ]), 'mode');
        this.setInputsInline(true)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(225);
    },
    toolbox: {
        inputs: {
            name: {
                block: {
                    type: 'var_name',
                    fields: {
                        var_name: '继电器1'
                    }
                }
            },
            pin: {
                block: {
                    type: 'espruino_pin',
                    fields: {
                        PIN: 'D2'
                    }
                }
            }
        }
    }
};

Blockly.JavaScript.forBlock.relay = function (block, generator) {
    const value_name = generator.valueToCode(block, 'name', javascript.Order.ATOMIC);
    const value_pin = generator.valueToCode(block, 'pin', javascript.Order.ATOMIC);
    const dropdown_mode = block.getFieldValue('mode');
    var open_voltage = dropdown_mode == 'low' ? 0 : 1;
    const code = `var ${value_name} = {
        pin: ${value_pin},
        open_voltage: ${open_voltage},
        open: function () {
            digitalWrite(this.pin, this.open_voltage);
        },
        close: function () {
            digitalWrite(this.pin, !this.open_voltage);
        }
    };`;
    return code;
}


Blockly.Blocks.relay_open = {
    category: 'relay',
    init: function () {
        this.appendValueInput('name')
            .appendField('打开继电器');
        this.setInputsInline(true)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(225);
    },
    toolbox: {
        inputs: {
            name: {
                block: {
                    type: 'var_name',
                    fields: {
                        var_name: '继电器1'
                    }
                }
            }
        }
    }
};

Blockly.JavaScript.forBlock.relay_open = function (block, generator) {
    const value_name = generator.valueToCode(block, 'name', javascript.Order.ATOMIC);
    const code = `${value_name}.open();`;
    return code;
}

Blockly.Blocks.relay_close = {
    category: 'relay',
    init: function () {
        this.appendValueInput('name')
            .appendField('关闭继电器');
        this.setInputsInline(true)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(225);
    },
    toolbox: {
        inputs: {
            name: {
                block: {
                    type: 'var_name',
                    fields: {
                        var_name: '继电器1'
                    }
                }
            }
        }
    }
};

Blockly.JavaScript.forBlock.relay_close = function (block, generator) {
    const value_name = generator.valueToCode(block, 'name', javascript.Order.ATOMIC);
    const code = `${value_name}.close();`;
    return code;
}