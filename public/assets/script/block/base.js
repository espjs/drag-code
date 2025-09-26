Blockly.Blocks.console_log = {
    category: 'base',
    init: function () {
        this.appendValueInput('message')
            .appendField('调试输出');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(330);
    },
    toolbox: {
        inputs: {
            message: {
                block: {
                    type: 'text',
                }
            }
        }
    }
};

Blockly.JavaScript.forBlock.console_log = function (block, generator) {
    var message = generator.valueToCode(block, 'message', Blockly.JavaScript.ORDER_ATOMIC);
    return 'console.log(' + message + ');\n';
};


Blockly.Blocks.var_init_value = {
    category: 'base-hide',
    init: function () {
        this.appendDummyInput('NAME')
            .appendField(new Blockly.FieldDropdown([
                ['空字符串', '""'],
                ['0', '0'],
                ['空数组', '[]'],
                ['空对象', '{}'],
                ['null', 'null']
            ]), 'value');
        this.setInputsInline(true)
        this.setOutput(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(0);
    }
};

Blockly.JavaScript.forBlock.var_init_value = function (block, generator) {
    const dropdown_value = block.getFieldValue('value');
    const code = `${dropdown_value}`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];

};

Blockly.Blocks.var_name = {
    category: 'base',
    init: function () {
        this.appendDummyInput('var_name')
            .appendField(new Blockly.FieldTextInput('变量名'), 'var_name');
        this.setInputsInline(true)
        this.setOutput(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(0);
    }
};

Blockly.JavaScript.forBlock.var_name = function (block, generator) {
    const text_var_name = block.getFieldValue('var_name');
    const code = encodeURI(text_var_name).replace(/%/g, '_');
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks.var_init = {
    category: 'base',
    init: function () {
        this.appendValueInput('var_name')
            .setCheck('var_name')
            .appendField('创建变量');
        this.appendValueInput('value')
            .appendField('=');
        this.setInputsInline(true)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(0);
    },
    toolbox: {
        inputs: {
            var_name: {
                block: {
                    type: 'var_name',
                    fields: {
                        var_name: "变量名"
                    }
                }
            },
            value: {
                block: {
                    type: 'var_init_value',
                    fields: {
                        value: '""'
                    }
                }
            }
        }
    }
};

Blockly.JavaScript.forBlock.var_init = function (block, generator) {
    const value_var_name = generator.valueToCode(block, 'var_name', Blockly.JavaScript.ORDER_ATOMIC);
    const value_value = generator.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);

    return `var ${value_var_name} = ${value_value};`;
};


Blockly.Blocks.var_set = {
    category: 'base',
    init: function () {
        this.appendValueInput('var_name')
            .setCheck('var_name')
            .appendField('设置变量');
        this.appendValueInput('value')
            .appendField('=');
        this.setInputsInline(true)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(0);
    },
    toolbox: {
        inputs: {
            var_name: {
                block: {
                    type: 'var_name',
                    fields: {
                        var_name: "变量名"
                    }
                }
            },
            value: {
                block: {
                    type: 'text',
                    fields: {
                        TEXT: ''
                    }
                }
            }
        }
    }
};

Blockly.JavaScript.forBlock.var_set = function (block, generator) {
    const value_var_name = generator.valueToCode(block, 'var_name', Blockly.JavaScript.ORDER_ATOMIC);
    const value_value = generator.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);

    return `${value_var_name} = ${value_value};`;
};
