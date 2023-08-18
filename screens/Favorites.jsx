import { FlatList, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles from './favorites.style'
import {Ionicons,SimpleLineIcons} from '@expo/vector-icons'
import { COLORS } from '../constants'

const Favorites = ({navigation}) => {
  const [favData,setFavData] = useState([])

  useEffect(()=>{
    checkFavorites()
  },[])

  const deleteFavorites = async (product) => {
    const id = await AsyncStorage.getItem('id')
    const favoritesId = `favorites${JSON.parse(id)}`
    let productId = product
    try {
      const existingItem = await AsyncStorage.getItem(favoritesId)
      let favoritesObj = existingItem ? JSON.parse(existingItem) : {}

      if (favoritesObj[productId]) {
        delete favoritesObj[productId];
        checkFavorites()
      } 
      await AsyncStorage.setItem(favoritesId, JSON.stringify(favoritesObj))
    } catch (error) {
      console.log(error)
    }

  }

  const checkFavorites = async () => {
    const id = await AsyncStorage.getItem('id')
    const favoritesId = `favorites${JSON.parse(id)}`
    try {
      const favoritesObj = await AsyncStorage.getItem(favoritesId)
      if (favoritesObj !== null) {
        const favorites = JSON.parse(favoritesObj)
        const favList = Object.values(favorites)
        setFavData(favList)
        console.log(favList.length);
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
   <SafeAreaView style={styles.container}>
    <View style={styles.titleRow}>
      <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Ionicons
        name='chevron-back-circle'
        size={30}
        color={COLORS.primary}
        />
      </TouchableOpacity>
      <Text style={styles.titleTxt}>Favorites</Text>
    </View>

    
    <FlatList
    
    data={favData}
    renderItem={({item})=>(
      <View style={styles.favContainer}>
        <View style={styles.imageContainer}>
          <Image
          source={{uri:item.imageUrl}}
          style={styles.image}
          />
        </View>
      <View style={styles.textContainer}>
        <Text style={styles.fav}>{item.title}</Text>
        <Text style={styles.supplier}>{item.supplier}</Text>
        <Text style={styles.supplier}>${item.price}</Text>
      </View>
      <TouchableOpacity onPress={()=>deleteFavorites(item.id)}>
        <SimpleLineIcons
        name='trash'
        size={24}
        color={COLORS.red}
        />
      </TouchableOpacity>
      </View>
    )}
    keyExtractor={(item,index)=>index.toString()}
    />

   </SafeAreaView>
  )
}

export default Favorites
