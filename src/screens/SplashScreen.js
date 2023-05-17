import { View, ImageBackground, Dimensions, StyleSheet, SafeAreaView } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const { width, height } = Dimensions.get('window');
  const splashHeight = height * 0.24;
  const splashWidth = width * 0.68;

  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('SignUp'); 
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
    <View>
      <ImageBackground
        style={{
          width: splashWidth,
          height: splashHeight,
        }}
        source={require('../assets/logo.png')}
      />
    </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
},
})