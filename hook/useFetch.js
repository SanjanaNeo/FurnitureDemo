import { View, Text } from 'react-native'
import { useState, useEffect } from 'react'
import axios from 'axios'

const baseUrl = {
    android: "http://10.0.2.2:3005",
    ios: "http://localhost:3005",
  };
  
const useFetch = (Platform) => {
    
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null)

    const fetchData = async () => {
        try {
            const response = await axios.get(`${baseUrl[Platform]}/api/products`)
            setData(response.data)
            console.log("checking", data);
            setIsLoading(false)
            setError(null)
        } catch (error) {
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const refetch = () => {
        setIsLoading(true);
        fetchData()
    }
    return { data, isLoading, error, refetch }
}

export default useFetch