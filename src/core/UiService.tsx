/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import { Service } from "./Service";
import { Howl, Howler } from "howler";
import { enqueueSnackbar } from "notistack";

// This service handles UI actions (such as playing sounds or displaying dialogs)
class UiService extends Service {
    // Plays a sound
    public playSound(soundToPlay : string) {
        var sound = new Howl({
            src: [`assets/sound/${soundToPlay}.ogg`]
        });
        sound.play();
    }

    // Shows a notification in the bottom-left corner
    public showNotification(text : string, variant : "default" | "error" | "success" | "info" | "warning" = "default", playSound : boolean = false) {
        // We use notistack's enqueueSnackbar for that
        enqueueSnackbar(text, {
            variant: variant
        });

        // Play sound if wanted
        if (playSound === true) {
            this.playSound("notification");
        }
    }
}

export { UiService }
