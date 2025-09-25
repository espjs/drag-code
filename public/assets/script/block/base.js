Blockly.Blocks.console_log = {
    category: 'base',
    init: function () {
        this.appendValueInput('message')
            .appendField('调试输出');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(225);
    }
};

Blockly.JavaScript.forBlock.console_log = function (block, generator) {
    var message = generator.valueToCode(block, 'message', Blockly.JavaScript.ORDER_ATOMIC);
    return 'console.log(' + message + ');\n';
};