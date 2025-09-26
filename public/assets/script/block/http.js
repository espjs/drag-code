Blockly.Blocks.http_get = {
    category: 'http',
    init: function () {
        this.appendDummyInput('get')
            .appendField('发送GET请求');
        this.appendValueInput('url')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('接口地址');
        this.appendValueInput('success_var')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('请求成功');
        this.appendStatementInput('success_callback');
        this.appendValueInput('error_var')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('请求失败');
        this.appendStatementInput('error_callback');
        this.setInputsInline(false)
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
            success_var: {
                block: {
                    type: 'var_name',
                    fields: {
                        var_name: '返回结果'
                    }
                }
            },
            success_callback: {
                block: {
                    type: 'console_log',
                    inputs: {
                        message: {
                            block: {
                                type: 'var_name',
                                fields: {
                                    var_name: '返回结果'
                                }
                            }
                        }
                    }
                }
            },
            error_var: {
                block: {
                    type: 'var_name',
                    fields: {
                        var_name: '错误信息'
                    }
                }
            },
            error_callback: {
                block: {
                    type: 'console_log',
                    inputs: {
                        message: {
                            block: {
                                type: 'var_name',
                                fields: {
                                    var_name: '错误信息'
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};
Blockly.JavaScript.forBlock.http_get = function (block, generator) {
    const value_url = generator.valueToCode(block, 'url', javascript.Order.ATOMIC);
    const success_var = generator.valueToCode(block, 'success_var', javascript.Order.ATOMIC);
    const error_var = generator.valueToCode(block, 'error_var', javascript.Order.ATOMIC);
    const statement_success = generator.statementToCode(block, 'success_callback');
    const statement_error = generator.statementToCode(block, 'error_callback');
    return `require("http").get(${value_url}, function(res) {
                var ${success_var} = "";
                res.on('data', function(data) { ${success_var} += data; });
                res.on('close', function() {
                    ${statement_success}
                });
            }).on('error', function(${error_var}) {
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
        this.appendValueInput('success_var')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('请求成功');
        this.appendStatementInput('success_callback')
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput('error_var')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('请求失败');
        this.appendStatementInput('error_callback')
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.setInputsInline(false)
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
                        option: "text/plain"
                    }
                }
            },
            success_var: {
                block: {
                    type: 'var_name',
                    fields: {
                        var_name: '返回结果'
                    }
                }
            },
            success_callback: {
                block: {
                    type: 'console_log',
                    inputs: {
                        message: {
                            block: {
                                type: 'var_name',
                                fields: {
                                    var_name: '返回结果'
                                }
                            }
                        }
                    }
                }
            },
            error_var: {
                block: {
                    type: 'var_name',
                    fields: {
                        var_name: '错误信息'
                    }
                }
            },
            error_callback: {
                block: {
                    type: 'console_log',
                    inputs: {
                        message: {
                            block: {
                                type: 'var_name',
                                fields: {
                                    var_name: '错误信息'
                                }
                            }
                        }
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
    const success_var = generator.valueToCode(block, 'success_var', javascript.Order.ATOMIC);
    const error_var = generator.valueToCode(block, 'error_var', javascript.Order.ATOMIC);
    const statement_success = generator.statementToCode(block, 'success_callback');
    const statement_error = generator.statementToCode(block, 'error_callback');


    return `(() => {
                var options = url.parse(${value_url});
                content = ${value_content};
                options.method = 'POST';
                options.headers = {
                    "Content-Type": ${value_type},
                    "Content-Length": content.length
                };
                var req = require("http").request(options, function(res)  {
                    ${success_var} = "";
                    res.on('data', function(data) { ${success_var}+= data; });
                    res.on('close', function(data) { 
                        ${statement_success}
                    });
                });
                req.on('error', function(${error_var}) {
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
            ]), 'option');
        this.setOutput(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(225);
    },
};
Blockly.JavaScript.forBlock.http_content_type = function (block, generator) {
    const dropdown_name = block.getFieldValue('option');
    const code = `"${dropdown_name}"`;
    return [code, javascript.Order.ATOMIC];
}