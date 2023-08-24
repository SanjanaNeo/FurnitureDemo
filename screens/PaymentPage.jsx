import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, SIZES } from '../constants';

const PaymentPage = ({ navigation, route }) => {
  const { orderedItem } = route.params;
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCVC] = useState('');

  const handlePayment = async () => {
    if (!validateCardNumber(cardNumber) || !validateExpiry(expiry) || !validateCVC(cvc)) {
      Alert.alert('Error', 'Please enter valid payment details.');
      return;
    }

    // Simulate payment processing
    Alert.alert('Payment processed!');

    // Save ordered item to AsyncStorage
    const savedOrderedItems = await AsyncStorage.getItem('orderedItems');
    const orderedItems = savedOrderedItems ? JSON.parse(savedOrderedItems) : [];
    orderedItems.push(orderedItem);
    await AsyncStorage.setItem('orderedItems', JSON.stringify(orderedItems));

    // navigation.navigate('Orders');
    navigation.navigate('Orders', { orderedItems: [orderedItem] });
  };

  const validateCardNumber = (number) => {
    const cardNumberRegex = /^[0-9]{16}$/; // 16 digits
    return cardNumberRegex.test(number);
  };

  const validateExpiry = (expiryDate) => {
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/; // MM/YY format
    return expiryRegex.test(expiryDate);
  };

  const validateCVC = (cvcCode) => {
    const cvcRegex = /^[0-9]{3}$/; // 3 digits
    return cvcRegex.test(cvcCode);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Details</Text>
      <View style={styles.cardInput}>
        <Text style={styles.inputLabel}>Card Number</Text>
        <TextInput
          style={styles.inputField}
          placeholder="**** **** **** ****"
          value={cardNumber}
          onChangeText={setCardNumber}
        />
      </View>
      <View style={styles.row}>
        <View style={[styles.cardInput, styles.expiryInput]}>
          <Text style={styles.inputLabel}>Expiry</Text>
          <TextInput
            style={styles.inputField}
            placeholder="MM/YY"
            value={expiry}
            onChangeText={setExpiry}
            keyboardType="number-pad"
            maxLength={5}
          />
        </View>
        <View style={[styles.cardInput, styles.cvcInput]}>
          <Text style={styles.inputLabel}>CVC</Text>
          <TextInput
            style={styles.inputField}
            placeholder="***"
            value={cvc}
            onChangeText={setCVC}
            secureTextEntry
            keyboardType="number-pad"
            maxLength={3}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payButtonText}>Pay Now</Text>
        <AntDesign name="arrowright" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  cardInput: {
    marginBottom: 15,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  expiryInput: {
    flex: 1,
    marginRight: 10,
  },
  cvcInput: {
    flex: 1,
    marginLeft: 10,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  payButton: {
    flexDirection: 'row',
    backgroundColor: '#0074c2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  payButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
});

export default PaymentPage;
