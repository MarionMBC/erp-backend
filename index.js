import  app  from "./src/config/server.js";
import dotenv from 'dotenv'

dotenv.config();

app.listen(process.env.PORT || 8080, () => {
    console.log('Servidor iniciado', process.env.PORT || 8080);
})

