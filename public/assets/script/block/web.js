Blockly.Blocks.espruino_start_http_server = {
    init: function () {
        this.appendDummyInput('NAME')
            .appendField('启动网站服务器')
            .appendField(new Blockly.FieldNumber(80, 1, 65535), 'PORT');
        this.appendStatementInput('REQUEST')
            .appendField('收到请求');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(225);
    }
};

Blockly.JavaScript.forBlock.espruino_start_http_server = function (block, generator) {
    const port = block.getFieldValue('PORT');

    const statement_request = generator.statementToCode(block, 'REQUEST');

    // TODO: Assemble javascript into the code variable.
    const code = `require("http").createServer((req, res) => {
                    // res.writeHead(200, {'Content-Type': 'text/plain'});
                    // res.end('Hello World');
                    ${statement_request}
                }).listen(${port});\n`;
    return code;
}


Blockly.Blocks.espruino_web_server_response_end = {
    init: function () {
        this.appendValueInput('VALUE')
            .appendField('结束请求并输出');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(225);
    },
    inputs: {
        VALUE: {
            block: {
                type: 'text',
            }
        }
    }
};

Blockly.JavaScript.forBlock.espruino_web_server_response_end = function (block, generator) {
    const value = generator.valueToCode(block, 'VALUE', javascript.Order.ATOMIC);
    return `res.end(${value});\nreturn;\n`;
}


Blockly.Blocks.espruino_web_server_request = {
    init: function () {
        this.appendValueInput('URL')
            .appendField('如果请求地址是');
        this.appendStatementInput('DO')
            .appendField('执行');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(225);
    },
    inputs: {
        URL: {
            block: {
                type: 'text',
            }
        }
    }
};

Blockly.JavaScript.forBlock.espruino_web_server_request = function (block, generator) {
    const value_url = generator.valueToCode(block, 'URL', javascript.Order.ATOMIC);
    const statement_do = generator.statementToCode(block, 'DO');
    const code = `
    if (req.url === ${value_url}) {
        ${statement_do}
    }
    `;
    return code;
}

Blockly.Blocks.espruino_web_server_get_url = {
    init: function () {
        this.appendEndRowInput('URL')
            .appendField('获取请求地址');
        this.setOutput(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(225);
    }
};
Blockly.JavaScript.forBlock.espruino_web_server_get_url = function (block, generator) {
    const code = 'req.url';
    return [code, javascript.Order.NONE];
}