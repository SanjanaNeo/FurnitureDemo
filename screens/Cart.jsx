import { TouchableOpacity, Text, View, ActivityIndicator, FlatList } from 'react-native'
import React,{useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import styles from './cart.style'
import { COLORS, SIZES } from '../constants'
import fetchCart from '../hook/fetchCart'
import { cartTile } from '../components'

const Cart = ({ navigation }) => {
  const [data, setData] = useState([]);
  const { loader, error, refetch } = fetchCart(setData)
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
        renderItem={({ item }) => <Text>{item.cartItem.title}</Text>}
      />
    </SafeAreaView>
  )
}

export default Cart

