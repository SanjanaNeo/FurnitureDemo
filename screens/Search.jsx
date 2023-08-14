import {Text, View, TouchableOpacity,TextInput, Image } from 'react-native'
import React, {useState} from 'react'
import styles from './search.style'
import {Feather, Ionicons} from '@expo/vector-icons'
import { COLORS,SIZES } from '../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'
import { FlatList } from 'react-native-gesture-handler'
import SearchTile from '../components/products/SearchTile'

const Search = () => {
  const [searchKey,setSearchKey] = useState('');
  const [searchResults,setSearchResults] = useState('');

  //http://localhost:3005/api/products/search/${searchKey}

  const handleSearch = async() =>{
    try {
      const response = await axios.get(`http://10.0.2.2:3005/api/products/search/${searchKey}`)
      console.log("----------",response.data);
      setSearchResults(response.data)
    } catch (error) {
      console.log("Failed to get products",error);
    }
  }

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
        value={searchKey}
        onChangeText={setSearchKey}
        placeholder="What are you looking for"
        />
        </View>
        <View>
          <TouchableOpacity style={styles.searchBtn} onPress={()=>handleSearch()}>
            <Ionicons name="camera-outline" 
            size={SIZES.xLarge} 
            color={COLORS.offwhite}/>
          </TouchableOpacity>
        </View>
    </View>
    {searchResults.length === 0 ? (
      <View>
        <Image
        source={require('../assets/images/Pose23.png')}
        style={styles.searchImage}
        />
      </View>
    ):
    (
      <FlatList
        data={searchResults}
        keyExtractor={(item)=>item._id}
        renderItem={({item})=>(<SearchTile item={item}/>
        )}
        style={{marginHorizontal:12}}
      />
    )}
    </SafeAreaView>
  )
}

export default Search