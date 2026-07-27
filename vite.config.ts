import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function terminalLoggerPlugin() {
  return {
    name: "terminal-logger",
    configureServer(server: any) {
      server.middlewares.use("/__log", (req: any, res: any) => {
        if (req.method === "POST") {
          let body = "";
          req.on("data", (chunk: any) => (body += chunk));
          req.on("end", () => {
            try {
              const log = JSON.parse(body);
              const time = new Date().toLocaleTimeString("fr-FR", { hour12: false });
              console.log(`[${time}] [${log.level}] ${log.action} - ${log.message}`, log.data ?? "");
            } catch {
              console.log("Log reçu:", body);
            }
            res.statusCode = 200;
            res.end("ok");
          });
        } else {
          res.statusCode = 405;
          res.end();
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    terminalLoggerPlugin(),
  ],
})