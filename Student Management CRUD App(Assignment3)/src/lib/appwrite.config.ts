import { Account, Client, TablesDB, Storage } from "appwrite";

const client = new Client();
client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT as string)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID as string);

export const account = new Account(client);
export const tablesDB = new TablesDB(client);
export const bucket = new Storage(client);

export { client };
