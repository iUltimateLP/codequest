/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

'use client';

import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { NextAppDirEmotionCacheProvider } from '@/components/theme/EmotionCache';
import { lightTheme, darkTheme } from './theme';
import { Box, ScopedCssBaseline } from '@mui/material';
import { Service } from '@/core/Service';
import { StorageService } from '@/core/StorageService';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function ThemeRegistry({ children }: { children: React.ReactNode }) {
	const [mode, setMode] = React.useState<"light" | "dark">("light");
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => {
					const newMode = prevMode === "light" ? "dark" : "light";
					Service.get(StorageService).setString("theme", newMode);
					return newMode;
				});
            }
        }), []);

	const theme = React.useMemo(
		() => {
			return mode === "light" ? lightTheme : darkTheme;
		}, [mode]);

	React.useEffect(() => {
		const savedTheme = Service.get(StorageService).getString("theme");
		if (savedTheme === "light")
			setMode("light");
		else if (savedTheme === "dark")
			setMode("dark");
	}, []);

	return (
		<ColorModeContext.Provider value={colorMode}>
			{/*<NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>*/} {/* THIS CAUSES ISSUES WITH HOTSWAPPING LIGHT/DARK THEME! */}
					<ThemeProvider theme={theme}>
						{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
						<CssBaseline enableColorScheme={true} />
						{children}
					</ThemeProvider>
			{/*</NextAppDirEmotionCacheProvider>*/}
		</ColorModeContext.Provider>
	);
}

export { ThemeRegistry, ColorModeContext };
