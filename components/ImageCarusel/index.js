import React from "react";
import { FlatList, Image } from "react-native";

import { styles } from './styles';

const ImageCarusel = ({images}) => {
    const renderImage = ({item}) => {
        return (
            <Image style={styles.image} source={{ uri: item}}/>
        )}
    return(
        <FlatList horizontal style={styles.list} data={images} renderItem={renderImage}/>

    )
}
export default ImageCarusel 