import React from "react";
import { Pressable, Image, Text, View } from "react-native";
import { styles } from './styles';

const FavoriteItem = ({ title, image, price, onPress, screen }) => {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Image style={styles.image} source={{ uri: image }} />
            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.price}>{price}</Text>
            </View>
            <Image
                style={styles.icon}
                source={
                    screen === "listings"
                        ? require('../../assets/icons/trash.png')
                        : require('../../assets/icons/close.png')
                }
            />
        </Pressable>
    );
};

export default FavoriteItem;
