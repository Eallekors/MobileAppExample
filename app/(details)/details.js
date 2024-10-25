import React from "react";
import { View, Text, ScrollView, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles} from "./styles";
import { router, useGlobalSearchParams, useLocalSearchParams } from 'expo-router';
import Button from "../../components/Button";

const ProductDetails = () => {
    const { details } = useLocalSearchParams();
    const product = JSON.parse(details)
    console.log('Product => ' , product)
    console.log(product)

    const onBackPress = () => {
        router.back();
    }
    return (
        <SafeAreaView style={styles.save}>
            <ScrollView>
                <Image style={styles.image} source={{uri: product.image}}/>
                <View style={styles.content}>
                    <Text style={styles.title}>{product.title}</Text>
                    <Text style={styles.price}>{product.price}</Text>
                    <Text style={styles.description}>{product.description}</Text>
                </View>
                <Pressable onPress={onBackPress} style={styles.backContainer}>
                    <Image style={styles.backIcon} source={require("../../assets/icons/back.png")}/>
                </Pressable>
            </ScrollView>
            <View style={styles.footer}>
                <Pressable>
                    <Image style={styles.bookmarkContainer} source={require('../../assets/icons/bookmark.png')}/>
                </Pressable>
                <Button style={styles.button} title="Contact Seller"/>
            </View>
        </SafeAreaView>
    )
}
export default ProductDetails;