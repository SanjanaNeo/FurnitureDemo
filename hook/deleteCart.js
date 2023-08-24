import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { useEffect } from "react";

// useEffect(() => {
//     deleteCart()
// }, [])

const deleteCart = async (cartItemId) => {
    const token = await AsyncStorage.getItem("token");

    try {
        // const endpoint = `http://10.0.2.2:3005/api/carts/64e33c303e076efb27cf7e58`;
        const endpoint = `http://10.0.2.2:3005/api/carts/${cartItemId}`
        const headers = {
            'Content-Type': 'application/json',
            'token': 'Bearer ' + JSON.parse(token)
        };
        console.log("API Request URL:", endpoint);
        await axios.delete(endpoint, { headers });
    } catch (error) {
        // setError(error);
        console.log(error)
    }
};

export default deleteCart