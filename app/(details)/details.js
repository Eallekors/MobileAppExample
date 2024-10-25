import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles} from "./styles";
import { useGlobalSearchParams, useLocalSearchParams } from 'expo-router';

const ProductDetails = () => {
    const { details } = useLocalSearchParams();
    const product = JSON.parse(details)
    console.log('Product => ' , product)
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text>{product.title}</Text>
            </View>
        </SafeAreaView>
    )
}
export default ProductDetails;