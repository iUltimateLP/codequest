/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

"use client";

import * as React from "react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import BlocklyWrapper from "@/components/editor/blockly/BlocklyWrapper";
import InnerEditorProps from "./InnerEditor";
import Blockly from "blockly";
import { Service } from "@/core/Service";
import { VisualProgrammingService } from "@/core/VisualProgrammingService";

// Inner editor widget for the visual programming editor (wrapping Blockly) 
function InnerEditor_Visual(props : InnerEditorProps) {
	function onCodeChanged(workspace : Blockly.Workspace, xml : string) {
		var code = Service.get(VisualProgrammingService).compileBlocklyWorkspace();
		
		if (props.onCodeChanged)
			props.onCodeChanged(code);
	}

	return (
		<Allotment>
			{/* Middle column */}
			<Allotment.Pane minSize={250}>
				<div style={{width: "100%", height: "100%"}}>
					<BlocklyWrapper sizeX={props.sizeX} sizeY={props.sizeY} onCodeChanged={onCodeChanged} />
				</div>
			</Allotment.Pane>
		</Allotment>
	);
}

export { InnerEditor_Visual };
