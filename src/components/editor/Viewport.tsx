/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import { Logger } from "@/core/Logging";
import { Service } from "@/core/Service";
import { ViewportService } from "@/core/ViewportService";
import { Box, CircularProgress, Typography } from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import { Game as GameType, Scene as SceneType } from "phaser";

// Provides a viewport div for Phaser to render on
export default function Viewport() {
    const isDevelopment = process?.env?.NODE_ENV !== "development";
    const [game, setGame] = useState<GameType>();

    // Need to use a side effect for initialising Phaser otherwise it'd try to do that on next.js build
    useEffect(() => {
        async function initPhaser() {
            // Asynchronously import libraries
            const Phaser = await import("phaser");
            const { default: GridEngine } = await import("grid-engine");

            // Asynchronously load scenes
            const { default: BlankScene } = await import("@/scenes/BlankScene");
            const { default: CityScene } = await import("@/scenes/CityScene");
            const PHASER_SCENE_REGISTRY : Map<string, SceneType> = new Map<string, SceneType>([
                ["BLANK", BlankScene],
                ["CITY", CityScene]
            ]);

            if (game)
                return;

            // Phaser game config
            const config : Phaser.Types.Core.GameConfig = {
                parent: "phaser-div",
                type: Phaser.AUTO,
                backgroundColor: 0,
                scale: {
                    mode: Phaser.Scale.ScaleModes.FIT,
                    resizeInterval: 50,
                    width: 512,
                    height: 512,
                    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
                },
                physics: {
                    default: "arcade",
                    arcade: {
                        gravity: { y: 200 }
                    }
                },
                render: {
                    //transparent: true,
                    antialias: false
                },
                plugins: {
                    scene: [
                        {
                            key: "gridEngine",
                            plugin: GridEngine,
                            mapping: "gridEngine"
                        }
                    ]
                },
                callbacks: {
                    postBoot: (game) => {
                        Service.get(ViewportService).setGame(phaserGame);
                        Service.get(ViewportService).loadScene();
                    }
                }
            };

            const phaserGame = new Phaser.Game(config);
            setGame(phaserGame);
            Service.get(ViewportService).setSceneRegistry(PHASER_SCENE_REGISTRY);
            Logger.info("Asynchronously creating Phaser game instance");
        }
        initPhaser();
    }, []);

    return (
        <Box sx={{p: 0, height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}} id="cq-viewport">
            {/* @ts-ignore */}
            <div id="phaser-div" style={{position: "absolute"}}></div>
            {!game && <Typography align="center" variant="body2">Loading...</Typography>}
        </Box>
    );
}
