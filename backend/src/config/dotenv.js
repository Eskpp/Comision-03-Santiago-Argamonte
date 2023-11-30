import dotenv from "dotenv";

dotenv.config();

//puerto por defecto 4000
export const settingDotEnvPort = () => {
  return { port: process.env.PORT || 4000};
};

export const settingDotEnvDb = () => {
  return { DB_USERNAME: process.env.DB_USERNAME || "Profesor", DB_PASSWORD: process.env.DB_PASSWORD || "epicatramoiii", CLUSTER_URL: process.env.CLUSTER_URL };
}
