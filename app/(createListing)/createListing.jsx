import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, Image, Pressable, ActivityIndicator, ScrollView, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { styles } from "./styles";
import * as DocumentPicker from 'expo-document-picker';
import { router } from "expo-router";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { categories } from "../../data/categories";
import { uploadFile, createDocument } from "../../lib/appwriteConfig"; // Assuming createDocument is set up in your Appwrite config
import { account } from "../../lib/appwriteConfig";

const CreateListing = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({});
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const user = await account.get();
                setUserId(user.$id); 
            } catch (error) {
                console.error("Failed to fetch user:", error);
                Alert.alert("Failed to fetch user information");
            }
        };
        
        getCurrentUser();
    }, []);

    const onBackPress = () => {
        router.back();
    };

    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'image/*',
            });

            if (result.canceled) {
                console.log("User cancelled document picking");
                return;
            }

            const file = result.assets && result.assets[0];
            if (file) {
                setImages((prevImages) => [...prevImages, file]);
            } else {
                console.log("No file selected");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const submitDocs = async () => {
        setLoading(true);
        try {
            const uploadPromises = images.map((file) => uploadFile(file, 'image'));
            const imageUrls = await Promise.all(uploadPromises);
    
            console.log("Uploaded image URLs:", imageUrls);
    
            if (!imageUrls.length || !imageUrls[0]) {
                throw new Error("No images uploaded successfully.");
            }
    
            const documentData = {
                ...values,
                category: values.category.id,
                image: imageUrls[0], // Assign primary image URL for the required field
                images: imageUrls.length > 1 ? imageUrls : undefined,
                Author: userId 
            };
    
            console.log("Document data to submit:", documentData);
    
            await createDocument(documentData);
            Alert.alert("Listing created successfully!");
    
            setValues({});
            setImages([]);

            router.push('/home');
        } catch (error) {
            console.error("Error submitting listing:", error);
            Alert.alert("Failed to create listing");
        } finally {
            setLoading(false);
        }
    };
    
    
    

    const onDeleteImage = (uri) => {
        setImages((prevImages) => prevImages.filter((image) => image.uri !== uri));
    };

    const onChange = (value, key) => {
        // If the key is "price", prepend "$" to the value
        if (key === "price") {
            // Only allow numeric input
            const priceValue = value.replace(/[^0-9.]/g, ''); // Removes any non-numeric character except period
            setValues((val) => ({ ...val, [key]: priceValue ? `$ ${priceValue}` : '' }));
        } else {
            setValues((val) => ({ ...val, [key]: value }));
        }
    };

    

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
                <Header showBack={true} onBackPress={onBackPress} title="Create a new listing" />
                <ScrollView style={styles.container}>
                    <Text style={styles.sectionTitle}>Upload photos</Text>
                    <View style={styles.imageRow}>
                        <TouchableOpacity style={styles.uploadContainer} onPress={pickDocument}>
                            <View style={styles.uploadCircle}>
                                <Text style={styles.uploadPluss}> + </Text>
                            </View>
                        </TouchableOpacity>
                        {images.map((file, index) => (
                            <View key={index} style={styles.imageContainer}>
                                <Image source={{ uri: file.uri }} style={styles.image} />
                                <Pressable hitSlop={20} onPress={() => onDeleteImage(file.uri)}>
                                    <Image style={styles.delete} source={require('../../assets/icons/close.png')} />
                                </Pressable>
                            </View>
                        ))}
                        {loading ? <ActivityIndicator /> : null}
                    </View>
                    <Input label="Title" placeholder="Listing Title" value={values.title} onChangeText={(v) => onChange(v, "title")} />
                    <Input label="Category" placeholder="Select the category" value={values.category} onChangeText={(v) => onChange(v, "category")} type="picker" options={categories} />
                    <Input label="Price" placeholder="Enter price in USD" value={values.price} onChangeText={(v) => onChange(v, "price")} keyboardType="numeric" />
                    <Input style={styles.textarea} label="Description" placeholder="Tell us more..." value={values.description} onChangeText={(v) => onChange(v, "description")} multiline />
                    <Button title="Submit" onPress={submitDocs} style={{ marginBottom: 50 }} />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default CreateListing;
