import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

// it will have NextAuth Options :data type
export const authOptions: NextAuthOptions = {
  // requires min requirements
  providers: [
    // takes multiple and hence an array
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      //   credentials will further pass on inside authorize
      async authorize(credentials) {
        // itself a method and async since we call database
        // since u have credentials, now u r responsible to validate it

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password !");
        }

        // database connect and check user is or not
        try {
          await connectToDatabase();
          // adding await becoz it is database operation
          const user = await User.findOne({ email: credentials.email });

          if (!user) {
            throw new Error("No user found");
          }

          //   if user found -> check password
          //   using bcrypt- compare method to check - it has 2 properties
          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          ); // stored password and credentials added
          //   check valid or nt

          if (!isValid) {
            throw new Error("Invalid password.");
          }

          //   if password matches -> we return objects
          return {
            // values in it, will get stored in sessions
          };
        } catch (error) {}
      },
    }),
  ],
};
