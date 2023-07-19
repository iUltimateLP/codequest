/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

"use client";

import * as React from 'react';
import EditorLayout from '@/layouts/editor/editor';
import { Service } from '@/core/Service';
import { PuzzleService } from '@/core/PuzzleService';
import { redirect } from 'next/navigation';

interface PuzzleEditorRoute {
    params: {
        puzzle: string[];
    }
}

// Editor Page
export default function PuzzleEditorPage({params} : PuzzleEditorRoute) {
    // Check if the URL was formed correctly
    if (!params.puzzle || params.puzzle.length <= 1) {
        redirect("/not-found");
    }

    // Tell the PuzzleService which puzzle was opened based on the URL
    // This will automatically update all parts of the app using "usePuzzle" to access the current puzzle
    const puzzleURL = `${params.puzzle[0]}/${params.puzzle[1]}`;
    Service.get(PuzzleService).loadPuzzle(puzzleURL)
    .catch(err => {
        // Loading puzzle failed, redirect
        
    });

	return (
        <EditorLayout />
    );
}
