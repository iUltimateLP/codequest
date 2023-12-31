/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import { LocalizedString } from "@/core/LocalizationService";
import Blockly from "blockly";

// @ts-ignore Idk why this is not working...
import { Order } from "blockly/javascript";
import { CodeBinding } from "./CodeBinding";

// This is a copy of Blockly's control_repeat_ext

function isNumber(str: string): boolean {
    return /^\s*-?\d+(\.\d+)?\s*$/.test(str);
}

const binding : CodeBinding = {
    // Name of the binding
    name: "repeat",

    // The comment to place above the generated code of this binding
    comment: function(block : Blockly.Block, generator : Blockly.CodeGenerator) : LocalizedString {
        const times : number = parseInt(generator.valueToCode(block, 'TIMES', Order.ASSIGNMENT) || "0");
        return {
            en: `Repeats the enclosed code block ${times} times`,
            de: `Wiederholt den eingeschlossenen Code-Block ${times} mal`
        };
    },

    // Blockly toolbox category
    blocklyToolboxCategory: "LOOPS",

    // Blockly toolbox block definition
    blocklyToolboxDefinition: {
        kind: "block",
        type: "repeat",
        inputs: {
            TIMES: {
                shadow: {
                    type: "math_number",
                    fields: {
                        NUM: "1"
                    }
                }
            }
        }
    },

    // Blockly block generator callback
    blocklyGenerator: function(block : Blockly.Block) {
        block.appendDummyInput()
            .appendField("%{BKY_CQ_REPEAT_A}")
        block.appendValueInput("TIMES");
        block.appendDummyInput()
            .appendField("%{BKY_CQ_REPEAT_B}");
        block.appendStatementInput("DO")
            .setCheck(null);
        block.setInputsInline(true);
        block.setPreviousStatement(true, null);
        block.setNextStatement(true, null);
        block.setColour(155);
        block.setTooltip("");
        block.setHelpUrl("");
    },

    // Blockly code generator callback
    codeGenerator: function(block : Blockly.Block, generator : Blockly.CodeGenerator) : string {
        // Repeat n times
        let repeats;
        if (block.getField('TIMES')) {
            // Internal number
            repeats = String(Number(block.getFieldValue('TIMES')));
        } else {
            // External number
            repeats = generator.valueToCode(block, 'TIMES', Order.ASSIGNMENT) || '0'; 
        }
        
        let branch = generator.statementToCode(block, 'DO');
        branch = branch.trim(); // Remove any trailing whitespaces
        if (branch.endsWith("  \n"))
            branch = branch.slice(0, branch.lastIndexOf("  \n"));

        branch = generator.addLoopTrap(branch, block);
        let code = '';
        // @ts-ignore
        const loopVar = generator.nameDB_.getDistinctName('count', "VARIABLE");
        let endVar = repeats;
        if (!repeats.match(/^\w+$/) && !isNumber(repeats)) {
            // @ts-ignore
            endVar = generator.nameDB_.getDistinctName('repeat_end', "VARIABLE");
            code += 'var ' + endVar + ' = ' + repeats + ';\n';
        }
        code += 'for (var ' + loopVar + ' = 0; ' + loopVar + ' < ' + endVar + '; ' + loopVar + '++) \n{\n' + branch + '\n}\n';
        return code;
    },

    // Native JavaScript function to execute
    nativeFn: function() {
        
    },

    // Whether this function is asynchronous or not
    async: false
}

export default binding;
