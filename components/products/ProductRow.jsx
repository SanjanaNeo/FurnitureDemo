// ProductRow.jsx
import { ActivityIndicator, FlatList, Platform, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../constants'
import ProductCardView from './ProductCardView'
import useFetch from '../../hook/useFetch'

const ProductRow = () => {
const{data,isLoading,error}=useFetch(Platform.OS)
console.log("datadsd",data);
const products=[1,2,3,4]

  return (
    <View style={{marginTop:SIZES.medium,marginLeft:12}}>
       {isLoading?(
        <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary}/>
       ):error?(
        <Text>Something went wrong!</Text>
       ):(
        <FlatList
        data={data}
        keyExtractor={(item)=>item._id}
        renderItem={({item}) => <ProductCardView item={item}/>}
        horizontal
        contentContainerStyle={{columnGap:SIZES.medium}}
        />
       )}
    </View>
    
  )
}

export default ProductRow
