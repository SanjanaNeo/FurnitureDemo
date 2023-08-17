import { StyleSheet } from "react-native";
import {COLORS,SIZES} from '../../constants'

const styles = StyleSheet.create({
    container:{
        width:132,
        height:180,
        borderRadius:SIZES.medium,
        backgroundColor:COLORS.secondary,
        // marginHorizontal:'5%'
        
    },
    imageContainer:{
        flex:1,
        width:120,
        marginLeft:SIZES.small/2,
        marginTop:SIZES.small/2,
        borderRadius:SIZES.small,
        overflow:"hidden",

    },
    image:{
        aspectRatio:1,
        resizeMode:'cover',
    },
    detail:{
        padding:SIZES.small
    },
    title:{
        fontFamily:'bold',
        fontSize:SIZES.medium,
        marginBottom:-8,
        marginTop:-15
    },
    supplier:{
        fontFamily:'regular',
        fontSize:SIZES.small,
        color:COLORS.gray,
    },
    price:{
        fontFamily:'bold',
        fontSize:SIZES.medium,
        marginBottom:-15
    },
    addBtn:{
        position:'absolute',
        bottom:SIZES.xSmall,
        right: SIZES.xSmall - 12,
        marginBottom:-12

    }
})

export default styles;