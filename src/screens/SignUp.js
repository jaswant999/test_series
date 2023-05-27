import React, { useState } from 'react'
import { View, Text, Image, Dimensions, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native'


const { width, height } = Dimensions.get('window');
const splashHeight = height * 0.1;
const splashWidth = width * 0.3;

const SignUp = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [errorName, setErrorName] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPhoneNumber, setErrorPhoneNumber] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);

    const saveData = async () => {
        if (!username) {
            setErrorName(true)
        } else {
            setErrorName(false)
        }

        if (!email) {
            setErrorEmail(true)
        } else {
            setErrorEmail(false)
        }

        if (!phoneNumber) {
            setErrorPhoneNumber(true)
        } else {
            setErrorPhoneNumber(false)
        }

        if (!password) {
            setErrorPassword(true)
        } else {
            setErrorPassword(false)
        }

        if (!confirmPassword) {
            setErrorConfirmPassword(true)
        } else {
            setErrorConfirmPassword(false)
        }

        if (!username || !email || !phoneNumber || !password || !confirmPassword) {
            return false
        }
        console.log(username)
        const url = "https://jkumar.pythonanywhere.com/api/register/";
        console.log(JSON)
        let result = await fetch(url, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "email": email, 
                "password": password, 
                "first_name" : username, 
                "mobile_number": phoneNumber
            })
        });
        result = await result.json();
        if (result) {
            alert("Successfully Register");
        }
    }


    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.container}>
                <Image style={styles.image}
                    source={require('../assets/logo_without_name.png')} />
                <Text style={styles.text}>Sign Up</Text>
                <Text style={styles.textWelcome}>Welcome to Test Series</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Username'
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                />
                <View style={{ alignSelf: 'flex-start' }}>
                    {errorName ? <Text style={{ color: 'red', marginLeft: '6%', marginTop: '0.5%' }}>Please enter valid username</Text> : null}
                </View>
                <TextInput
                    style={[styles.input, styles.inputSpace]}
                    placeholder='Email'
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <View style={{ alignSelf: 'flex-start' }}>
                    {errorEmail ? <Text style={{ color: 'red', marginLeft: '6%', marginTop: '0.5%' }}>Please enter valid email</Text> : null}
                </View>
                <TextInput
                    style={[styles.input, styles.inputSpace]}
                    placeholder='Phone Number'
                    keyboardType="numeric"
                    value={phoneNumber}
                    onChangeText={(text) => setPhoneNumber(text)}
                />
                <View style={{ alignSelf: 'flex-start' }}>
                    {errorPhoneNumber ? <Text style={{ color: 'red', marginLeft: '6%', marginTop: '0.5%' }}>Please enter valid phone number</Text> : null}
                </View>
                <TextInput
                    style={[styles.input, styles.inputSpace]}
                    placeholder='Password'
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <View style={{ alignSelf: 'flex-start' }}>
                    {errorPassword ? <Text style={{ color: 'red', marginLeft: '6%', marginTop: '0.5%' }}>Please enter valid password</Text> : null}
                </View>
                <TextInput
                    style={[styles.input, styles.inputSpace]}
                    placeholder='Confirm Password'
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                />
                 <View style={{ alignSelf: 'flex-start' }}>
                    {errorConfirmPassword ? <Text style={{ color: 'red', marginLeft: '6%', marginTop: '0.5%' }}>Please enter valid confirm password</Text> : null}
                </View>
                <TouchableOpacity style={styles.button} activeOpacity={0.4} onPress={saveData}>
                    <Text style={styles.txtSubmit}>Submit</Text>
                </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>
    )
}

export default SignUp

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    image: {
        width: splashWidth,
        height: splashHeight,
    },

    text: {
        fontSize: 25,
        marginTop: 10,
        fontWeight: 'bold',
        color: '#57589c',
    },
    textWelcome: {
        fontSize: 14,
        marginTop: 5,
        color: 'grey',
    },

    input: {
        marginTop: 30,
        borderWidth: 0.5,
        borderColor: 'lightgrey',
        borderRadius: 10,
        width: '90%',
        padding: 10,
        backgroundColor: '#fff',
        shadowColor: 'grey',
        elevation: 1,
        shadowOpacity: 2,
    },

    inputSpace: {
        marginTop: 15,
    },

    button: {
        alignItems: 'center',
        borderRadius: 10,
        width: '90%',
        padding: 12,
        marginTop: 25,
        backgroundColor: '#57589c',
        shadowColor: 'grey',
        elevation: 0.5,
        shadowOpacity: 2,
        marginBottom: '10%',

    },

    txtSubmit: {
        fontSize: 16, fontWeight: '500', color: '#fff',
    },


})