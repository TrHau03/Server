import { StyleSheet, Text, View,TextInput,Pressable,Image } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';

const Profile = () => {
  return (
    <View>
      <LinearGradient
            colors={['#A2B2FC', '#FFF1BE']}
            style={mystyles.linearGradient}
            start={{ x: 0.4, y: 0.1 }}
            end={{ x: 0, y: 0 }}
          >
           <Image style={mystyles.imgprofile} source={require('../../../../media/images/profile.png')}/>
            <Text style={mystyles.name}>Lê Trung Hậu</Text>
            <View style={mystyles.address}>
                <Image style={mystyles.iconaddress} source={require('../../../../media/images/address.png')}/>
                <Text style={mystyles.textAdress}>HCM-VietNam</Text>
            </View>
          </LinearGradient >
    </View>
  )
}

export default Profile

const mystyles = StyleSheet.create({
    textAdress:{
        fontSize: 17,
        position: 'absolute',
        left: -15,
        top: 13,
    },
    iconaddress:{
        position: 'relative',
        left: -50,
        top: 10,
    },
    address:{
        flexDirection:'column',
        position:'relative',
            left: -7
    },
    name:{
        fontSize: 23,
        fontWeight: '500',
        color: 'white'
    },
    imgprofile:{
        width: '33%',
        height: '50%'

    },
    linearGradient: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '60%',
        width: '100%',
      },
})