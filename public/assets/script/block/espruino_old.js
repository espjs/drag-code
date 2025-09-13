/*
Espruino官方提供的一些卡片, 经过了简单修改和汉化
*/

var MAGIC_CALLBACK_CODE = "function(){NEXT_BLOCKS}";
var ESPRUINO_COL = 190;
var PINS = [
    ["NodeMCU.A0", 'NodeMCU.A0'],
    ["NodeMCU.D0", 'NodeMCU.D0'],
    ["NodeMCU.D1", 'NodeMCU.D1'],
    ["NodeMCU.D2", 'NodeMCU.D2'],
    ["NodeMCU.D3", 'NodeMCU.D3'],
    ["NodeMCU.D4", 'NodeMCU.D4'],
    ["NodeMCU.D5", 'NodeMCU.D5'],
    ["NodeMCU.D6", 'NodeMCU.D6'],
    ["NodeMCU.D7", 'NodeMCU.D7'],
    ["NodeMCU.D8", 'NodeMCU.D8'],
    ["指示灯", ' NodeMCU.D4'],

];

var DATETIME_TYPES = [
    ["Second", "Seconds"],
    ["Minute", "Minutes"],
    ["Hour", "Hours"],
    ["Day", "Day"],
    ["Month", "Month"],
    ["Year", "FullYear"],
    ["Date", "Date"],
    ["Time", "Time"],
    ["Millisecond", "Milliseconds"],
    ["Time Zone Offset", "TimezoneOffset"]
];


// Blockly.Blocks.espruino_delay = {
//     category: 'Espruino',
//     init: function () {
//         this.appendValueInput('SECONDS')
//             .setCheck('Number')
//             .appendField(Blockly.Msg.ESPRUINO_WAIT);
//         this.appendDummyInput()
//             .appendField(Blockly.Msg.ESPRUINO_SECONDS);

//         this.setPreviousStatement(true);
//         this.setNextStatement(true);
//         this.setColour(ESPRUINO_COL);
//         this.setInputsInline(true);
//         this.setTooltip(Blockly.Msg.ESPRUINO_WAIT_TOOLTIP);
//     },
//     inputs: {
//         SECONDS: {
//             "block": {
//                 "type": "math_number",
//                 "fields": {
//                     "NUM": 1
//                 }
//             }
//         }
//     }
// };
Blockly.Blocks.espruino_timeout = {
    category: 'Espruino',
    init: function () {
        this.appendValueInput('SECONDS')
            .setCheck('Number')
            .appendField(Blockly.Msg.ESPRUINO_AFTER);
        this.appendDummyInput()
            .appendField(Blockly.Msg.ESPRUINO_SECONDS);
        this.appendStatementInput('DO')
            .appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(ESPRUINO_COL);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.ESPRUINO_AFTER_TOOLTIP);
    },
    inputs: {
        SECONDS: {
            "block": {
                "type": "math_number",
                "fields": {
                    "NUM": 1
                }
            }
        }
    }
};
Blockly.Blocks.espruino_interval = {
    category: 'Espruino',
    init: function () {
        this.appendValueInput('SECONDS')
            .setCheck('Number')
            .appendField(Blockly.Msg.ESPRUINO_EVERY);
        this.appendDummyInput()
            .appendField(Blockly.Msg.ESPRUINO_SECONDS);
        this.appendStatementInput('DO')
            .appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(ESPRUINO_COL);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.ESPRUINO_EVERY_TOOLTIP);
    },
    inputs: {
        SECONDS: {
            "block": {
                "type": "math_number",
                "fields": {
                    "NUM": 1
                }
            }
        }
    }
};

Blockly.Blocks.espruino_pin = {
    //      category: 'Espruino',
    init: function () {

        var start = 0;
        var incrementStep = 10;
        var originalPin = undefined;
        var listGen = function () {
            originalPin = this.value_;
            var list = PINS.slice(start, start + incrementStep);
            if (start > 0) list.unshift([Blockly.Msg.ESPRUINO_BACK + "...", Blockly.Msg.ESPRUINO_BACK]);
            if (start + incrementStep < PINS.length) list.push([Blockly.Msg.ESPRUINO_MORE + '...', Blockly.Msg.ESPRUINO_MORE]);
            return list;
        };

        var pinSelector = new Blockly.FieldDropdown(listGen, function (selection) {
            var ret = undefined;

            if (selection == Blockly.Msg.ESPRUINO_MORE || selection == Blockly.Msg.ESPRUINO_BACK) {
                if (selection == Blockly.Msg.ESPRUINO_MORE)
                    start += incrementStep;
                else
                    start -= incrementStep;

                var t = this;
                setTimeout(function () { t.showEditor_(); }, 1);

                return originalPin;
            }
        });

        this.setColour(ESPRUINO_COL);
        this.setOutput(true, 'Pin');
        this.appendDummyInput().appendField(pinSelector, 'PIN');
        this.setTooltip(Blockly.Msg.ESPRUINO_PIN_NAME);
    },
};


Blockly.Blocks.espruino_watch = {
    category: 'Espruino',
    init: function () {
        this.appendValueInput('PIN')
            .setCheck('Pin')
            .appendField(Blockly.Msg.ESPRUINO_WATCH);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(this.EDGES), 'EDGE').appendField('边缘');
        this.appendStatementInput('DO')
            .appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(ESPRUINO_COL);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.ESPRUINO_WATCH_TOOLTIP);
    },
    EDGES: [
        ["both 上升|下降", 'both'],
        ["上升", 'rising'],
        ["下降", 'falling']
    ],
    inputs: {
        PIN: {
            "block": {
                "type": "espruino_pin",
                "fields": {
                    "PIN": 'NodeMCU.D0'
                }
            }
        }
    }
};


Blockly.Blocks.espruino_getTime = {
    category: 'Espruino',
    init: function () {
        this.appendDummyInput().appendField(Blockly.Msg.ESPRUINO_TIME);
        this.setOutput(true, 'Number');
        this.setColour(ESPRUINO_COL);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.ESPRUINO_TIME_TOOLTIP);
    }
};


Blockly.Blocks.espruino_digitalWrite = {
    category: 'Espruino',
    init: function () {
        this.appendValueInput('PIN')
            .setCheck('Pin')
            .appendField(Blockly.Msg.ESPRUINO_DIGITALWRITE);
        this.appendValueInput('VAL')
            .setCheck(['Number', 'Boolean'])
            .appendField(Blockly.Msg.ESPRUINO_VALUE);

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(ESPRUINO_COL);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.ESPRUINO_DIGITALWRITE_TOOLTIP);
    },
    inputs: {
        PIN: {
            "block": {
                "type": "espruino_pin",
                "fields": {
                    "PIN": 'NodeMCU.D0'
                }
            }
        },
        VAL: {
            "block": {
                "type": "math_number",
                "fields": {
                    "NUM": 1
                }
            }
        }
    }
};
Blockly.Blocks.espruino_digitalPulse = {
    category: 'Espruino',
    init: function () {
        this.appendValueInput('PIN')
            .setCheck('Pin')
            .appendField(Blockly.Msg.ESPRUINO_DIGITALPULSE);
        this.appendValueInput('VAL')
            .setCheck(['Boolean']);
        this.appendValueInput('TIME')
            .setCheck(['Number'])
            .appendField(Blockly.Msg.ESPRUINO_MILLISECONDS);

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(ESPRUINO_COL);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.ESPRUINO_DIGITALPULSE_TOOLTIP);
    },
    inputs: {
        PIN: {
            "block": {
                "type": "espruino_pin",
                "fields": {
                    "PIN": 'NodeMCU.D0'
                }
            }
        },
        VAL: {
            "block": {
                "type": "logic_boolean"
            }
        },
        TIME: {
            "block": {
                "type": "math_number",
                "fields": {
                    "NUM": 10
                }
            }
        }
    }
};
Blockly.Blocks.espruino_digitalRead = {
    category: 'Espruino',
    init: function () {
        this.appendValueInput('PIN')
            .setCheck('Pin')
            .appendField(Blockly.Msg.ESPRUINO_DIGITALREAD);

        this.setOutput(true, 'Boolean');
        this.setColour(ESPRUINO_COL);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.ESPRUINO_DIGITALREAD_TOOLTIP);
    },
    inputs: {
        PIN: {
            "block": {
                "type": "espruino_pin",
                "fields": {
                    "PIN": 'NodeMCU.D0'
                }
            }
        },
    }
};

Blockly.Blocks.espruino_analogWrite = {
    category: 'Espruino',
    init: function () {
        this.appendValueInput('PIN')
            .setCheck('Pin')
            .appendField(Blockly.Msg.ESPRUINO_ANALOGWRITE);
        this.appendValueInput('VAL')
            .setCheck(['Number', 'Boolean'])
            .appendField(Blockly.Msg.ESPRUINO_VALUE);

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(ESPRUINO_COL);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.ESPRUINO_ANALOGWRITE_TOOLTIP);
    },
    inputs: {
        PIN: {
            "block": {
                "type": "espruino_pin",
                "fields": {
                    "PIN": 'NodeMCU.A0'
                }
            }
        },
        VAL: {
            "block": {
                "type": "logic_boolean"
            }
        },
    }
};
Blockly.Blocks.espruino_analogRead = {
    category: 'Espruino',
    init: function () {
        this.appendValueInput('PIN')
            .setCheck('Pin')
            .appendField(Blockly.Msg.ESPRUINO_ANALOGREAD);

        this.setOutput(true, 'Number');
        this.setColour(ESPRUINO_COL);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.ESPRUINO_ANALOGREAD_TOOLTIP);
    },
    inputs: {
        PIN: {
            "block": {
                "type": "espruino_pin",
                "fields": {
                    "PIN": 'NodeMCU.A0'
                }
            }
        },
    }
};
Blockly.Blocks.espruino_pinMode = {
    category: 'Espruino',
    init: function () {
        this.appendValueInput('PIN')
            .setCheck('Pin')
            .appendField(Blockly.Msg.ESPRUINO_PINMODE);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(this.PINMODES), 'MODE');

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(ESPRUINO_COL);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.ESPRUINO_PINMODE_TOOLTIP);
    },
    PINMODES: [
        ["input", 'input'],
        ["input_pulldown", 'input_pulldown'],
        ["input_pullup", 'input_pullup'],
        ["output", 'output']
    ],
    inputs: {
        PIN: {
            "block": {
                "type": "espruino_pin",
                "fields": {
                    "PIN": 'NodeMCU.A0'
                }
            }
        },
    }
};

// Blockly.Blocks.espruino_code = {
//     category: 'Espruino',
//     init: function () {
//         this.appendDummyInput().appendField(new Blockly.FieldMultilineInput("// Enter JavaScript Statements Here"), "CODE");

//         this.setPreviousStatement(true);
//         this.setNextStatement(true);
//         this.setColour(ESPRUINO_COL);
//         this.setInputsInline(true);
//         this.setTooltip(Blockly.Msg.ESPRUINO_JS_TOOLTIP);
//     }
// };

Blockly.Blocks.espruino_jsexpression = {
    category: 'Espruino',
    init: function () {
        this.appendDummyInput().appendField(new Blockly.FieldTextInput('"A JavaScript "+"Expression"'), "EXPR");
        this.setOutput(true, 'String');
        this.setColour(ESPRUINO_COL);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.ESPRUINO_JSEXPR_TOOLTIP);
    }
};
// -----------------------------------------------------------------------------------
Blockly.Blocks.get_datetime = {
    category: 'Espruino',
    init: function () {
        this.appendDummyInput().appendField('Get Current ').appendField(new Blockly.FieldDropdown(DATETIME_TYPES), 'DTTYPE');
    }
};
Blockly.JavaScript.get_datetime = function () {
    var dttype = this.getFieldValue('DTTYPE');
    return [`Date.get${dttype}();\n`, Blockly.JavaScript.ORDER_ATOMIC];
};
// ----------------------------------------------------------
Blockly.Blocks.hw_servoMove = {
    category: 'Espruino',
    init: function () {
        this.appendValueInput('PIN')
            .setCheck('Pin')
            .appendField(Blockly.Msg.ESPRUINO_MOVE_SERVO);
        this.appendValueInput('VAL')
            .setCheck(['Number', 'Boolean'])
            .appendField(Blockly.Msg.ESPRUINO_TO);

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(ESPRUINO_COL);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.ESPRUINO_MOVE_SERVO_TOOLTIP);
    }
};
Blockly.Blocks.hw_servoStop = {
    category: 'Espruino',
    init: function () {
        this.appendValueInput('PIN')
            .setCheck('Pin')
            .appendField(Blockly.Msg.ESPRUINO_STOP_SERVO);

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(ESPRUINO_COL);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.ESPRUINO_STOP_SERVO_TOOLTIP);

    }
};
Blockly.Blocks.hw_ultrasonic = {
    category: 'Espruino',
    init: function () {
        this.appendValueInput('TRIG')
            .setCheck('Pin')
            .appendField(Blockly.Msg.ESPRUINO_ULTRASONIC_GET_TRIG);
        this.appendValueInput('ECHO')
            .setCheck('Pin')
            .appendField(Blockly.Msg.ESPRUINO_ULTRASONIC_ECHO);
        this.setOutput(true, 'Number');
        this.setColour(ESPRUINO_COL);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.ESPRUINO_ULTRASONIC_TOOLTIP);
    }
};






Blockly.JavaScript.text_print = function () {
    var argument0 = Blockly.JavaScript.valueToCode(this, 'TEXT',
        Blockly.JavaScript.ORDER_NONE) || '\'\'';
    return 'print(' + argument0 + ');\n';
};
Blockly.JavaScript.forBlock.espruino_delay = function () {
    var seconds = Blockly.JavaScript.valueToCode(this, 'SECONDS',
        Blockly.JavaScript.ORDER_ASSIGNMENT) || '1';
    return "setTimeout(" + MAGIC_CALLBACK_CODE + ", 1000*" + seconds + ");\n"
};
Blockly.JavaScript.forBlock.espruino_timeout = function () {
    var seconds = Blockly.JavaScript.valueToCode(this, 'SECONDS',
        Blockly.JavaScript.ORDER_ASSIGNMENT) || '1';
    var branch = Blockly.JavaScript.statementToCode(this, 'DO');
    return "setTimeout(function() {\n" + branch + " }, " + seconds + "*1000.0);\n";
};
Blockly.JavaScript.forBlock.espruino_getTime = function () {
    return ["getTime()\n", Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript.forBlock.espruino_interval = function () {
    var seconds = Blockly.JavaScript.valueToCode(this, 'SECONDS',
        Blockly.JavaScript.ORDER_ASSIGNMENT) || '1';
    var branch = Blockly.JavaScript.statementToCode(this, 'DO');
    return "setInterval(function() {\n" + branch + " }, " + seconds + "*1000.0);\n";
};
Blockly.JavaScript.forBlock.espruino_pin = function () {
    var code = this.getFieldValue('PIN');
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript.forBlock.espruino_watch = function () {
    var pin = Blockly.JavaScript.valueToCode(this, 'PIN', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    var edge = this.getFieldValue('EDGE');
    var branch = Blockly.JavaScript.statementToCode(this, 'DO');
    var json = { repeat: true, edge: edge };
    if (pin == "BTN1") json.debounce = 10;
    return "setWatch(function() {\n" + branch + " }, " + pin + ", " + JSON.stringify(json) + ");\n";
};
Blockly.JavaScript.forBlock.espruino_digitalWrite = function () {
    var pin = Blockly.JavaScript.valueToCode(this, 'PIN', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    var val = Blockly.JavaScript.valueToCode(this, 'VAL', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    return "digitalWrite(" + pin + ", " + val + ");\n";
};
Blockly.JavaScript.forBlock.espruino_digitalPulse = function () {
    var pin = Blockly.JavaScript.valueToCode(this, 'PIN', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    var val = Blockly.JavaScript.valueToCode(this, 'VAL', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    var tim = Blockly.JavaScript.valueToCode(this, 'TIME', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    return "digitalPulse(" + pin + ", " + val + ", " + tim + ");\n";
};
Blockly.JavaScript.forBlock.espruino_digitalRead = function () {
    var pin = Blockly.JavaScript.valueToCode(this, 'PIN', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    return ["digitalRead(" + pin + ")\n", Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript.forBlock.espruino_analogWrite = function () {
    var pin = Blockly.JavaScript.valueToCode(this, 'PIN', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    var val = Blockly.JavaScript.valueToCode(this, 'VAL', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    return "analogWrite(" + pin + ", " + val + ");\n";
};
Blockly.JavaScript.forBlock.espruino_analogRead = function () {
    var pin = Blockly.JavaScript.valueToCode(this, 'PIN', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    return ["analogRead(" + pin + ")\n", Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript.forBlock.espruino_pinMode = function () {
    var pin = Blockly.JavaScript.valueToCode(this, 'PIN', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    var mode = this.getFieldValue('MODE');
    return "pinMode(" + pin + ", " + JSON.stringify(mode) + ");\n";
}
Blockly.JavaScript.forBlock.espruino_code = function () {
    var code = JSON.stringify(this.getFieldValue("CODE"));
    return "eval(" + code + ");\n";
};
Blockly.JavaScript.forBlock.espruino_jsexpression = function () {
    var code = this.getFieldValue("EXPR");
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
// -----------------------------------------------------------------------------------
Blockly.JavaScript.forBlock.hw_servoMove = function () {
    var pin = Blockly.JavaScript.valueToCode(this, 'PIN', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    var val = Blockly.JavaScript.valueToCode(this, 'VAL', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    return "analogWrite(" + pin + ", (1.5+0.7*(" + val + "))/20, {freq:50});\n";
};
Blockly.JavaScript.forBlock.hw_servoStop = function () {
    var pin = Blockly.JavaScript.valueToCode(this, 'PIN', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    return "digitalWrite(" + pin + ", 0);\n";
};
Blockly.JavaScript.forBlock.hw_ultrasonic = function () {
    var trig = Blockly.JavaScript.valueToCode(this, 'TRIG', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    var echo = Blockly.JavaScript.valueToCode(this, 'ECHO', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    var funcVar = "ultrasonic" + trig + echo;
    var distanceVar = "dist" + trig + echo;
    var watchVar = "isListening" + trig + echo;
    var functionName = Blockly.JavaScript.provideFunction_(
        funcVar,
        ["function " + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + "() {",
        "  if (!global." + distanceVar + ") {",
        "    " + distanceVar + "=[0];",
            "    setWatch(",
            "      function(e) {",
        "        " + distanceVar + "=" + distanceVar + ".slice(-4);",
        "        " + distanceVar + ".push((e.time-e.lastTime)*17544); },",
        "      " + echo + ", {repeat:true, edge:'falling'});",
            "    setInterval(",
        "      function(e) { digitalPulse(" + trig + ", 1, 0.01/*10uS*/); }, 50);",
            "  }",
        "  var d = " + distanceVar + ".slice(0).sort();",
            "  return d[d.length>>1];",
            "}"]);
    return [funcVar + "()", Blockly.JavaScript.ORDER_ATOMIC];
};
