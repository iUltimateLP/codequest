/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

// Basic logging system with category and verbosity support
enum LogVerbosity {
    Log,
    Warning,
    Error
};

enum LogCategory {
    Core,
    Service
}

class Logger {
    // Internal logging function that logs out with a given category, verbosity, and message
    // Uses the correct console.xxx function based on the verbosity 
    private static logInternal(msg : string, verbosity = LogVerbosity.Log) {
        //const categoryName = "abc";
        const verbosityName = LogVerbosity[verbosity];
        
        // Figure out what function and color to use for logging
        var loggingFunc = null;
        var logColor;
        switch(verbosity) {
            case LogVerbosity.Log:
                loggingFunc = console.log;
                logColor = "#777";
                break;
            case LogVerbosity.Warning:
                loggingFunc = console.log;
                logColor = "#ffff00";
                break;
            case LogVerbosity.Error:
                loggingFunc = console.error;
                logColor = "#ff0000";
                break;
        }

        // Format the log string
        const date = new Date();
        var logString = `%c[${date.toLocaleDateString()} ${date.toLocaleTimeString()}][${verbosityName}] ${msg}`;
        var logCss = `color: ${logColor}`;

        // Log
        loggingFunc(logString, logCss);
    }

    public static info(msg : string) {
        this.logInternal(msg, LogVerbosity.Log);
    } 

    public static warn(msg : string) {
        this.logInternal(msg, LogVerbosity.Warning);
    }

    public static error(msg : string) {
        this.logInternal(msg, LogVerbosity.Error);
    }
}

export { LogVerbosity, LogCategory, Logger };
