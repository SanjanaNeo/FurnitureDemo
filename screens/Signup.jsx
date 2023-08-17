import { ScrollView, Text, View, TouchableOpacity, Image, TextInput, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import { BackBtn, Button } from '../components';
import styles from './login.style';
import { Formik } from 'formik';
import * as Yup from 'yup'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import { COLORS, SIZES } from '../constants';
import axios from 'axios';

const validationSchema = Yup.object().shape({
    password: Yup.string().min(8, 'Password must be atleast 8 characters').required('Required'),
    email: Yup.string().email('Provide a valid email address').required('Required'),
    location: Yup.string().min(3, 'Provide a valid location').required('Required'),
    username: Yup.string().min(3, 'Provide a valid username').required('Required'),
})

const Signup = ({ navigation }) => {
    const [loader, setLoader] = useState(false);
    const [obsecureText, setobsecureText] = useState(false);

    const inValidForm = () => {
        Alert.alert(
            "Inavlid Form",
            "Please provide all required fields",
            [
                {
                    text: "Cancel", onPress: () => { }
                },
                {
                    text: "Continue", onPress: () => { }
                },
                { defaultIndex: 1 }
            ]
        )
    }

    const registerUser = async(values) =>{
        setLoader(true)
        try {
            const endpoint = "http://10.0.2.2:3005/api/register"
            const data=values
            const response=await axios.post(endpoint,data)
            if(response.status===201){
                navigation.replace('Login')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ScrollView>
            <SafeAreaView style={{ marginHorizontal: 20 }}>
                <View>
                    <BackBtn onPress={() => navigation.goBack()} />
                    <Image
                        source={require('../assets/images/bk.png')}
                        style={{ height:SIZES.height/3.5,
                        width:SIZES.width-60,
                        resizeMode:'contain',
                        marginBottom:SIZES.xLarge}}
                    />
                    <Text style={styles.title}>Unlimited Luxurious Furniture</Text>
                    <Formik
                        initialValues={{ email: '', password: '', location: '', username: '' }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => registerUser(values)}
                    >
                        {({ handleChange, handleBlur, handleSubmit, touched, values, errors, isValid, setFieldTouched }) => (
                            <View>

                                <View style={styles.wrapper}>
                                    <Text style={styles.label}>Username</Text>
                                    <View style={styles.inputWrapper(touched.username ? COLORS.secondary : COLORS.offwhite)}>
                                        <MaterialCommunityIcons
                                            name='face-man-profile'
                                            size={20}
                                            color={COLORS.gray}
                                            style={styles.iconStyle}
                                        />
                                        <TextInput
                                            placeholder='Enter username'
                                            onFocus={() => { setFieldTouched('username') }}
                                            onBlur={() => setFieldTouched('username', '')}
                                            value={values.username}
                                            onChangeText={handleChange('username')}
                                            autoCapitalize='none'
                                            autoCorrect={false}
                                            style={{ flex: 1 }}
                                        />
                                    </View>
                                    {touched.username && errors.username && (
                                        <Text style={styles.errorMessage}>{errors.username}</Text>
                                    )}
                                </View>

                                <View style={styles.wrapper}>
                                    <Text style={styles.label}>Email</Text>
                                    <View style={styles.inputWrapper(touched.email ? COLORS.secondary : COLORS.offwhite)}>
                                        <MaterialCommunityIcons
                                            name='email-outline'
                                            size={20}
                                            color={COLORS.gray}
                                            style={styles.iconStyle}
                                        />
                                        <TextInput
                                            placeholder='Enter email'
                                            onFocus={() => { setFieldTouched('email') }}
                                            onBlur={() => setFieldTouched('email', '')}
                                            value={values.email}
                                            onChangeText={handleChange('email')}
                                            autoCapitalize='none'
                                            autoCorrect={false}
                                            style={{ flex: 1 }}
                                        />
                                    </View>
                                    {touched.email && errors.email && (
                                        <Text style={styles.errorMessage}>{errors.email}</Text>
                                    )}
                                </View>

                                <View style={styles.wrapper}>
                                    <Text style={styles.label}>Location</Text>
                                    <View style={styles.inputWrapper(touched.location ? COLORS.secondary : COLORS.offwhite)}>
                                        <Ionicons
                                            name='location-outline'
                                            size={20}
                                            color={COLORS.gray}
                                            style={styles.iconStyle}
                                        />
                                        <TextInput
                                            placeholder='Enter location'
                                            onFocus={() => { setFieldTouched('location') }}
                                            onBlur={() => setFieldTouched('location', '')}
                                            value={values.location}
                                            onChangeText={handleChange('location')}
                                            autoCapitalize='none'
                                            autoCorrect={false}
                                            style={{ flex: 1 }}
                                        />
                                    </View>
                                    {touched.location && errors.location && (
                                        <Text style={styles.errorMessage}>{errors.location}</Text>
                                    )}
                                </View>

                                <View style={styles.wrapper}>
                                    <Text style={styles.label}>Password</Text>
                                    <View style={styles.inputWrapper(touched.password ? COLORS.secondary : COLORS.offwhite)}>
                                        <MaterialCommunityIcons
                                            name='lock-outline'
                                            size={20}
                                            color={COLORS.gray}
                                            style={styles.iconStyle}
                                        />
                                        <TextInput
                                            secureTextEntry={obsecureText}
                                            placeholder='Password'
                                            onFocus={() => { setFieldTouched('password') }}
                                            onBlur={() => setFieldTouched('password', '')}
                                            value={values.password}
                                            onChangeText={handleChange('password')}
                                            autoCapitalize='none'
                                            autoCorrect={false}
                                            style={{ flex: 1 }}
                                        />
                                        <TouchableOpacity onPress={() => setobsecureText(!obsecureText)}>
                                            <MaterialCommunityIcons
                                                name={obsecureText ? "eye-outline" : "eye-off-outline"}
                                                size={18}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    {touched.password && errors.password && (
                                        <Text style={styles.errorMessage}>{errors.password}</Text>
                                    )}
                                </View>

                                <Button title={"S I G N U P"} onPress={isValid ? handleSubmit : inValidForm} isValid={isValid} loader={loader} />

                                {/* <Text style={styles.registration} onPress={()=>navigation.navigate('Signup')}>Register</Text> */}
                            </View>
                        )}
                    </Formik>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

export default Signup
