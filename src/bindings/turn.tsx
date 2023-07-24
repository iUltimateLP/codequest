/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import { CodeBinding, CodeEvalService } from "@/core/CodeEvalService";
import { Service } from "@/core/Service";
import { UiService } from "@/core/UiService";
import { ViewportService } from "@/core/ViewportService";
import CityScene from "@/scenes/CityScene";
import Blockly from "blockly";

// @ts-ignore Idk why this is not working...
import { Order } from "blockly/javascript";
import { Direction } from "grid-engine";

const binding : CodeBinding = {
    // Name of the binding
    name: "turn",

    // Blockly toolbox category
    blocklyToolboxCategory: "UTIL",

    // Blockly toolbox block definition
    blocklyToolboxDefinition: {
        kind: "block",
        type: "turn"
    },

    // Blockly block generator callback
    blocklyGenerator: function(block : Blockly.Block) {
        block.appendDummyInput()
            .appendField("Turn");
        block.setInputsInline(true);
        block.setPreviousStatement(true, null);
        block.setNextStatement(true, null);
        block.setColour(230);
        block.setTooltip("");
        block.setHelpUrl("");
    },

    // Blockly code generator callback
    codeGenerator: function(block : Blockly.Block, generator : Blockly.CodeGenerator) : string {
        return "turn();\n";
    },

    // Native JavaScript function to execute
    nativeFn: function(callback : any) {
        // Get the city scene
        var scene : CityScene | null = Service.get(ViewportService).getScene<CityScene>();
        if (!scene)
            return;

        scene.turnPlayer();

        // Set a small timeout before the next turn as turns are interpolated and take a bit of time
        setTimeout(() => {
            Service.get(CodeEvalService).resumeAsyncExecution(() => callback());
        }, 400);
    },
    
    async: true
}

export default binding;
