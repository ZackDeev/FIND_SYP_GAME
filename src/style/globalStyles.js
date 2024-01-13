import { StyleSheet } from "react-native";
import { HEIGHT, WIDTH, orange_color } from "../constants/Constant";

export const globalStyles = StyleSheet.create({
    container:{
        width: WIDTH,
        height: HEIGHT,
        justifyContent:'center',
        alignItems:'center'
    },
    backgroundImageStyle:{
        width: WIDTH,
        height: HEIGHT,
        position:'absolute',
        zIndex:0,
        top:0,
        left:0
    },
    titleButton:{
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    title: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold'
    },
    subTitle: {
        fontSize: 14,
        color: '#FFF',
        fontWeight: 'bold'
    },
    buttonStart:{
        width: WIDTH / 1.4,
        height:60,
        backgroundColor: orange_color,
        color: '#fff',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'center',
    },
    errorTextStyle: {
        color: orange_color
    }

});