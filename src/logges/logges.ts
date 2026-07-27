// logges/logges.ts
// Centralized logging module.
// Displays clear, timestamped logs in the browser console
// for every important action (fetch, create, update, delete, errors).

type LogLevel = "INFO" | "SUCCESS" | "ERROR" | "WARN";

const styles: Record<LogLevel, string> = {
    INFO: "color: #3b82f6; font-weight: bold;",     // blue
    SUCCESS: "color: #22c55e; font-weight: bold;",  // green
    ERROR: "color: #ef4444; font-weight: bold;",    // red
    WARN: "color: #eab308; font-weight: bold;",     // yellow
};

function timestamp(): string {
    const now = new Date();
    return now.toLocaleTimeString("en-GB", { hour12: false });
}

function baseLog(level: LogLevel, action: string, message: string, data?: unknown) {
    const prefix = `%c[${timestamp()}] [${level}] ${action}`;
    if (data !== undefined) {
        console.log(prefix, styles[level], message, data);
    } else {
        console.log(prefix, styles[level], message);
    }
}

export const logger = {
    info: (action: string, message: string, data?: unknown) =>
        baseLog("INFO", action, message, data),

    success: (action: string, message: string, data?: unknown) =>
        baseLog("SUCCESS", action, message, data),

    error: (action: string, message: string, data?: unknown) =>
        baseLog("ERROR", action, message, data),

    warn: (action: string, message: string, data?: unknown) =>
        baseLog("WARN", action, message, data),
};