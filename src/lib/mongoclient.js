// Import MongoClient and ServerApiVersion from the MongoDB package
import { MongoClient, ServerApiVersion } from 'mongodb';

if (!process.env.DATABASE_URL) {
  throw new Error('Invalid/Missing environment variable: "DATABASE_URL"');
}

const uri = process.env.DATABASE_URL;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to preserve the MongoClient instance
  if (!global._mongoClient) {
    global._mongoClient = new MongoClient(uri, options);
  }
  client = global._mongoClient;
} else {
  // In production mode, create a new MongoClient instance
  client = new MongoClient(uri, options);
}

// Export the client instance for use in other parts of the application
export default client;
