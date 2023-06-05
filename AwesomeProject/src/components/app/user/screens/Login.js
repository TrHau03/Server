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
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React, { useContext, useState } from "react";
import { UserContext } from "../utilities/UserContext";


const Login = (props) => {
  const { navigation } = props;
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState('huyhoang@gmail.com');
  const [password, setPassword] = useState('Hau123456');


  const handleLogin = async () => {

    if (!email || !password) {
      Alert.alert("Vui lòng nhập email và password")
    } else {
      const result = await login(email, password);
      if (!result) {
        Alert.alert("Sai tài khoản hoặc mật khẩu!")
      }
    }

  }
  function MyCheckbox() {
    const [checked, setChecked] = useState(false);
    return (
      <Pressable
        style={[myStyles.checkboxBase, checked && myStyles.checkboxChecked]}
        onPress={() => setChecked(!checked)}>
        {checked && (
          <Image
            style={myStyles.checkbox}
            source={require('../../../../media/images/icons8-done-12.png')}
          />
        )}
      </Pressable>
    );
  }
  return (
    <KeyboardAwareScrollView>
      <View style={mystyles.container}>
        <View style={mystyles.groupWelcome}>
          <Text style={mystyles.textWelcome}>Welcome</Text>
          <Text style={mystyles.textSignInToStart}>Log in to start</Text>
        </View>
        <View style={mystyles.groupLoginWith}>
          <Pressable>
            <Image style={mystyles.imageGG} source={require('../../../../media/images/google.png')} />
          </Pressable>
          <Pressable>
            <Image style={mystyles.imageFB} source={require('../../../../media/images/Meta.png')} />
          </Pressable>
          <View style={mystyles.havenotAcc}>
            <Text style={mystyles.textHavenotAcc}>Haven't account? </Text>
            <Pressable onPress={() => navigation.navigate('Register')}>
              <Text style={[mystyles.textHavenotAcc, mystyles.textRegister]}>Register!</Text>
            </Pressable>
          </View>
          <LinearGradient
            colors={['#A2B2FC', '#FFF1BE']}
            style={mystyles.linearGradient}
            start={{ x: 0.4, y: 0.1 }}
            end={{ x: 0, y: 0 }}
          >
            <View style={mystyles.groupLogin}>
              <TextInput style={mystyles.textInputUserName} placeholder='Username' placeholderTextColor="white"  onChangeText={setEmail} >huyhoang@gmail.com</TextInput>
              <TextInput style={mystyles.textInputPassWord} placeholder='Password' placeholderTextColor="white" onChangeText={setPassword} >Hau123456</TextInput>
              <Text style={mystyles.textforgotPassword}>Forgot password?</Text>
              <Pressable style={mystyles.btnContinue} onPress={handleLogin}>
                <Image source={require('../../../../media/images/Continue.png')} />
              </Pressable>
            </View>


          </LinearGradient >

        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Login;

const mystyles = StyleSheet.create({
  btnContinue: {
    position: 'relative',
    top: 60,
    left: 30,
    paddingBottom: 130,
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
    marginTop: 20,
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
    height: '100%',
    width: '100%',
    marginTop: 20,
  },
  groupLogin: {
    width: '100%',
    height: '100%',
    paddingRight: 30,
    paddingLeft: 30,
    paddingTop: 30,
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
    marginTop: 100,
  },
  container: {
    backgroundColor: `linear-gradient(yellow,lightgreen)`,
  }
})
