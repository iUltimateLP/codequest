/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

"use client";

import * as React from 'react';
import { redirect } from 'next/navigation';
import ChapterLayout from '@/layouts/chapter/chapter';

interface ChapterRoute {
    params: {
        chapter: string[];
    }
}

// Editor Page
export default function ChapterPage({params} : ChapterRoute) {
    // Check if the URL was formed correctly
    /*if (!params.chapter || params.chapter.length < 1) {
        redirect("/not-found");
    }*/

	return (
        <ChapterLayout />
    );
}
