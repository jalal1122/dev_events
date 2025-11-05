import mongoose from "mongoose";

// Define the MongoDB connection string type
type MongoDBConnection = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Extend the global namespace to include our MongoDB connection cache
declare global {
  var mongooseCache: MongoDBConnection | undefined;
}

// Retrieve MongoDB connection string from environment variables
const MONGODB_URI = process.env.MONGO_DB_URL;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
const cached: MongoDBConnection = global.mongooseCache || {
  conn: null,
  promise: null,
};

// Cache the connection globally to persist across hot reloads
if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

/**
 * Establishes a connection to MongoDB using Mongoose.
 * Implements connection caching to prevent multiple connections in development.
 *
 * @returns {Promise<typeof mongoose>} The Mongoose instance
 */
async function connectDB(): Promise<typeof mongoose> {
  // Return existing connection if already established
  if (cached.conn) {
    return cached.conn;
  }

  // If no connection promise exists, create a new one
  if (!cached.promise) {
    // Validate that the MongoDB URI is provided
    if (!MONGODB_URI) {
      throw new Error(
        "Please define the MONGO_DB_URL environment variable inside .env file"
      );
    }
    const options = {
      bufferCommands: false, // Disable mongoose buffering
      maxPoolSize: 10, // Maximum number of connections in the pool
      serverSelectionTimeoutMS: 5000, // Timeout for server selection
      socketTimeoutMS: 45000, // Timeout for socket inactivity
    };

    // Create a new connection promise
    cached.promise = mongoose
      .connect(MONGODB_URI as string, options)
      .then((mongooseInstance) => {
        console.log("✅ MongoDB connected successfully");
        return mongooseInstance;
      })
      .catch((error) => {
        console.error("❌ MongoDB connection error:", error);
        // Reset the promise on error so next call will retry
        cached.promise = null;
        throw error;
      });
  }

  try {
    // Await the connection promise and cache the result
    cached.conn = await cached.promise;
  } catch (error) {
    // Reset promise on error
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectDB;
