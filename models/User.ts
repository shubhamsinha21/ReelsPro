// check again whether connection already or building for 1st time
// since everything is cached , running on edges
import bcrypt from "bcryptjs";
import mongoose, { Schema, model, models } from "mongoose";

// creating interface
export interface IUser {
  email: string;
  password: string;
  // user must have id, if saved in database then it will of an user
  // not direct string , special mongodb object
  _id?: mongoose.Types.ObjectId;
  // if saved in database, only then date
  createdAt?: Date;
  updatedAt?: Date;
}

// Creating Schema
const userSchema = new Schema<IUser>(
  {
    // decalring string schema
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
  },
  //   declaring timestamps
  {
    timestamps: true,
  }
);

// adding a pre hook , before data processes and saved
// use function and not arrow function | next for necxt value , since middleware
// first time save pwd, then we will do it
userSchema.pre("save", async function (next) {
  // if password modified -> then pre hook runs
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  //  proceed next
  next();
});

// exporting user schema | user and schema name
//  check if the model has user already running on edge
//  2nd one used when we have to create model
//  1st one when we have to use pre-created model
const User = models?.User || model<IUser>("User", userSchema);

export default User;
