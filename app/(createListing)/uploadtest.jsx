import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, Image, Pressable, ActivityIndicator, ScrollView, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { styles } from "./styles";
import * as DocumentPicker from 'expo-document-picker';
import { router } from "expo-router";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { categories } from "../../data/categories";
import { uploadFile } from "../../lib/appwriteConfig";

const CreateListing = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({});

    console.log('values =>', images);

    const onBackPress = () => {
        router.back();
    };

    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'image/*', // Only show images
            });

            if (result.canceled) {
                console.log("User cancelled document picking");
                return;
            }

            const file = result.assets && result.assets[0];
            if (file) {
                setImages((prevImages) => [...prevImages, file]); // Store the entire file object in the array
                console.log("Selected file:", file);
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
            const uploadResults = await Promise.all(uploadPromises);
            console.log("Uploaded files:", uploadResults);
            Alert.alert("Documents submitted successfully!");
        } catch (error) {
            console.error("Error uploading files:", error);
            Alert.alert("Failed to submit documents");
        } finally {
            setLoading(false);
        }
    };

    const onDeleteImage = (uri) => {
        setImages((prevImages) => prevImages.filter((image) => image.uri !== uri));
    };

    const onChange = (value, key) => {
        setValues((val) => ({ ...val, [key]: value }));
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
