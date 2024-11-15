import React, { useCallback, useState, useEffect } from "react";
import { View, Text, ScrollView, Image, Pressable, Alert, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { router, useLocalSearchParams } from 'expo-router';
import Button from "@components/Button";
import ImageCarusel from "@components/ImageCarusel";
import { databases, account } from "@lib/appwriteConfig";

const ProductDetails = () => {
    const { details } = useLocalSearchParams();
    const product = JSON.parse(details);

    const [userId, setUserId] = useState(null);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [productState, setProductState] = useState(product);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const user = await account.get();
                const userId = user.$id;
                setUserId(userId);
                setIsBookmarked(productState.Bookmarked.includes(userId));
            } catch (error) {
                console.error("Failed to fetch user ID:", error);
            }
        };
    
        fetchUserId();
    }, [productState.Bookmarked]);  

    const onBackPress = () => {
        router.back();
    };

    const onContact = () => {
        const phone = 'real phone number';
        Linking.openURL(`tel:${phone}`);
        
        const email = 'real email';
        Linking.openURL(`mailto:${email}`);
    };
    
    const onBookmarkPress = useCallback(async () => {
        if (!userId) return;
    
        try {
            const updatedBookmarked = isBookmarked
                ? productState.Bookmarked.filter(id => id !== userId)
                : [...productState.Bookmarked, userId];
            
            setIsBookmarked(!isBookmarked);
    
            await databases.updateDocument(
                productState.$databaseId,
                productState.$collectionId,
                productState.$id,
                { Bookmarked: updatedBookmarked }
            );
    
            setProductState({
                ...productState,
                Bookmarked: updatedBookmarked,
            });
    
           
        } catch (error) {
            console.error("Failed to update bookmark status:", error);
            setIsBookmarked(isBookmarked); 
            Alert.alert("Error", "Could not update the bookmark status. Please try again later.");
        }
    }, [productState, isBookmarked, userId]);
    

    return (
        <SafeAreaView style={styles.save}>
            <ScrollView>
                {product?.images?.length ? (
                    <ImageCarusel images={product.images} />
                ) : (
                    <Image style={styles.image} source={{ uri: product.image }} />
                )}
                
                <View style={styles.content}>
                    <Text style={styles.title}>{product.title}</Text>
                    <Text style={styles.price}>{product.price}</Text>
                    <Text style={styles.description}>{product.description}</Text>
                </View>
                <Pressable onPress={onBackPress} style={styles.backContainer}>
                    <Image style={styles.backIcon} source={require("@assets/icons/back.png")} />
                </Pressable>
            </ScrollView>
            <View style={styles.footer}>
                <Pressable onPress={onBookmarkPress}>
                    <Image
                        style={styles.bookmarkContainer}
                        source={isBookmarked
                            ? require('@assets/icons/bookmark_filled.png')
                            : require('@assets/icons/bookmark.png')
                        }
                    />
                </Pressable>
                <Button onPress={onContact} style={styles.button} title="Contact Seller" />
            </View>
        </SafeAreaView>
    );
};

export default ProductDetails;
