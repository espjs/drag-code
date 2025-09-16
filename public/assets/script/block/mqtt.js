Blockly.Blocks.espruino_mqtt_connect = {
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
    const statement_error = generator.statementToCode(block, 'error');
    const code = `
        (function () { 
            var mqtt = require("MQTT");
            var server = ${value_server};
            var options = {
                client_id : "random", 
                keep_alive: 60, 
                port: ${value_port},  
                clean_session: true,
                username: ${value_username},  
                password: ${value_password},  
                protocol_name: "MQTT", 
                protocol_level: 4, 
            };
            var mqtt = require("MQTT").create(server, options);

            mqtt.on('connected', function() {
                ${statement_success}
            });

            mqtt.on('publish', function (pub) {
                ${statement_publish}
            });

            mqtt.on('error', function (pub) {
                ${statement_error}
            });

            mqtt.connect();
        })();
    `;
    return code;
}


Blockly.Blocks.espruino_mqtt_subscribe = {
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
    var code = `mqtt.subscribe(${value_topic});`;
    return code;
}


Blockly.Blocks.espruino_mqtt_unsubscribe = {
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
    const code = `mqtt.unsubscribe(${value_topic});`;
    return code;
}