import { envs } from "./src/config/envs.js";
import { app } from "./src/server.js";


const PORT = envs.PORT;

app.listen(PORT, () => console.log('listening on port 🚀', `http://localhost:${PORT}`));