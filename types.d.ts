//  connection from mnongoose
import { Connection, connection } from "mongoose";

// declaring an object globally
declare global {
  // declaring variable
  // we say that our global object must have a connection
  // either already connection or we will create promises
  //   mongoose - same in db.ts
  var mongoose: {
    conn: Connection | null;
    // decalring promise here in js
    // either hai or nhi hai
    // decalaring type of promise using <>
    promise: Promise<Connection> | null;
  };
}

export {};

// this required since we are using ts
