/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import * as ReactBlockly from "react-blockly";
import { BlocklyWorkspace } from "react-blockly";
import Blockly from "blockly";
import "./blockly.css";
import { WORKSPACE_CONFIG, TEST_TOOLBOX, BLOCKLY_THEME_DARK } from "./BlocklyConfig";
import { Service } from "@/core/Service";
import { VisualProgrammingService } from "@/core/VisualProgrammingService";
import { Logger } from "@/core/Logging";
import { Theme, useTheme } from '@mui/material/styles';

interface BlocklyWrapperProps {
	sizeX? : number,
	sizeY? : number,
	onCodeChanged?: (workspace : Blockly.Workspace, xml : string) => void
}

// Wrapper that wraps Blockly into a React component and provides low-level functionality
export default function BlocklyWrapper(props : BlocklyWrapperProps) {
	// XML is saved in a state
	const [xml, setXml] = useState<string>();
	const [workspace, setWorkspace] = useState<Blockly.WorkspaceSvg>();

    // Get the app's theme so we can style Blockly accordingly
    const theme : Theme = useTheme();
	const [preferedTheme, setPreferedTheme] = useState("light");
	var darkTheme : Blockly.Theme | null = null;

	// This function resizes the blockly window to a new size
	useEffect(() => {
		// Make sure the workspace and it's injection div is already valid
		var div : HTMLElement = workspace?.getInjectionDiv() as HTMLElement;
		if (div == undefined)
			return;

		div.style.left = "0px";
		div.style.top = "0px";

		div.style.width = props.sizeX + "px";
		div.style.height = props.sizeY + "px";

		Blockly.svgResize(workspace!);
	}, [props.sizeX, props.sizeY]);

	// Effect hook for when the theme changes
	useEffect(() => {
		// Apply the theme
		setPreferedTheme(theme.palette.mode);
	}, [theme]);

	useEffect(() => {
		// Create the dark theme if it does not exist yet
		if (!darkTheme) {
			darkTheme = Blockly.Theme.defineTheme("dark", BLOCKLY_THEME_DARK);
		}
		
		workspace?.setTheme(preferedTheme === "light" ? Blockly.Themes.Zelos : darkTheme!);
	}, [preferedTheme]);

	// Called when the workspace (or it's content changed)
	function onWorkspaceChange(newWorkspace : Blockly.WorkspaceSvg) {
		// Ignore if the workspace did not really change
		if (workspace == newWorkspace) {
			return;
		}

		setWorkspace(newWorkspace);
		Service.get(VisualProgrammingService).setBlocklyWorspace(newWorkspace);
	}

	// Called when the XML changes
	function onXmlChange(xml : string) {
		setXml(xml);

		// Call the event, if given
		if (props.onCodeChanged)
			props.onCodeChanged(workspace as Blockly.Workspace, xml);
	}

	return (
		// @ts-ignore
		<BlocklyWorkspace 
			className={"cq-blockly-workspace"}
			toolboxConfiguration={TEST_TOOLBOX}
			initialXml={xml}
			onXmlChange={onXmlChange}
			workspaceConfiguration={{
				...WORKSPACE_CONFIG, 
				theme: theme.palette.mode == "dark" ? "dark" : WORKSPACE_CONFIG.theme,
				grid: {...WORKSPACE_CONFIG.grid, colour: preferedTheme == "dark" ? "#555" : WORKSPACE_CONFIG.grid!.colour} // TODO: crosses don't react on theme change
			}}
			onWorkspaceChange={onWorkspaceChange}
		>

		</BlocklyWorkspace>
	)
}
