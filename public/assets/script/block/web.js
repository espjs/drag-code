Blockly.Blocks.espruino_start_http_server = {
    category: 'web',
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
    const code = `
        require("http").createServer((req, res) => {
            ${statement_request}
        }).listen(${port});
    `;
    return code;
}


Blockly.Blocks.espruino_web_server_response_end = {
    category: 'web',
    init: function () {
        this.appendValueInput('VALUE')
            .appendField('结束请求并输出');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(225);
    },
    toolbox: {
        inputs: {
            VALUE: {
                block: {
                    type: 'text',
                }
            }
        }
    }
};

Blockly.JavaScript.forBlock.espruino_web_server_response_end = function (block, generator) {
    const value = generator.valueToCode(block, 'VALUE', javascript.Order.ATOMIC);
    return `res.end(${value});\nreturn;\n`;
}


Blockly.Blocks.espruino_web_server_request = {
    category: 'web',
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
    toolbox: {
        inputs: {
            URL: {
                block: {
                    type: 'text',
                }
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
    category: 'web',
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

Blockly.Blocks.espruino_web_server_set_header = {
    category: 'web',
    init: function () {
        this.appendValueInput('NAME')
            .appendField('设置响应头');
        this.appendValueInput('VALUE')
            .appendField('为');
        this.setInputsInline(true)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(225);
    },
    toolbox: {
        inputs: {
            NAME: {
                block: {
                    type: 'text',
                    fields: {
                        TEXT: "Content-Type"
                    }
                }
            },
            VALUE: {
                block: {
                    type: 'text',
                    fields: {
                        TEXT: "text/html; charset=utf-8"
                    }
                }
            }
        }
    }
};
Blockly.JavaScript.forBlock.espruino_web_server_set_header = function (block, generator) {
    const value_name = generator.valueToCode(block, 'NAME', javascript.Order.ATOMIC);
    const value_value = generator.valueToCode(block, 'VALUE', javascript.Order.ATOMIC);
    const code = `res.setHeader(${value_name}, ${value_value});\n`;
    return code;
}