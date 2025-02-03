// importing mongoose
import mongoose from "mongoose";

// connection string
// ! -> to check for guarantee that the variable exist there
const MONGODB_URI = process.env.MONGODB_URL!;

// check if the uri is not present, throw an error
if (!MONGODB_URI) {
  throw new Error("Please define mongodb uri in env file");
}

// to check for monogodb connection
// inside from next js environment
// connection , by mongooose
// randomVar accessing global (access by default in environment)
// red line says not exists and hence have to create file
let catchedConnection = global.mongoose;

// check if no cached connection
if (!catchedConnection) {
  //  declaring and adding null value
  catchedConnection = global.mongoose = { conn: null, promise: null };
}

// result -> if called, connection is found or it will get created

// how to establish connection with database
export async function connectToDatabase() {
  // check connection -> and it already present
  if (catchedConnection.conn) {
    return catchedConnection.conn;
  }

  // no connection established but asked for | promise
  if (!catchedConnection.promise) {
    // if not we have to do so
    const opts = {
      bufferCommands: true, // use ?
      maxPoolSize: 10, // defines no of connection can be established with mongodb in one time
    };
    catchedConnection.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then(() => mongoose.connection);
  }

  // if promise is already there then wait for connection to send
  try {
    // add connection after waiting for promise
    catchedConnection.conn = await catchedConnection.promise;
  } catch (error) {
    // if error occurs
    //  remove promise first
    catchedConnection.promise = null;
    throw new Error("Check database file");
    throw error;
  }

  // in the end, returning the result
  return catchedConnection.conn;
}
