import React, { useState } from "react";
import { Pressable, Image, Text, View } from "react-native";
import { styles } from "./styles"
import Input from "../Input";

const Header = ({title, onBackPress, onLogout, showBack, showSearch, showLogout, onSearchKeyword, keyword}) => {
    const [showSearchInput, setShowSearchInput] = useState(false)
    
    const onSearch = () => {
        setShowSearchInput(search => !search)
    }
    return (
        <View>
            <View style={styles.container}>
                { showBack ? (
                    <Pressable hitSlop={20} onPress={onBackPress}>
                        <Image style={styles.icon} source={require('@assets/icons/back.png')}/>
                    </Pressable>
                    ) : showSearch ? (
                        <Pressable hitSlop={20} onPress={onSearch}>
                            <Image style={styles.icon} source={require('@assets/icons/search.png')} />
                        </Pressable>
                    ) : <View style={styles.space}/>
                    }
            <Text style={styles.title}>{title}</Text>
                {
                showLogout ? (
                    <Pressable hitSlop={20} onPress={onLogout}>
                        <Image style={styles.icon} source={require('@assets/icons/logout.png')} />
                    </Pressable>
                ) : <View style={styles.space}/>
                }
            </View>
            {
                showSearchInput ? (
                    <Input onChangeText={onSearchKeyword} value={keyword} placeholder="Type your keyword"/>
                ) : null
            }
        </View>
    )
}

export default Header;