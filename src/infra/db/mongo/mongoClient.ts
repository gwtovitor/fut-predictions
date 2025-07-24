// mongoClient.ts
import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.DB_MONGO_URL as string;
if (!uri) throw new Error("DB_MONGO_URL is not defined");
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let isConnected = false;

export async function getMongoClient(): Promise<MongoClient> {
  if (!isConnected) {
    await client.connect();
    isConnected = true;
  }
  return client;
}
