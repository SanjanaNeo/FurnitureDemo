import { TouchableOpacity, Text, View, ActivityIndicator, FlatList } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import styles from './cart.style'
import { COLORS, SIZES } from '../constants'
import fetchCart, { deleteCartItem } from '../hook/fetchCart'
import deleteCart from '../hook/deleteCart'
import { Button, CartTitle } from '../components'

const Cart = ({ navigation }) => {
  const [data, setData] = useState([]);
  const { loader, error, refetch } = fetchCart(setData)
  const [selected, setSelected] = useState(null)


  const [select, setSelect] = useState(false)
  const handleDeleteCartItem = async (itemId) => {
    try {
      await deleteCart(itemId); // Delete item from the server
      setData(prevData => prevData.filter(item => item._id !== itemId)); // Update local state immediately
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  // Handle different loading states
  if (loader) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.titleRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name='chevron-back-circle'
              size={30}
              color={COLORS.primary}
            />
          </TouchableOpacity>
          <Text style={styles.titleTxt}>Cart</Text>
        </View>
        <ActivityIndicator />
      </SafeAreaView>
    )
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Error loading cart data.</Text>
      </SafeAreaView>
    )
  }

  // Data is fetched and not loading, render FlatList
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name='chevron-back-circle'
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>
        <Text style={styles.titleTxt}>Cart</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <CartTitle
            item={item}
            onPress={() => {
              if (selected === item) {
                setSelected(null); // Deselect if already selected
                setSelect(true)
              } else {
                setSelected(item);
                setSelect(true)
              }
            }}
            select={selected === item} // Check if the item is selected
            deleteCart={deleteCart}
          />
        )}
      />
      {select === false ? (<View></View>)
        : (
          <Button title={'Checkout'}
            isValid={select}
            // onPress={() => navigation.navigate('PaymentPage')}
            onPress={() => {
              if (select && selected) {
                navigation.navigate('PaymentPage', { orderedItem: selected })
              }
            }}
          />
        )
      }
    </SafeAreaView>
  )
}

export default Cart

