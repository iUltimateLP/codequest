/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import { Button } from "@mui/material";
import { Service } from "./Service";
import { Howl } from "howler";
import { enqueueSnackbar } from "notistack";

interface NotificationOptions {
    variant? : "default" | "error" | "success" | "info" | "warning";
    playSound? : boolean;
    buttons?: NotificationButtonOptions[];
}

interface NotificationButtonOptions {
    text : string;
    color? : "error" | "success" | "info" | "warning" | "primary" | "inherit" | "secondary";
    callback? : () => void;
};

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
    public showNotification(text : string, options : NotificationOptions = {}) {
        // We use notistack's enqueueSnackbar for that

        // Build action object
        var action = (options && options.buttons && options.buttons.length > 0) ? (<>
            {options.buttons.map(button => (<Button key={button.text} variant="text" color={button.color || "primary"} onClick={button.callback}>{button.text}</Button>))}
        </>) : null;

        // Enqueue the snackbar
        enqueueSnackbar(text, {
            variant: options.variant || "default",
            action: action
        });

        // Play sound if wanted
        if (options.playSound == undefined || options.playSound === true) {
            this.playSound("notification");
        }
    }
}

export { UiService }
