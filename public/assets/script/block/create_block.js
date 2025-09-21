Blockly.Blocks.create_new_block = {
    category: 'create_block',
    init: function () {
        this.appendDummyInput('name')
            .appendField('名称')
            .appendField(new Blockly.FieldTextInput('default'), 'name');
        this.appendStatementInput('inputs')
            .appendField('输入');
        this.appendDummyInput('inputs_model')
            .appendField(new Blockly.FieldDropdown([
                ['自动', 'automatic'],
                ['外部', 'external'],
                ['内联', 'inline'],
            ]), 'inputs_model')
            .appendField('输入');
        this.appendDummyInput('connections')
            .appendField(new Blockly.FieldDropdown([
                ['无', 'null'],
                ['← 左', 'output'],
                ['↕ 上下', 'prev-next'],
                ['↑ 上', 'prev'],
                ['↓ 下', 'next']
            ]), 'connections')
            .appendField('连接');
        this.appendValueInput('tooltip')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('工具提示');
        this.appendValueInput('hellp_url')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('帮助地址');
        this.appendValueInput('top_check')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('顶部连接检查');
        this.appendValueInput('bottom_check')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('底部连接检查');
        this.appendValueInput('colour')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('卡片颜色');
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(225);
    }
};

Blockly.JavaScript.forBlock.create_new_block = function () {
    const text_name = block.getFieldValue('name');
    const statement_inputs = generator.statementToCode(block, 'inputs');
    const dropdown_inputs_model = block.getFieldValue('inputs_model');
    const dropdown_connections = block.getFieldValue('connections');
    const value_tooltip = generator.valueToCode(block, 'tooltip', javascript.Order.ATOMIC);
    const value_hellp_url = generator.valueToCode(block, 'hellp_url', javascript.Order.ATOMIC);
    const value_top_check = generator.valueToCode(block, 'top_check', javascript.Order.ATOMIC);
    const value_bottom_check = generator.valueToCode(block, 'bottom_check', javascript.Order.ATOMIC);
    const value_colour = generator.valueToCode(block, 'colour', javascript.Order.ATOMIC);
    const code = '...';
    return code;
}