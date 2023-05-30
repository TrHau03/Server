
import React, {useState, createContext} from 'react'
import     Alert from 'react-native';
import AxiosInstance from '../../axiosClient/AxiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const UserContext = createContext();


export const UserProvider = (props) => {
    const {children} = props;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const login = async (email, password) => {
        try {
            const response = await AxiosInstance().post('/user/login',
            {
                email: email,
                password: password
            } );
            const token = response.token;
            await AsyncStorage.setItem('token', token);
            setIsLoggedIn(true);
            return true;
        } catch (error) {
            console.log('Login Error: ', error);
        }
        return false;
    }

    const register = async (email,name,password,confirmPassword) => {
        try {
            console.log(email,name,password);
            const response = await AxiosInstance().post('/user/register',
            {
                email: email,
                password : password,
                name: name,
                confirmPassword: confirmPassword    
            });
            console.log(response);
            if(response.status == 1){
                Alert.alert(response.message);   
                return false;
            }
            return true;
        } catch (error) {
            console.log('Register Error: ',error);
        }
        return false;
    }
    
    return(
        <UserContext.Provider 
            value={{isLoggedIn, setIsLoggedIn, login, register}}>
            {children}
        </UserContext.Provider>
    )
}