import React, { useState, useEffect } from 'react'
import { View, Text, Image, Dimensions,Alert,SafeAreaView, Pressable, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import auth from '@react-native-firebase/auth';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import firestore from '@react-native-firebase/firestore';



const { width, height } = Dimensions.get('window');
const splashHeight = height * 0.1;
const splashWidth = width * 0.3;


const Login = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState();
    const [errorPhoneNumber, setErrorPhoneNumber] = useState(false);
    const [confirm, setConfirm] = useState(null);
    const [code, setCode] = useState('');
    const [formattedValue, setFormattedValue] = useState('');
    
    var codeLength = 6;

    
  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    if (!phoneNumber) {
        setErrorPhoneNumber(true)
    } else {
        setErrorPhoneNumber(false)
    }

    if (!phoneNumber) {
        return false
    }
   
    try {
       console.log('SUBMITTED! ', phoneNumber);
      const confirmation = await auth().signInWithPhoneNumber(
        '+91' + phoneNumber,
      );
      setConfirm(confirmation);
    } catch (err) {
      console.log('Error', err);
    }
     }

  
  async function confirmCode() {
    try {
      let confirmcode = confirm.confirm(code);
      await confirmcode;
            console.log('code confirmed');
            
       firestore()
         .collection('users')
         .doc(auth().currentUser.uid)
         .update({phoneNumber: auth().currentUser.phoneNumber});

      navigation.navigate('Home');
    } catch (error) {
      console.log('Invalid code.');
      Alert.alert('Invalid code. Please try again.', String(error));
    }
  }

  if (!confirm) {
    return (

        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.container}>
            <Image style={styles.image}
                source={require('../assets/logo_without_name.png')} />
            <Text style={styles.text}>Sign Up</Text>
            <Text style={styles.textWelcome}>Welcome to Test Series</Text>
            <TextInput
                style={styles.input}
                placeholder='Enter Phone Number'
                value={phoneNumber}
                keyboardType="numeric"
                onChangeText={(text) => setPhoneNumber(text)}
                onChangeFormattedText={text => {
                    setFormattedValue(text);
                  }}
            />
                <View style={{ alignSelf: 'flex-start' }}>
                    {errorPhoneNumber ? <Text style={styles.txtError}>Please Enter 10 digit Phone Number</Text> : null}
                </View>
                <TouchableOpacity style={styles.button} activeOpacity={0.4} onPress={() => signInWithPhoneNumber(phoneNumber)} >
                    <Text style={styles.txtSubmit}>Login</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row' }}>
                    
                    <Text style={{ fontSize: 15, color: 'darkgrey', marginTop: '-1%' }}>───────────  or continue with   ────────── </Text>
                </View>


                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: 10,
                    }}>
                    <TouchableOpacity>
                        <Image
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 30,
                                shadowColor: 'grey',
                                shadowOpacity: 1,
                                elevation: 6,
                                shadowRadius: 10,
                                shadowOffset: { width: 1, height: 13 },
                                margin: 5,
                            }}
                            source={require('../assets/Facebook_Logo.png')}
                        />
                    </TouchableOpacity>
                    
                    <TouchableOpacity>
                        <Image
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 35,
                                shadowColor: 'grey',
                                shadowOpacity: 1,
                                elevation: 6,
                                shadowRadius: 10,
                                shadowOffset: { width: 1, height: 13 },
                                margin: 5,
                            }}
                            source={require('../assets/IOS_Google_icon.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}


return (
    <SafeAreaView  style={{ flex: 1 }}>
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.container}>
            <Image style={styles.image}
                source={require('../assets/logo_without_name.png')} />
            <Text style={styles.text}>OTP Verification</Text>
           
          <Text style={styles.txtEnterOtp}>Enter the {codeLength} digit Code</Text> 
          <Text style={styles.text1}>
              sent to
               <Text style={styles.txtNumber}> {phoneNumber}</Text>
            </Text>
         

                  <OTPInputView
                  style={styles.otpContainer}
                  pinCount={codeLength}
                  // code={this.state.code}  //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                  editable={true}
                  // onCodeChanged = {code => { this.setState({code})}}
                  keyboardType="numeric"
                  keyboardAppearance="default"
                  clearInputs={false}
                  secureTextEntry={false}
                  autoFocusOnLoad
                  TextInputColor="black"
                  codeInputFieldStyle={styles.underlineStyleBase}
                  codeInputHighlightStyle={styles.underlineStyleHighLighted}
                  onCodeFilled={code => setCode(code)}
                />
              
               
<TouchableOpacity style={{...styles.button, marginTop:'-2%'}} activeOpacity={0.4}  onPress={() => confirmCode()} >
                    <Text style={styles.txtSubmit}>Login</Text>
                </TouchableOpacity>


            {/* <Text style={styles.text1}>Enter the {codeLength} digit Code</Text> */}
            
            </View>
           
        
                
             
         
        
        </KeyboardAvoidingView>
        </SafeAreaView>
  );
};


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
        fontSize: 25,
        marginTop: 10,
        fontWeight: 'bold',
        color: '#57589c',
    },
    textWelcome: {
        fontSize: 18,
        marginTop: 8,
        color: 'grey',
        fontWeight: '500',
    },

    input: {
        marginTop: 35,
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
        marginTop: 20,
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

    txtError: {
        color: 'red', marginLeft: '6%', marginTop: '1%'
    },

    txtEnterOtp: {
        color: '#000',
        fontWeight: '500',
        fontSize: 14,
        marginTop:'5%',
      },

      otpContainer: {
        marginTop:'-5%',
        width: '90%',
        height: '25%',

      },

      text1: {
        color: 'grey',
        textAlign: 'center',
        fontSize: 15,
        marginTop: 20,
      },

      underlineStyleBase: {
        width: 50,
        height: 60,
        borderWidth: 2,
        fontSize: 20,
        borderColor: 'lightgrey',
        color: '#000',
      },
    
      underlineStyleHighLighted: {
        borderColor: '#277099',
      },

      txtNumber:{
        color:'red'
      }
})