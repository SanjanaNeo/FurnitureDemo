import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useRef } from 'react'
import styles from '../../screens/cart.style'
import {AntDesign} from '@expo/vector-icons'
import { COLORS } from '../../constants'

const CartTitle = ({item,onPress,select,deleteCart}) => {
    const handleDeleteCartItem = async () => {
        try {
            await deleteCart(item?._id);
            // You might want to update your cart state or fetch updated cart data here
        } catch (error) {
            console.error('Error deleting cart item:', error);
        }
    };
  return (
   <TouchableOpacity style={styles.favContainer(!select ? "#FFF" : COLORS.secondary)} onPress={onPress}>
    <View style={styles.imageContainer}>
        <Image
            source={{uri:item.cartItem.imageUrl}}
            style={styles.image}
        />
    </View>
    <View style={styles.textContainer}>
        <Text style={styles.productTxt} numberOfLines={1}>{item.cartItem.title}</Text>
        <Text style={styles.supplier} numberOfLines={1}>{item.cartItem.supplier}</Text>
        <Text style={styles.supplier} numberOfLines={1}>${item.cartItem.price} * {item.quantity}</Text>
    </View>
    <TouchableOpacity
    style={{paddingBottom:20,paddingLeft:75}}
    onPress={handleDeleteCartItem}
    >
    <AntDesign
    name='delete'
    size={18}
    color={COLORS.red}
    />
    </TouchableOpacity>
   </TouchableOpacity>
  )
}

export default CartTitle