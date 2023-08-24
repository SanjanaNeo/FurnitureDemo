import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'
import { useCallback, useState } from 'react';
import BottomTabNavigation from './navigation/BottomTabNavigation';
import { Cart, ProductDetails, NewArrivals, LoginPage, Orders, Favorites, Signup, PaymentPage } from './screens';

const Stack = createNativeStackNavigator()

export default function App() {
  // const [orderedItems, setOrderedItems] = useState([]);

  const [fontsLoaded] = useFonts({
    regular: require("./assets/fonts/Poppins-Regular.ttf"),
    bold: require("./assets/fonts/Poppins-Bold.ttf"),
    extrabold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
    medium: require("./assets/fonts/Poppins-Medium.ttf"),
    semibold: require("./assets/fonts/Poppins-SemiBold.ttf")
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null;
  }


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Bottom Navigation'
          component={BottomTabNavigation}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='Cart'
          component={Cart}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='ProductDetails'
          component={ProductDetails}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='ProductList'
          component={NewArrivals}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='Login'
          component={LoginPage}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='Orders'
          component={Orders}
          options={{ headerShown: false }}
          // initialParams={{ orderedItems }}
        />

        <Stack.Screen
          name='Favorites'
          component={Favorites}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Signup'
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='PaymentPage'
          component={PaymentPage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
