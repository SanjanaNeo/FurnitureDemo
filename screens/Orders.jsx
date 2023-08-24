// import { Text, View, TouchableOpacity, FlatList } from 'react-native'
// import React from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import styles from './cart.style'
// // import Ionicons from '@expo/vector-icons'
// import { Ionicons } from '@expo/vector-icons'
// import { COLORS } from '../constants'
// import OrdersTile from '../components/OrdersTile'
// import fetchOrders from '../hook/fetchOrders'

// const Orders = ({ navigation }) => {
//   // const { data, loader, error, refetch } = fetchOrders()
//   console.log("testing data ------>")
//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.titleRow}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons
//             name='chevron-back-circle'
//             size={30}
//             color={COLORS.primary}
//           />
//         </TouchableOpacity>
//         <Text style={styles.titleTxt}>Orders</Text>
//       </View>
//       {/* <FlatList
//         data={data}
//         keyExtractor={(item) => item._id}
//         renderItem={({ item }) =>
//           <OrdersTile
//             item={item}
//           />}
//       /> */}

//     </SafeAreaView>
//   )
// }

// export default Orders

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './cart.style';

const Orders = () => {
  const [orderedItems, setOrderedItems] = useState([]);

  useEffect(() => {
    fetchOrderedItems();
  }, []);

  const fetchOrderedItems = async () => {
    const savedOrderedItems = await AsyncStorage.getItem('orderedItems');
    if (savedOrderedItems) {
      const parsedOrderedItems = JSON.parse(savedOrderedItems);
      setOrderedItems(parsedOrderedItems);
    }
  };
  console.log('orderedItems in Orders:', orderedItems);
  const renderItem = ({ item }) => (
    <View style={styles.favContainer(item.backgroundColor)}>
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.productTxt}>{item.title}</Text>
      <Text style={styles.supplier}>{item.supplier}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.titleTxt}>Ordered Items</Text>
      </View>
      <FlatList
        data={orderedItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.white,
//     padding: SIZES.padding,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: SIZES.padding,
//   },
//   orderList: {
//     flexGrow: 1,
//   },
//   orderItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: SIZES.base,
//   },
//   image: {
//     width: 80,
//     height: 80,
//     borderRadius: SIZES.radius,
//   },
//   orderDetails: {
//     marginLeft: SIZES.base,
//   },
//   productTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   productPrice: {
//     fontSize: 14,
//     color: COLORS.gray,
//   },
// });

export default Orders;
