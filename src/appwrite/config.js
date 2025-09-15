import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

async CreatePost({ title, slug, content, featuredImage, status, userID }) {
  try {
    return await this.databases.createDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      ID.unique(),
      { title, slug, content, featuredImage, status, userID } // 🔥 key name EXACT same hona chahiye jo schema me hai
    );
  } catch (error) {
    console.log("Appwrite services :: Create Post Error ", error);
    throw error;
  }
}




  async UpdatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        { title, content, featuredImage, status }
      );
    } catch (error) {
      console.log("Appwrite services :: Update Post Error ", error);
    }
  }

  async DeletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite services :: Delete Post Error ", error);
      return false;
    }
  }

  async GetPost(id) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        id
      );
    } catch (error) {
      console.log("Appwrite services :: Get Post Error ", error);
      return false;
    }
  }

  async GetPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite services :: Get Posts Error ", error);
    }
  }

  async UploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwritebucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite services :: Upload File Error ", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwritebucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite services :: Delete File Error ", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    try {
      return this.bucket.getFileView(conf.appwritebucketId, fileId);
    } catch (error) {
      console.log("Appwrite services :: Get File Preview Error ", error);
      return false;
    }
  }
}

const service = new Service();
export default service;
