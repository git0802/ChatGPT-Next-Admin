import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local",
  );
}

let cached = global.mongoose || { conn: null, promise: null };

if (!cached.promise) {
  const opts = {
    bufferCommands: false,
  };

  cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
    return mongoose;
  });
}

async function dbConnect() {
  if (!cached.conn) {
    await cached.promise;
    cached.conn = true;
  }
  return mongoose;
}

export default dbConnect;
