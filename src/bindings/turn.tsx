/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import { CodeEvalService } from "@/core/CodeEvalService";
import { LocalizedString } from "@/core/LocalizationService";
import { Service } from "@/core/Service";
import { UiService } from "@/core/UiService";
import { ViewportService } from "@/core/ViewportService";
import CodeQuestScene from "@/scenes/CodeQuestScene";
import Blockly from "blockly";

// @ts-ignore Idk why this is not working...
import { Order } from "blockly/javascript";
import { Direction } from "grid-engine";
import { CodeBinding } from "./CodeBinding";

const binding : CodeBinding = {
    // Name of the binding
    name: "turn",

    // The comment to place above the generated code of this binding
    comment: function(block : Blockly.Block) : LocalizedString {
        var direction = block.getFieldValue("DIRECTION") as string;
        return {
            en: `Turns the player ${direction.toLowerCase()}`,
            de: `Dreht den Spieler nach ${direction == "LEFT" ? "links" : "rechts"}`,
        };
    },

    // Blockly toolbox category
    blocklyToolboxCategory: "MOVEMENT",

    // Blockly toolbox block definition
    blocklyToolboxDefinition: {
        kind: "block",
        type: "turn"
    },

    // Blockly block generator callback
    blocklyGenerator: function(block : Blockly.Block) {
        block.appendDummyInput()
            .appendField("%{BKY_CQ_TURN}")
            .appendField(new Blockly.FieldDropdown([["%{BKY_CQ_TURN_LEFT}", "LEFT"], ["%{BKY_CQ_TURN_RIGHT}", "RIGHT"]]), "DIRECTION");
        block.setFieldValue("RIGHT", "DIRECTION");
        block.setInputsInline(true);
        block.setPreviousStatement(true, null);
        block.setNextStatement(true, null);
        block.setColour(217);
        block.setTooltip("");
        block.setHelpUrl("");
    },

    // Blockly code generator callback
    codeGenerator: function(block : Blockly.Block, generator : Blockly.CodeGenerator) : string {
        var direction = block.getFieldValue("DIRECTION");
        return `turn(${direction});\n`;
    },

    // Prepare the interpreter
    prepareInterpreter: function(interpreter : Interpreter, globalObject : Object) {
        interpreter.setProperty(globalObject, "LEFT", 0);
        interpreter.setProperty(globalObject, "RIGHT", 1);
    },

    // Native JavaScript function to execute
    nativeFn: function(dir : number, callback : any) {
        // Get the city scene
        var scene : CodeQuestScene | null = Service.get(ViewportService).getScene<CodeQuestScene>();
        if (!scene)
            return;
        
        scene.turnPlayer(dir == 1);

        // Set a small timeout before the next turn as turns are interpolated and take a bit of time
        setTimeout(() => {
            Service.get(CodeEvalService).resumeAsyncExecution(() => callback());
        }, 400);
    },
    
    async: true
}

export default binding;
