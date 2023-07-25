/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import { CodeBinding } from "@/bindings/CodeBinding";
import { CodeEvalService } from "@/core/CodeEvalService";
import { LocalizedString } from "@/core/LocalizationService";
import { Service } from "@/core/Service";
import Blockly from "blockly";

// @ts-ignore Idk why this is not working...
import { Order } from "blockly/javascript";

const binding : CodeBinding = {
    // Name of the binding
    name: "sleep",

    // Comment
    comment: function(block : Blockly.Block) : LocalizedString {
        var time = block.getFieldValue("DURATION") as number;
        return {
            en: `Waits for ${time} seconds, then continues`,
            de: `Wartet für ${time} Sekunden und fährt mit der Ausführung fort`
        };
    },

    // Blockly toolbox category
    blocklyToolboxCategory: "UTIL",

    // Blockly toolbox block definition
    blocklyToolboxDefinition: {
        kind: "block",
        type: "sleep",
        /*inputs: {
            DURATION: {
                shadow: {
                    type: "math_number",
                    fields: {
                        NUM: "1"
                    }
                }
            }
        }*/
    },

    // Blockly block generator callback
    blocklyGenerator: function(block : Blockly.Block) {
        block.appendDummyInput()
            .appendField("%{BKY_CQ_SLEEP_A}")
            .appendField(new Blockly.FieldNumber(1, 0.1, Infinity, 0.1), "DURATION")
            .appendField("%{BKY_CQ_SLEEP_B}");
        block.setInputsInline(true);
        block.setPreviousStatement(true, null);
        block.setNextStatement(true, null);
        block.setColour(230);
        block.setTooltip("");
        block.setHelpUrl("");
    },

    // Blockly code generator callback
    codeGenerator: function(block : Blockly.Block, generator : Blockly.CodeGenerator) : string {
        //var value = generator.valueToCode(block, 'DURATION', Order.NONE);
        var value = block.getFieldValue("DURATION");
        return `sleep(${value});\n`;
    },

    // Native JavaScript function to execute
    nativeFn: function(duration : number, callback : any) {
        // Set a standard JS timeout
        setTimeout(() => {
            Service.get(CodeEvalService).resumeAsyncExecution(() => callback(duration));
        }, duration * 1000);
    },

    async: true
}

export default binding;
