import {Text, View, TouchableOpacity,TextInput } from 'react-native'
import React from 'react'
import styles from './search.style'
import {Feather, Ionicons} from '@expo/vector-icons'
import { COLORS,SIZES } from '../constants'
import { SafeAreaView } from 'react-native-safe-area-context'

const Search = () => {
  return (
    <SafeAreaView>
    <View style={styles.searchContainer}>
        <TouchableOpacity>
            <Feather name="search" 
            size={24} 
            style={styles.searchIcon}/>
        </TouchableOpacity>
        <View style={styles.searchWrapper}>
        <TextInput
        style={styles.searchInput}
        value=""
        onPressIn={()=>{}}
        placeholder="What are you looking for"
        />
        </View>
        <View>
          <TouchableOpacity style={styles.searchBtn}>
            <Ionicons name="camera-outline" 
            size={SIZES.xLarge} 
            color={COLORS.offwhite}/>
          </TouchableOpacity>
        </View>
    </View>
    </SafeAreaView>
  )
}

export default Search