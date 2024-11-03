// appwriteConfig.js
import { Client, Account } from 'react-native-appwrite';

const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite Endpoint
  .setProject('6727b0c60002c15f1e35'); // Your project ID

  const account = new Account(client);

  export { client, account };
