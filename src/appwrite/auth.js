// src/appwrite/auth.js
import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)   // e.g. 'https://cloud.appwrite.io/v1'
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const user = await this.account.create(ID.unique(), email, password, name);
      if (user) {
        // automatically login after signup (delegates to login method below)
        return this.login({ email, password });
      }
      return user;
    } catch (err) {
      throw err;
    }
  }

  async login({ email, password }) {
    try {
      // Prefer the newer name (createEmailPasswordSession)
      if (typeof this.account.createEmailPasswordSession === "function") {
        // Try object-style first, then positional, to cover different SDK examples
        try {
          return await this.account.createEmailPasswordSession({ email, password });
        } catch (e) {
          return await this.account.createEmailPasswordSession(email, password);
        }
      }

      // Fallback to older name
      if (typeof this.account.createEmailSession === "function") {
        try {
          return await this.account.createEmailSession({ email, password });
        } catch (e) {
          return await this.account.createEmailSession(email, password);
        }
      }

      throw new Error(
        "No email-session method found on Appwrite Account. Check your Appwrite SDK version."
      );
    } catch (err) {
      throw err;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (err) {
      return null; // not logged in
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (err) {
      throw err;
    }
  }
}

const authService = new AuthService();
export default authService;
