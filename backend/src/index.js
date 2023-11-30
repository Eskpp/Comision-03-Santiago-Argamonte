import { app } from "./app.js";
import { settingDotEnvPort } from "./config/dotenv.js";

const {port} = settingDotEnvPort();

app.listen(port, console.log(`servidor en puerto ${port}`));
