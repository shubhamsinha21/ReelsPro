import { DefaultSession } from "next-auth";

// globally declaring module
declare module "next-auth" {
  // define interface
  interface Session {
    // we need
    user: {
      id: String;
    } & DefaultSession["user"];
  }
}
