import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { useEffect, useState } from "react"

const fetchOrders = async (setData) => {
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null)

    const fetchData = async () => {
        setLoader(true);
        const token = await AsyncStorage.getItem("token")

        try {
            const endpoint = 'http://10.0.2.2:3005/api/orders'
            const headers = {
                'Content-Type': 'application/json',
                'token': 'Bearer ' + JSON.parse(token)
            }

            const response = await axios.get(endpoint, { headers })
            setData(response.data) // Update the data state here
            setLoader(false)
        } catch (error) {
            setError(error)
            setLoader(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const refetch = () => {
        setLoader(true);
        fetchData()
    }

    return { data,loader, error, refetch }
}

export default fetchOrders
