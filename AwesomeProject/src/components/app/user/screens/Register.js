import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Pressable,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import LinearGradient from 'react-native-linear-gradient';
import { UserContext } from "../utilities/UserContext";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const Register = (props) => {
  const { navigation } = props;
  const { register } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const handIsRegister = async () => {

    // if(!email || !password) {
    //   Alert.alert("Vui lòng nhập email và password")
    //   return;
    // }
    // if(password != confirmPassword) {
    //   Alert.alert("Mật khẩu không khớp")
    //   return;
    // }
    const result = await register(email, name, password, confirmPassword);
    if (result) {
      navigation.navigate('Login');
    } else {
      Alert.alert("Đăng ký không thành công");
    }
  }
  return (
    <KeyboardAwareScrollView  >
      <View style={mystyles.container}>
        <View style={mystyles.groupWelcome}>
          <Text style={mystyles.textWelcome}>Welcome</Text>
          <Text style={mystyles.textSignInToStart}>Register to start</Text>
        </View>
        <View style={mystyles.groupLoginWith}>
          <Pressable>
            <Image style={mystyles.imageGG} source={require('../../../../media/images/google.png')} />
          </Pressable>
          <Pressable>
            <Image style={mystyles.imageFB} source={require('../../../../media/images/Meta.png')} />
          </Pressable>
          <View style={mystyles.havenotAcc}>
            <Text style={mystyles.textHavenotAcc}>Have account? </Text>
            <Pressable onPress={() => navigation.goBack()}>
              <Text style={[mystyles.textHavenotAcc, mystyles.textRegister]}>Log in!</Text>
            </Pressable>
          </View>
          <LinearGradient
            colors={['#A2B2FC', '#FFF1BE']}
            style={mystyles.linearGradient}
            start={{ x: 0.4, y: 0.1 }}
            end={{ x: 0, y: 0 }}
          >
            <View style={mystyles.groupLogin}>
              <TextInput style={mystyles.textInputPassWord} placeholder='Email' placeholderTextColor="white" value={email} onChangeText={setEmail} />
              <TextInput style={mystyles.textInputPassWord} placeholder='Name' placeholderTextColor="white" value={name} onChangeText={setName} />
              <TextInput style={mystyles.textInputPassWord} placeholder='Password' placeholderTextColor="white" value={password} onChangeText={setPassword} />
              <TextInput style={mystyles.textInputPassWord} placeholder='ConfirmPassword' placeholderTextColor="white" value={confirmPassword} onChangeText={setConfirmPassword} />
              <Pressable style={mystyles.btnContinue}>
                <Image source={require('../../../../media/images/Continue.png')} />
              </Pressable>
            </View>

          </LinearGradient>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Register;

const mystyles = StyleSheet.create({

  btnContinue: {
   paddingBottom: 50,
   position: 'relative',
    top: 20,
    left: 20,
  },
  textforgotPassword: {
    position: 'relative',
    left: '65%',
    top: 10,
    color: 'white'
  },
  textInputPassWord: {
    borderBottomWidth: 1,
    borderColor: "white",
    fontSize: 16,
    color: "white",
    marginTop: 10,
  },
  textInputUserName: {
    borderBottomWidth: 1,
    borderColor: "white",
    fontSize: 16,

    color: "white",
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    width: '100%',
    marginTop: 50,

  },
  groupLogin: {
    width: '100%',
    height: '100%',
    paddingRight: 30,
    paddingLeft: 30,
    paddingTop: 20,
  },
  textRegister: {
    color: "#2079FF",
  },
  textHavenotAcc: {
    fontSize: 16,
    lineHeight: 18,
    color: "#424242",

  },
  havenotAcc: {
    marginTop: 10,
    flexDirection: "row",
    padding: 10,
  },
  imageFB: {
    marginTop: 20,

  },
  groupLoginWith: {
    alignItems: "center",
    marginTop: 50,

  },
  textSignInToStart: {
    fontFamily: "Unbuntu",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 18,
    fontSize: 16,
    color: "#9D9D9D",
  },
  textWelcome: {
    fontFamily: "Unbuntu",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 41,
    fontSize: 36,
    color: "#424242",
  },
  groupWelcome: {
    alignItems: "center",
    marginTop: 50,
  },
  container: {
    backgroundColor: `linear-gradient(yellow,lightgreen)`,
    height: '110%'
  }
})
