import mongoose from "mongoose";
import { settingDotEnvDb } from "../config/dotenv.js"

const { DB_USERNAME, DB_PASSWORD, CLUSTER_URL } = settingDotEnvDb();

const url = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${CLUSTER_URL}/?retryWrites=true&w=majority`;

export const conexionMongoDb = async () => {
    try {
        await mongoose.connect(url);
        
        console.log("Conexion establecida correctamente.");
    } catch (error) {
        console.error("Error al conectarse en la base de datos:", error);
    }
}