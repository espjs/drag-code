Blockly.Blocks.espruino_mqtt_require = {
    category: 'mqtt',
    init: function () {
        this.appendDummyInput('NAME')
            .appendField('导入MQTT模块');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(225);
    }
}
Blockly.JavaScript.forBlock.espruino_mqtt_require = function () {
    return 'var MQTT = require("MQTT");\n';
}

Blockly.Blocks.espruino_mqtt_connect = {
    category: 'mqtt',
    init: function () {
        this.appendDummyInput('name')
            .appendField('连接MQTT服务器');
        this.appendValueInput('server')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('服务器地址');
        this.appendValueInput('port')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('端口');
        this.appendValueInput('username')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('用户名');
        this.appendValueInput('password')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('密码');
        this.appendStatementInput('success')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('连接成功');
        this.appendStatementInput('publish')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('收到消息');
        this.appendStatementInput('disconnected')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('连接被断开');
        this.appendStatementInput('error')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('连接失败');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(225);
    },
    inputs: {
        server: {
            block: {
                type: "text",
                fields: {
                    "TEXT": "broker.emqx.io"
                }
            }
        },
        port: {
            block: {
                type: "text",
                fields: {
                    "TEXT": "1883"
                }
            }
        },
        username: {
            block: {
                type: "text",
                fields: {
                    "TEXT": ""
                }
            }
        },
        password: {
            block: {
                type: "text",
                fields: {
                    "TEXT": ""
                }
            }
        },
        // success: 'success',
        // publish: 'publish',
        // disconnected: 'disconnected',
        // error: 'error'
    }
};
Blockly.JavaScript.forBlock.espruino_mqtt_connect = function (block, generator) {
    const value_server = generator.valueToCode(block, 'server', javascript.Order.ATOMIC);
    const value_port = generator.valueToCode(block, 'port', javascript.Order.ATOMIC);
    const value_username = generator.valueToCode(block, 'username', javascript.Order.ATOMIC);
    const value_password = generator.valueToCode(block, 'password', javascript.Order.ATOMIC);
    const statement_success = generator.statementToCode(block, 'success');
    const statement_publish = generator.statementToCode(block, 'publish');
    const statement_disconnected = generator.statementToCode(block, 'disconnected');
    const statement_error = generator.statementToCode(block, 'error');
    const code = `
        global.mqtt = MQTT.create(${value_server}, {
            client_id : "random",
            keep_alive: 60,
            port: ${value_port},
            clean_session: true,
            username: ${value_username},
            password: ${value_password},
            protocol_name: "MQTT",
            protocol_level: 4
        });

        global.mqtt.on('connected', function() {
            ${statement_success}
        });

        global.mqtt.on('publish', function (pub) {
            ${statement_publish}
        });

        global.mqtt.on('disconnected', function() {
            ${statement_disconnected}
        });

        global.mqtt.on('error', function (message) {
            ${statement_error}
        });

        global.mqtt.connect();
    `;
    return code;
}


Blockly.Blocks.espruino_mqtt_subscribe = {
    category: 'mqtt',
    init: function () {
        this.appendValueInput('topic')
            .appendField('订阅主题');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(225);
    },
    inputs: {
        topic: {
            block: {
                type: "text",
                fields: {
                    "TEXT": "topic"
                }
            }
        },
    }
};
Blockly.JavaScript.forBlock.espruino_mqtt_subscribe = function (block, generator) {
    const value_topic = generator.valueToCode(block, 'topic', javascript.Order.ATOMIC);
    var code = `global.mqtt.subscribe(${value_topic});`;
    return code;
}

Blockly.Blocks.espruino_mqtt_publish = {
    category: 'mqtt',
    init: function () {
        this.appendValueInput('topic')
            .appendField('发布主题');
        this.appendValueInput('message')
            .appendField('内容');
        this.setInputsInline(true)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(225);
    },
    inputs: {
        topic: {
            block: {
                type: "text",
                fields: {
                    "TEXT": "topic"
                }
            }
        },
        message: {
            block: {
                type: "text",
                fields: {
                    "TEXT": "message"
                }
            }
        },
    }
};
Blockly.JavaScript.forBlock.espruino_mqtt_publish = function (block, generator) {
    const value_topic = generator.valueToCode(block, 'topic', javascript.Order.ATOMIC);
    const value_message = generator.valueToCode(block, 'message', javascript.Order.ATOMIC);
    var code = `global.mqtt.publish(${value_topic}, ${value_message});`;
    return code;
}



Blockly.Blocks.espruino_mqtt_unsubscribe = {
    category: 'mqtt',
    init: function () {
        this.appendValueInput('topic')
            .appendField('取消订阅');
        this.setInputsInline(true)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(225);
    },
    inputs: {
        topic: {
            block: {
                type: "text",
                fields: {
                    "TEXT": "topic"
                }
            }
        },
    }
};

Blockly.JavaScript.forBlock.espruino_mqtt_unsubscribe = function (block, generator) {
    const value_topic = generator.valueToCode(block, 'topic', javascript.Order.ATOMIC);
    const code = `global.mqtt.unsubscribe(${value_topic});`;
    return code;
}

Blockly.Blocks.espruino_mqtt_reconnect = {
    category: 'mqtt',
    init: function () {
        this.appendDummyInput('NAME')
            .appendField('MQTT重新连接');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(225);
    }
};

Blockly.JavaScript.forBlock.espruino_mqtt_reconnect = function () {
    return 'global.mqtt.connect();\n';
}


Blockly.Blocks.espruino_mqtt_query_topic = {
    category: 'mqtt',
    init: function () {
        this.appendValueInput('topic')
            .setCheck('String')
            .appendField('如果主题是');
        this.appendStatementInput('do')
            .appendField('执行');
        this.setInputsInline(true)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(225);
    },
    inputs: {
        topic: {
            block: {
                type: "text",
                fields: {
                    "TEXT": "topic"
                }
            }
        },
    },
};

Blockly.JavaScript.forBlock.espruino_mqtt_query_topic = function (block, generator) {
    const value_topic = generator.valueToCode(block, 'topic', javascript.Order.ATOMIC);
    const statement_do = generator.statementToCode(block, 'do');
    const code = `
        if (pub.topic === ${value_topic}) {
            ${statement_do}
        }
    `;
    return code;
}



Blockly.Blocks.espruino_mqtt_topic = {
    category: 'mqtt',
    init: function () {
        this.appendDummyInput('NAME')
            .appendField('获取主题名');
        this.setInputsInline(true)
        this.setOutput(true);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(225);
    }
};

Blockly.JavaScript.forBlock.espruino_mqtt_topic = function () {
    return ['pub.topic', javascript.Order.ATOMIC];
}



Blockly.Blocks.espruino_mqtt_message = {
    category: 'mqtt',
    init: function () {
        this.appendDummyInput('NAME')
            .appendField('获取消息内容');
        this.setInputsInline(true)
        this.setOutput(true);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(225);
    }
};

Blockly.JavaScript.forBlock.espruino_mqtt_message = function () {
    return ['pub.message', javascript.Order.ATOMIC];
}


