import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, Image, Pressable, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { styles } from "./styles";
import * as ImagePicker from 'expo-image-picker';
import { router } from "expo-router";
import Input from "../../components/Input";
import Button from "../../components/Button"
import { categories } from "../../data/categories";

const CreateListing = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({});

    console.log('values =>', images)

    const onBackPress = () => {
        router.back();
    }

    const uploadNewImage = async () => {
       setLoading(true)
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            Alert.alert("Permission to access the media library is required!");
            return;
        }
    
       
        const result = await ImagePicker.launchImageLibraryAsync();
        console.log(result); 
        if (result.cancelled) {
            return; 
        }
    
      
        if (result.assets && result.assets.length > 0) {
            const selectedImage = result.assets[0]; 
            setImages((prevImages) => [...prevImages, selectedImage.uri]); 
            console.log(selectedImage.uri);
            setLoading(false)
        } else {
            console.log("No image selected");
        }
    }
    
    const onDeleteImage = (uri) => {
        // Filter out the image that matches the URI to be deleted
        setImages((prevImages) => prevImages.filter((imageUri) => imageUri !== uri));
    }

    const onChange = (value, key) => {
        setValues((val) => ({...val, [key]: value}))
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <Header showBack={true} onBackPress={onBackPress} title="Create a new listing" />
            <ScrollView style={styles.container}>
                <Text style={styles.sectionTitle}>Upload photos</Text>
                <View style={styles.imageRow}>
                    <TouchableOpacity style={styles.uploadContainer} onPress={uploadNewImage}>
                        <View style={styles.uploadCircle}>
                            <Text style={styles.uploadPluss}> + </Text>
                        </View>
                    </TouchableOpacity>
                    {images.map((uri, index) => (
                        <View key={index} style={styles.imageContainer}>
                            <Image source={{ uri }} style={styles.image} />
                            <Pressable hitSlop={20} onPress={() => onDeleteImage(uri)}>
                                <Image style={styles.delete} source={require('../../assets/icons/close.png')} />
                            </Pressable>
                        </View>
                    ))}
                    {loading ? <ActivityIndicator /> : null}
                </View>
                <Input label="Title" placeholder="Listing Title" value={values.title} onChangeText={(v) => onChange(v, "title")} />
                <Input label="Category" placeholder="Select the category" value={values.category} onChangeText={(v) => onChange(v, "category")} type="picker" options={categories}/>
                <Input label="Price" placeholder="Enter price in USD" value={values.price} onChangeText={(v) => onChange(v, "price")} keyboardType="numeric" />
                <Input style={styles.textarea} label="Description" placeholder="Tell us more..." value={values.description} onChangeText={(v) => onChange(v, "description")} multiline />
                <Button title="Submit" style={{marginBottom: 50}} />
            </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
    );
}

export default CreateListing;
