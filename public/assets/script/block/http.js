Blockly.Blocks.http_get = {
    category: 'http',
    init: function () {
        this.appendValueInput('url')
            .appendField('发送GET请求');
        this.appendDummyInput('success_var')
            .appendField('存入变量')
            .appendField(new Blockly.FieldVariable('数据'), 'success_var');
        this.appendDummyInput('error_var')
            .appendField('错误信息存入变量')
            .appendField(new Blockly.FieldVariable('错误'), 'error_var');
        this.appendStatementInput('success')
            .appendField('请求成功');
        this.appendStatementInput('error')
            .appendField('请求失败');
        this.setInputsInline(true)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(225);
    },
    toolbox: {
        inputs: {
            url: {
                shadow: {
                    type: 'text',
                    fields: {
                        TEXT: "http://s.espjs.cn/hello"
                    }
                }
            },
            success: {
                block: {
                    type: 'console_log',
                    inputs: {
                        message: {
                            block: {
                                type: 'variables_get',
                                fields: {
                                    VAR: {
                                        name: '数据'
                                    }
                                }
                            }
                        },
                    }
                }
            },
            error: {
                block: {
                    type: 'console_log',
                    inputs: {
                        message: {
                            block: {
                                type: 'variables_get',
                                fields: {
                                    VAR: {
                                        name: '错误'
                                    }
                                }
                            }
                        },
                    }
                }
            }
        }
    }
};
Blockly.JavaScript.forBlock.http_get = function (block, generator) {
    const value_url = generator.valueToCode(block, 'url', javascript.Order.ATOMIC);
    const success_var = generator.getVariableName(block.getFieldValue('success_var'));
    const error_var = generator.getVariableName(block.getFieldValue('error_var'));
    const statement_success = generator.statementToCode(block, 'success');
    const statement_error = generator.statementToCode(block, 'error');
    return `require("http").get(${value_url}, function(res) {
                ${success_var} = "";
                res.on('data', function(data) { ${success_var} += data; });
                res.on('close', function() {
                    ${statement_success}
                });
            }).on('error', function(e) {
                ${error_var} = e;
                ${statement_error}
            });`;
}
Blockly.Blocks.http_post = {
    category: 'http',
    init: function () {
        this.appendDummyInput('NAME')
            .appendField('发送POST请求');
        this.appendValueInput('url')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('请求地址');
        this.appendValueInput('content')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('发送数据');
        this.appendValueInput('type')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('数据类型');
        this.appendStatementInput('success')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('请求成功')
            .appendField(new Blockly.FieldVariable('返回结果'), 'result');
        this.appendStatementInput('error')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('请求失败')
            .appendField(new Blockly.FieldVariable('错误信息'), 'error');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(225);
    },
    toolbox: {
        inputs: {
            url: {
                shadow: {
                    type: 'text',
                    fields: {
                        TEXT: "http://s.espjs.cn/hello"
                    }
                }
            },
            content: {
                shadow: {
                    type: 'text',
                    fields: {
                        TEXT: "hello world"
                    }
                }
            },
            type: {
                block: {
                    type: 'http_content_type',
                    fields: {
                        TEXT: "hello world"
                    }
                }
            },
            success: {
                block: {
                    type: 'console_log',
                    inputs: {
                        message: {
                            block: {
                                type: 'variables_get',
                                fields: {
                                    VAR: {
                                        name: '返回结果'
                                    }
                                }
                            }
                        },
                    }
                }
            },
            error: {
                block: {
                    type: 'console_log',
                    inputs: {
                        message: {
                            block: {
                                type: 'variables_get',
                                fields: {
                                    VAR: {
                                        name: '错误信息'
                                    }
                                }
                            }
                        },
                    }
                }
            }
        }
    }
};
Blockly.JavaScript.forBlock.http_post = function (block, generator) {
    const value_url = generator.valueToCode(block, 'url', javascript.Order.ATOMIC);
    const value_content = generator.valueToCode(block, 'content', javascript.Order.ATOMIC);
    const value_type = generator.valueToCode(block, 'type', javascript.Order.ATOMIC);
    const variable_result = generator.getVariableName(block.getFieldValue('result'));
    const statement_success = generator.statementToCode(block, 'success');
    const variable_error = generator.getVariableName(block.getFieldValue('error'));
    const statement_error = generator.statementToCode(block, 'error');


    return `(() => {
                var options = url.parse(${value_url});
                content = ${value_content};
                options.method = 'POST';
                options.headers = {
                    "Content-Type": ${value_type},
                    "Content-Length": content.length
                };
                var req = require("http").request(options, function(res)  {
                    ${variable_result} = "";
                    res.on('data', function(data) { ${variable_result}+= data; });
                    res.on('close', function(data) { 
                        ${statement_success}
                    });
                });
                req.on('error', function(e) {
                    ${variable_error} = e;
                    ${statement_error}
                });
                req.end(content);
            })();\n`;
}


Blockly.Blocks.http_content_type = {
    category: 'http',
    init: function () {
        this.appendDummyInput('NAME')
            .appendField(new Blockly.FieldDropdown([
                ['text/plain', 'text/plain'],
                ['application/json', 'application/json'],
                ['text/xml', 'text/xml'],
                ['text/html', 'text/html']
            ]), 'NAME');
        this.setOutput(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(225);
    },
};
Blockly.JavaScript.forBlock.http_content_type = function (block, generator) {
    const dropdown_name = block.getFieldValue('NAME');
    const code = `"${dropdown_name}"`;
    console.log(javascript.Order.NONE);
    return [code, javascript.Order.ATOMIC];
}