import { useState, useEffect, useCallback } from 'react';
import { View, Image, Text, Pressable, StyleSheet } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFocusEffect } from '@react-navigation/native';

import { AntDesign } from '@expo/vector-icons';

export default function Header({route, navigation}) {

    const [firstName, onChangeFirstName ] = useState('');
    const [lastName, onChangeLastName ] = useState('');
    const [profileImage, onChangeProfileImage] = useState(null);

    const readValue = async () => {

        try {
            
            const firstNameJsonValue = await AsyncStorage.getItem('firstName');    
            const firstNameReadValue = (firstNameJsonValue != null) ? JSON.parse(firstNameJsonValue) : '';
            onChangeFirstName(firstNameReadValue);

            const lastNameJsonValue = await AsyncStorage.getItem('lastName');    
            const lastNameReadValue = (lastNameJsonValue != null) ? JSON.parse(lastNameJsonValue) : '';
            onChangeLastName(lastNameReadValue);

            const imageJsonValue = await AsyncStorage.getItem('image');    
            const imageReadValue = (imageJsonValue != null) ? JSON.parse(imageJsonValue) : null;
            onChangeProfileImage(imageReadValue);

        } catch(e) {
            Alert.alert(`An error occurred: ${e.message}`);
        }
    }

    useEffect(() => {
        
        ( async () => {

            await readValue();

        })();

    }, []);

    useFocusEffect(

        useCallback(() => {
            
            ( async () => {

                await readValue();
            
            })();

        }, [])

    );

    return(
        <View style={styles.container}>

            <View style={styles.leftContainer}>
                {(route.name == "Profile") &&
                    
                    <Pressable onPress={()=>{navigation.navigate("Home")}} style={styles.iconContainer}>                        
                        <AntDesign name="arrowleft" size={30} color="white" backgroundColor="#495E57" />                                                
                    </Pressable>
                }
            </View>
            
            <View style={styles.centerContainer}>
                <Image 
                    style={styles.logoImage} 
                    source={require('../img/Logo.png')}
                />
            </View>
            
            <View style={styles.rightContainer}>
                <Pressable onPress={()=>{navigation.navigate("Profile")}}>
                    {(profileImage != null) ? (
                        <Image source={{ uri: profileImage }} style={styles.profileImage} />
                    ):(
                        <View style={styles.profilePlaceholderCircle}>
                            <Text style={styles.profilePlaceholderText}>{firstName.slice(0,1)+lastName.slice(0,1)}</Text>
                        </View>
                    )}
                </Pressable>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        marginTop: 40,                               
        height: 90,                  
        flexDirection: 'row',        
        alignItems: 'center',        
        backgroundColor: '#FFFFFF',
    },
    leftContainer: {
        width: '25%',
        paddingLeft: 15,               
    },
    centerContainer: {
        width: '50%',        
        alignItems: 'center',
    },
    rightContainer: {
        width: '25%',
        alignItems: 'flex-end',        
        paddingRight: 15,        
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',  
        alignItems: 'center',       
        backgroundColor: '#495E57',
    },
    logoImage: {
        width: 185,
        height: 40,             
    },        
    profilePlaceholderCircle: {                                        
        justifyContent: 'center',
        alignItems: 'center',        
        width: 60, 
        height: 60,        
        borderRadius: 30,        
        backgroundColor: '#FBDABB',
    },
    profilePlaceholderText: {               
        color: '#333333',
        fontSize: 20,        
    },
    profileImage: {        
        width: 60, 
        height: 60,        
        borderRadius: 30,        
    },
});