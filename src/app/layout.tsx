/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import * as React from 'react';
import { ThemeRegistry } from '@/components/theme/ThemeRegistry';
import { Box } from '@mui/material';

// Page metadata
export const metadata = {
	title: "CodeQuest",
	description: "CodeQuest",
};

// Root Layout
export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<ThemeRegistry>
				<body>
					{children}
				</body>
			</ThemeRegistry>
		</html>
	);
}
