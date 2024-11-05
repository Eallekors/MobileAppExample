// FileUploadComponent.js
import React, { useState } from 'react';
import { View, Button, Text, ActivityIndicator } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { storage } from '../../lib/appwriteConfig'; // Ensure this imports your Appwrite client
import { ID } from 'react-native-appwrite';
const storageId = '6727ccec000d99260460'; // Replace with your Appwrite bucket ID

export default function FileUploadComponent() {
  const [uploading, setUploading] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  const [error, setError] = useState(null);

  const pickDocument = async () => {
    try {
        setError(null); // Reset error state before picking a document

        // Trigger the document picker and filter for images
        const result = await DocumentPicker.getDocumentAsync({
            type: 'image/*', // Only show images
        });

        // Check if the user cancelled
        if (result.canceled) {
            console.log("User cancelled document picking");
            setError("Document picking was cancelled. Please try again.");
            return;
        }

        // Extract the first asset if available
        const file = result.assets && result.assets[0];
        if (file) {
            setFileInfo(file);
            const fileUrl = await uploadFile(file, 'image'); // Use the file type you want
            console.log("File URL:", fileUrl);
        } else {
            setError("No file was selected. Please try again.");
        }
    } catch (err) {
        setError("Failed to pick a document. Please check permissions and try again.");
        console.error(err);
    }
};


  return (
    <View style={{ padding: 20 }}>
      <Button title="Pick a Document" onPress={pickDocument} />
      {uploading && <ActivityIndicator size="large" color="#0000ff" />}
      {fileInfo && (
        <Text>File Uploaded: {fileInfo.name}</Text>
      )}
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
    </View>
  );
}
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