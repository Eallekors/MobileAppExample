// appwriteConfig.js
import { Client, Account,Storage, Databases , ID } from 'react-native-appwrite';


const storageId = '6727ccec000d99260460'; // Replace with your Appwrite bucket ID

const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite Endpoint
  .setProject('6727b0c60002c15f1e35') // Your project ID
 

  const account = new Account(client);
  const storage = new Storage(client);
  const databases = new Databases(client);
  

  export { client, account, storage, databases };
  
  export const uploadFile = async (file, type) => {
    if(!file) return;

    const { mimeType, ...rest } = file;
    const asset = { type: mimeType, ...rest };
    try {
      const uploadedFile = await storage.createFile(
        storageId,
        ID.unique(),
        asset
      )
      
    
      //const fileUrl = uploadedFile.$id;
      const fileUrl = storage.getFileView(storageId, uploadedFile.$id);
      return fileUrl;
    } catch (error) {
      throw new Error(error)
    }
  }

  export const createDocument = async (data) => {
    try {
        // Use the default database ID or specify a custom database ID if you have one
        const DATABASE_ID = '6727c79b002607718e69';
        const COLLECTION_ID = '6727c7ad0003a6a6d696'
        const response = await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), data);
        console.log('Document created:', response);
        return response;
    } catch (error) {
        console.error('Error creating document:', error);
        throw error;
    }
};