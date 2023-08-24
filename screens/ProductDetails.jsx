import { Text, View, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import styles from './productDetails.style'
import { useRoute } from '@react-navigation/native'
import { Ionicons, SimpleLineIcons, MaterialCommunityIcons, Fontisto } from '@expo/vector-icons'
import { COLORS, SIZES } from '../constants'
import AddToCart from '../hook/AddToCart'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaView } from 'react-native-safe-area-context'
import WebView from 'react-native-webview'

const ProductDetails = ({ navigation }) => {
  const route = useRoute()
  const { item } = route.params
  const [count, setCount] = useState(1)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [favorites, setFavorites] = useState(false)
  const [paymentUrl, setpaymentUrl] = useState(false)



  const increment = () => {
    setCount(count + 1)
  }

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1)
    }
  }

  useEffect(() => {
    checkUser()
    checkFavorites()
  }, [])

  const checkUser = async () => {
    try {
      const id = await AsyncStorage.getItem('id')
      if (id !== null) {
        setIsLoggedIn(true)
        console.log(isLoggedIn)
      }
      else {
        console.log("User not logged in");
      }
    } catch (error) {

    }
  }

  // const createCheckOut = async() =>{
  //   const id =await AsyncStorage.getItem('id');
  //   const response = await fetch("https://stripeserver-production-0bac.up.railway.app/stripe/create-checkout-session",{
  //     method:'POST',
  //     headers:{
  //       'Content-type':'application/json'
  //     },
  //     body:JSON.stringify({
  //       userId:JSON.parse(id),
  //       cartItems:[
  //         {
  //           name:item.title,
  //           id:item._id,
  //           price:item.price,
  //           cartQuantity:count
  //         }
  //       ]
  //     })
  //   })
  //   const {url} = await response.json()
  //   setpaymentUrl(url)
  // }

  const handlePress = () => {
    if (isLoggedIn === false) {
      navigation.navigate('Login')
    }
    else {
      addToFavorites()
    }
  }

  const handleBuy = () => {
    if (isLoggedIn === false) {
      navigation.navigate('Login')
    }
    else {
    //  createCheckOut()
    navigation.navigate('PaymentPage', { orderedItem: item, orderedItems: [] });
    }
  }

  // const onNavigationStateChange = (webViewState) =>{
  //   const {url} =webViewState
  //   if(url && url.include('checkout-success')){
  //     navigation.navigate("Orders")
  //   }else if(url && url.include('cancel')){
  //     navigation.goBack()
  //   }
  // }

  //Above is the original code
  // Inside your ProductDetails component's onNavigationStateChange function
// const onNavigationStateChange = (webViewState) => {
//   const { url } = webViewState;
//   if (url && url.includes('checkout-success')) {
//     const orderedItem = {
//       id: item._id,
//       title: item.title,
//       price: item.price,
//       imageUrl: item.imageUrl,
//     };
//     navigation.navigate('Orders', { orderedItems: [orderedItem] });
//   } else if (url && url.includes('cancel')) {
//     navigation.goBack();
//   }
// };


  const handleCart = () => {
    if (isLoggedIn === false) {
      navigation.navigate('Login')
    }
    else {
      // console.log("hello");
      AddToCart(item._id, count)
    }
  }

  const addToFavorites = async () => {
    const id = await AsyncStorage.getItem('id')
    const favoritesId = `favorites${JSON.parse(id)}`
    let productId = item._id
    let productObj = {
      title: item.title,
      id: item._id,
      supplier: item.supplier,
      price: item.price,
      imageUrl: item.imageUrl,
      product_location: item.product_location
    }
    try {
      const existingItem = await AsyncStorage.getItem(favoritesId)
      let favoritesObj = existingItem ? JSON.parse(existingItem) : {}

      if (favoritesObj[productId]) {
        delete favoritesObj[productId]
        console.log("deleted")
        setFavorites(false)
      } else {
        favoritesObj[productId] = productObj;
        console.log("added to fav")
        setFavorites(true)
      }
      await AsyncStorage.setItem(favoritesId, JSON.stringify(favoritesObj))
    } catch (error) {
      console.log(error)
    }

  }

  const checkFavorites = async () => {
    const id = await AsyncStorage.getItem('id')
    const favoritesId = `favorites${JSON.parse(id)}`
    console.log(favoritesId)
    try {
      const favoritesObj = await AsyncStorage.getItem(favoritesId)
      if (favoritesObj !== null) {
        const favorites = JSON.parse(favoritesObj)
        if (favorites[item._id]) {
          console.log(item._id)
          setFavorites(true)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
     {paymentUrl ? (
      <SafeAreaView>
        <WebView
          source={{uri:paymentUrl}}
          onNavigationStateChange={onNavigationStateChange}
        />
      </SafeAreaView>
     ):(
      <View style={styles.container}>
         <View style={styles.upperRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name='chevron-back-circle' size={30} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handlePress()}>
          <Ionicons name={favorites ? 'heart' : 'heart-outline'} size={30} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.image}
      />
      <View style={styles.details}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>{item.price}</Text>
          </View>
        </View>
        <View style={styles.ratingRow}>
          <View style={styles.rating}>
            {[1, 2, 3, 4, 5].map((index) => (
              <Ionicons
                key={index}
                name='star'
                size={24}
                color="gold"
              />
            ))}
            <Text style={styles.ratingText}>(4.9)</Text>
          </View>
          <View style={styles.rating}>
            <TouchableOpacity onPress={() => increment()}>
              <SimpleLineIcons
                name='plus'
                size={20}
              />
            </TouchableOpacity>
            <Text style={styles.ratingText}>{count}</Text>
            <TouchableOpacity onPress={() => decrement()}>
              <SimpleLineIcons
                name='minus'
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.descriptionWrapper}>
          <Text style={styles.description}>Description</Text>
          <Text style={styles.descText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec. Mauris a diam maecenas sed enim ut sem viverra. Nibh sit amet commodo nulla facilisi nullam vehicula ipsum a. Et egestas quis ipsum suspendisse ultrices gravida dictum. Nunc non blandit massa enim nec dui nunc mattis. Montes nascetur ridiculus mus mauris vitae ultricies. Sem fringilla ut morbi tincidunt.
          </Text>
        </View>
        <View style={{ marginBottom: SIZES.small - 10 }}>
          <View style={styles.location}>
            <View style={{ flexDirection: 'row' }}>
              <Ionicons name='location-outline' size={20} />
              <Text>Dallas</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <MaterialCommunityIcons name='truck-delivery-outline' size={20} />
              <Text>Free Delivery</Text>
            </View>
          </View>
        </View>
        <View style={styles.cartRow}>
          <TouchableOpacity onPress={() => handleBuy()} style={styles.cartBtn}>
            <Text style={styles.cartTitle}>BUY NOW</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleCart()}
            style={styles.addCart}>
            <Fontisto name="shopping-bag" size={24} color={COLORS.lightWhite} />
          </TouchableOpacity>
        </View>
      </View>
      </View>
     )}
    </View>
  )
}

export default ProductDetails