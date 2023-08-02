/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

"use client";

import * as React from "react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import InnerEditorProps from "./InnerEditor";
import MonacoWrapper from "./monaco/MonacoWrapper";
import Palette from "./Palette";

// Inner editor widget for the code programming editor (wrapping Monaco) 
function InnerEditor_Code(props : InnerEditorProps) {
	return (
		<Allotment defaultSizes={[2,5]}>
			{/* Left column */}
			<Allotment.Pane minSize={0}>
				<Palette />
			</Allotment.Pane>

			{/* Middle column */}
			<Allotment.Pane minSize={250}>
				<div style={{width: "100%", height: "100%"}}>
					<MonacoWrapper language="javascript" theme="light" onCodeChange={props.onCodeChanged} />
				</div>
			</Allotment.Pane>
		</Allotment>
	);
}

export { InnerEditor_Code };
