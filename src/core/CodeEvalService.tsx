/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import { Logger } from "./Logging";
import { Service } from "./Service";
import Interpreter from "js-interpreter";

// This service is responsible for executing and evaluating code, either generated by the VPL
// or typed into the text code editor
class CodeEvalService extends Service {
    // Load a program
    public loadProgram(program : string) {
        if (program.length <= 0)
            return;

        this._program = program;

        // Create a new interpreter
        this._interpreter = new Interpreter(this._program, this.interpreterInitFunc);
    }

    // Run the loaded program
    public run() {
        if (this._interpreter == null)
            return;

        // Run the interpreter
        var timeStarted = Date.now();
        this._interpreter.run();
        var timeElapsed = (Date.now() - timeStarted);
        Logger.info(`Interpreter ran user code in ${(timeElapsed / 1000).toFixed(3)} seconds. Result: ${this._interpreter.value}`);
    }

    // This function is called when initializing the interpreter to inject functionality
    // More here: https://neil.fraser.name/software/JS-Interpreter/docs.html
    private interpreterInitFunc(interpreter : Interpreter, globalObject : Object) {
        interpreter.setProperty(globalObject, "print", interpreter.createNativeFunction((str : string) => {
            Logger.info("PRINT OUTPUT: " + str);
        }));
    }

    private _program : string = "";
    private _interpreter : Interpreter | undefined = undefined;
}

export { CodeEvalService };
