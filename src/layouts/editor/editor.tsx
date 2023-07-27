/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { Allotment, AllotmentHandle } from "allotment";
import "allotment/dist/style.css";
import { Box } from "@mui/material";
import TopBar from "@/components/editor/TopBar";
import { InnerEditor_Code } from "@/components/editor/InnerEditor_Code";
import { InnerEditor_Visual } from "@/components/editor/InnerEditor_Visual";
import InnerEditorProps from "@/components/editor/InnerEditor";
import { ReadOnlyCodeView } from "@/components/editor/ReadOnlyCodeView";
import { Logger } from "@/core/Logging";
import Toolbar from "@/components/editor/Toolbar";
import { Service } from "@/core/Service";
import { ApplicationService } from "@/core/ApplicationService";
import "@/layouts/editor/allotment.css";
import { SnackbarProvider } from "notistack";
import PuzzleDescription from "@/components/editor/PuzzleDescription";
import Viewport from "@/components/editor/Viewport";
import { ViewportService } from "@/core/ViewportService";
import { usePuzzle } from "@/core/PuzzleService";
import LoadingScreen from "@/components/editor/LoadingScreen";
import { CodeEvalService } from "@/core/CodeEvalService";
import Tutorial from "@/components/editor/Tutorial";
import "@/layouts/editor/scrollbars.css";

enum EditorMode {
	Text,
	Visual
}

// Layout component used for the main editor UI
export default function EditorLayout() {
	// Height of the top bar and toolbar
	const TOP_BAR_HEIGHT : number = 64;
	const TOOLBAR_HEIGHT : number = 48;

	const [editorMode, setEditorMode] = useState(EditorMode.Visual);
	const [desiredEditorSize, setDesiredEditorSize] = useState<InnerEditorProps>({sizeX: 0, sizeY: 0});
	const [code, setCode] = useState("");
	const [puzzle] = usePuzzle();

	function changeMode(mode : EditorMode) {
		setEditorMode(mode);
	}

	// Called when the main layout changes (e.g. a resize)
	function onEditorLayoutChange(type : number, sizes : number[]) {
		// sizes[] contains the sizes of each element, the editor is at #0
		var editorSize = sizes[0];

		if (type == 0)
			setDesiredEditorSize({ sizeX: editorSize });
		else if (type == 1)
			setDesiredEditorSize({ sizeY: editorSize });

		// Tell the viewport we updated
		Service.get(ViewportService).updateGameSize();
	}

	// Called when any of the inner editor's code changed
	function onCodeChanged(code : string) {
		setCode(CodeEvalService.makeFriendlyCode(code));
		Service.get(ApplicationService).setProgram(code);
	}

	return (
		<Box sx={{height: "100vh", p: 0}}>
			{/* Joyride tutorial system */}
			<Tutorial />

			{/* Loading */}
			{!puzzle && <LoadingScreen />}

			{/* Main layout to hold top bar and other elements vertically */}
			<Allotment vertical>

				{/* Top bar pane with fixed height */}
				<Allotment.Pane minSize={TOP_BAR_HEIGHT} maxSize={TOP_BAR_HEIGHT}>
					<TopBar onModeChange={changeMode}/>
				</Allotment.Pane>

				{/* Main UI element layout */}
				<Allotment onChange={(sizes) => onEditorLayoutChange(0, sizes)} defaultSizes={[5,2.5]}>

					{/* Inner */}
					<Allotment onChange={(sizes) => onEditorLayoutChange(1, sizes)} vertical defaultSizes={[5,1]}>
						<Allotment.Pane>
							{editorMode == EditorMode.Text && <InnerEditor_Code onCodeChanged={onCodeChanged} />}
							{editorMode == EditorMode.Visual && <InnerEditor_Visual sizeX={desiredEditorSize.sizeX} sizeY={desiredEditorSize.sizeY} onCodeChanged={onCodeChanged} />}
						</Allotment.Pane>

						{editorMode == EditorMode.Visual && <Allotment.Pane>
							<div id="cq-read-only-code" style={{height: "100%", width: "100%"}}>
								<ReadOnlyCodeView code={code} />
							</div>
						</Allotment.Pane>}
					</Allotment>

					{/* Right column */}
					<Allotment.Pane minSize={250}>

						{/* Right column vertical layout */}
						<Allotment vertical defaultSizes={[1,0.2,0.85]} onChange={(sizes) => onEditorLayoutChange(2, sizes)}>

							{/* Top row */}
							<Allotment.Pane>
								<Viewport />
							</Allotment.Pane>

							{/* Toolbar */}
							<Allotment.Pane minSize={TOOLBAR_HEIGHT} maxSize={TOOLBAR_HEIGHT}>
								<Toolbar />
							</Allotment.Pane>

							{/* Bottom row */}
							<Allotment.Pane>
								<PuzzleDescription />
							</Allotment.Pane>

						</Allotment>
					</Allotment.Pane>
				</Allotment>
			</Allotment>

			{/* Global snackbar (notification) provider */}
			<SnackbarProvider maxSnack={10} autoHideDuration={3000} />
		</Box>
	);
}