import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../utils/colors";
const {height} = Dimensions.get('window');

export const styles = StyleSheet.create({
    image: {
       width: '100%',
       height: height * 0.45
    },
    content: {
        backgroundColor: 'white',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        marginTop: -40,
        paddingHorizontal: 24
    },
    title: {
        marginTop: 40,
        fontSize: 24,
        fontWeight: '500'
    },
    price: {
        fontSize: 30,
        fontWeight: 'bold',
        marginVertical: 8
    },
    description: {
        color: colors.textGray,
        fontWeight: '300',
        marginVertical: 8
    },
    footer:{
        padding: 24,
        flexDirection: 'row',
        alignItems: 'center',
        //marginRight: 75
        
    },
    save: {
        backgroundColor: colors.white,
        flex: 1
    },
    bookmarkContainer: {
        backgroundColor: colors.lightGray,
        padding: 18,
        borderRadius: 8,
        marginRight: 16,
        width: 65,
        height: 65
    },
    bookmarkIcon: {
        width: 34,
        height: 34
    },
    button:{
        flex: 1
    }
    
})