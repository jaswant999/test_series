import React from 'react'
import { View, Text, Image, Dimensions, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native'


const { width, height } = Dimensions.get('window');
const splashHeight = height * 0.15;
const splashWidth = width * 0.4;


const Login=()=> {
  return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.container}>
                <Image style={styles.image}
                    source={require('../assets/logo_without_name.png')} />
                <Text style={styles.text}>Login</Text>
                <Text style={styles.textWelcome}>Welcome to Test Series</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Username'
                />
                <TextInput
                    style={[styles.input, styles.inputSpace]}
                    placeholder='Password'
                    secureTextEntry
                />
               
                <TouchableOpacity style={styles.button} activeOpacity={0.4} >
                    <Text style={styles.txtSubmit}>Login</Text>
                </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>
  )
}

export default Login

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
        fontSize: 28,
        marginTop: 10,
        fontWeight: 'bold',
        color: '#57589c',
    },
    textWelcome: {
        fontSize: 15,
        marginTop: 8,
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

    txtSubmit:{
        fontSize: 16, fontWeight: '500', color: '#fff',
    },

})