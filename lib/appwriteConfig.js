// appwriteConfig.js
import { Client, Account,Storage , ID } from 'react-native-appwrite';


const storageId = '6727ccec000d99260460'; // Replace with your Appwrite bucket ID

const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite Endpoint
  .setProject('6727b0c60002c15f1e35') // Your project ID
  .setPlatform("com.Voco.IKEA")

  const account = new Account(client);
  const storage = new Storage(client);

  

  export { client, account, storage };
  
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
      
    
      const fileUrl = uploadedFile.$id;

      return fileUrl;
    } catch (error) {
      throw new Error(error)
    }
  }