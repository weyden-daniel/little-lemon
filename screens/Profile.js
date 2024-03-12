import { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Alert, Image, Pressable, ScrollView } from 'react-native';

import Header from '../components/Header';

import { validateEmail, validateName, validatePhone } from '../utils/utilFunctions';

import { AppStateContext } from '../Context.js'

import AsyncStorage from '@react-native-async-storage/async-storage';

import * as ImagePicker from 'expo-image-picker';

import { MaskedTextInput } from "react-native-mask-text";

import Checkbox from 'expo-checkbox';

export default function ProfileScreen({ route, navigation }){

    const {appState, setAppState} = useContext(AppStateContext);

    const [image, onChangeImage] = useState(null);

    const [firstName, onChangeFirstName ] = useState('');
    const [lastName, onChangeLastName ] = useState('');
    const [email, onChangeEmail ] = useState('');
    const [phone, onChangePhone ] = useState('');
    
    const [isCheckedBox1, onChangeCheckedBox1] = useState(false);
    const [isCheckedBox2, onChangeCheckedBox2] = useState(false);
    const [isCheckedBox3, onChangeCheckedBox3] = useState(false);
    const [isCheckedBox4, onChangeCheckedBox4] = useState(false);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        if (!result.canceled) {
        onChangeImage(result.assets[0].uri);
        }
    };

    async function persistForm() {
        try {

            if (image != null) {
                await AsyncStorage.setItem('image', JSON.stringify(image));    
            } else {
                await AsyncStorage.removeItem('image');
            }

            await AsyncStorage.setItem('firstName', JSON.stringify(firstName));
            await AsyncStorage.setItem('lastName', JSON.stringify(lastName));
            await AsyncStorage.setItem('email', JSON.stringify(email));
            await AsyncStorage.setItem('phone', JSON.stringify(phone));
            await AsyncStorage.setItem('isCheckedBox1', JSON.stringify(isCheckedBox1));
            await AsyncStorage.setItem('isCheckedBox2', JSON.stringify(isCheckedBox2));
            await AsyncStorage.setItem('isCheckedBox3', JSON.stringify(isCheckedBox3));
            await AsyncStorage.setItem('isCheckedBox4', JSON.stringify(isCheckedBox4));

        } catch(e) {
            Alert.alert(`An error occurred: ${e.message}`);
        }
    }

    const handleSaveChangesButtonClick = async() => {

        try {

            await persistForm();

            navigation.navigate("Home");

        } catch(error) {

          console.error(error);

        }
        
    }

    async function clearForm() {
        try {
            await AsyncStorage.clear();
        } catch(e) {
            Alert.alert(`An error occurred: ${e.message}`);
        }
    }

    function handleLogOutButtonClick() {

        clearForm();
          
        setAppState({
            isLoading: true,
            isOnboardingCompleted: false
        })
        
    }

    useEffect(() => {
        (async () => {
          try {
            
            const imageJsonValue = await AsyncStorage.getItem('image');    
            const imageReadValue = (imageJsonValue != null) ? JSON.parse(imageJsonValue) : null;
            onChangeImage(imageReadValue);

            const firstNameJsonValue = await AsyncStorage.getItem('firstName');    
            const firstNameReadValue = (firstNameJsonValue != null) ? JSON.parse(firstNameJsonValue) : '';
            onChangeFirstName(firstNameReadValue);

            const lastNameJsonValue = await AsyncStorage.getItem('lastName');    
            const lastNameReadValue = (lastNameJsonValue != null) ? JSON.parse(lastNameJsonValue) : '';
            onChangeLastName(lastNameReadValue);

            const emailJsonValue = await AsyncStorage.getItem('email');    
            const emailReadValue = (emailJsonValue != null) ? JSON.parse(emailJsonValue) : '';
            onChangeEmail(emailReadValue);

            const phoneJsonValue = await AsyncStorage.getItem('phone');    
            const phoneReadValue = (phoneJsonValue != null) ? JSON.parse(phoneJsonValue) : '';
            onChangePhone(phoneReadValue);

            const isCheckedBox1JsonValue = await AsyncStorage.getItem('isCheckedBox1');    
            const isCheckedBox1ReadValue = (isCheckedBox1JsonValue != null) ? JSON.parse(isCheckedBox1JsonValue) : false;
            onChangeCheckedBox1(isCheckedBox1ReadValue);

            const isCheckedBox2JsonValue = await AsyncStorage.getItem('isCheckedBox2');    
            const isCheckedBox2ReadValue = (isCheckedBox2JsonValue != null) ? JSON.parse(isCheckedBox2JsonValue) : false;
            onChangeCheckedBox2(isCheckedBox2ReadValue);

            const isCheckedBox3JsonValue = await AsyncStorage.getItem('isCheckedBox3');    
            const isCheckedBox3ReadValue = (isCheckedBox3JsonValue != null) ? JSON.parse(isCheckedBox3JsonValue) : false;
            onChangeCheckedBox3(isCheckedBox3ReadValue);

            const isCheckedBox4JsonValue = await AsyncStorage.getItem('isCheckedBox4');    
            const isCheckedBox4ReadValue = (isCheckedBox4JsonValue != null) ? JSON.parse(isCheckedBox4JsonValue) : false;
            onChangeCheckedBox4(isCheckedBox4ReadValue);

          } catch(e) {
            Alert.alert(`An error occurred: ${e.message}`);
          }
        })();
    }, []);

    return(

        <View style={styles.container}>

            <Header route={route} navigation={navigation} />

            <View style={styles.containerBody}>

                <ScrollView keyboardDismissMode='on-drag'>

                    <Text style={styles.headerText}>Personal information</Text>

                    <Text style={styles.inputLabelText}>Avatar</Text>
                    <View style={styles.avatarContainer}>                

                        {(image != null) ? (
                            <Image source={{ uri: image }} style={styles.avatarImage} />
                        ):(
                            <View style={styles.avatarPlaceholderCircle}>
                                <Text style={styles.avatarPlaceholderText}>{firstName.slice(0,1)+lastName.slice(0,1)}</Text>
                            </View>
                        )}
                    
                        <Pressable onPress={pickImage} style={styles.changeAvatarButton}>
                            <Text style={styles.changeAvatarButtonText}>Change</Text>
                        </Pressable>

                        <Pressable onPress={()=>{onChangeImage(null)}} style={styles.removeAvatarButton}>
                            <Text style={styles.removeAvatarButtonText}>Remove</Text>
                        </Pressable>
                    </View>

                    <Text style={styles.inputLabelText}>First name</Text>
                    <TextInput
                        style={styles.inputBox}                
                        value={firstName}
                        onChangeText={onChangeFirstName}                
                    />

                    <Text style={styles.inputLabelText}>Last name</Text>
                    <TextInput
                        style={styles.inputBox}                
                        value={lastName}
                        onChangeText={onChangeLastName}
                    />

                    <Text style={styles.inputLabelText}>Email</Text>
                    <TextInput
                        style={styles.inputBox}
                        value={email}
                        onChangeText={onChangeEmail}
                        keyboardType="email-address"                
                    />

                    <Text style={styles.inputLabelText}>Phone number</Text>
                    <MaskedTextInput
                        mask="(999) 999-9999"
                        style={styles.inputBox}
                        value={phone}
                        onChangeText={onChangePhone}
                        keyboardType="numeric"
                    />

                    <Text style={styles.headerText}>Email notifications</Text>

                    <View style={styles.checkboxContainer}>
                        <Checkbox                        
                            value={isCheckedBox1}
                            onValueChange={onChangeCheckedBox1}    
                            color={isCheckedBox1 ? '#495E57' : undefined}                    
                        />
                        <Text style={styles.checkboxLabelText}>Order statuses</Text>                
                    </View>

                    <View style={styles.checkboxContainer}>
                        <Checkbox                        
                            value={isCheckedBox2}
                            onValueChange={onChangeCheckedBox2}                        
                            color={isCheckedBox2 ? '#495E57' : undefined}                    
                        />
                        <Text style={styles.checkboxLabelText}>Password changes</Text>
                    </View>
                    
                    <View style={styles.checkboxContainer}>
                        <Checkbox                        
                            value={isCheckedBox3}
                            onValueChange={onChangeCheckedBox3}                        
                            color={isCheckedBox3 ? '#495E57' : undefined}                    
                        />
                        <Text style={styles.checkboxLabelText}>Special offers</Text>
                    </View>
                    
                    <View style={styles.checkboxContainer}>
                        <Checkbox                        
                            value={isCheckedBox4}
                            onValueChange={onChangeCheckedBox4}                        
                            color={isCheckedBox4 ? '#495E57' : undefined}                    
                        />
                        <Text style={styles.checkboxLabelText}>Newsletter</Text>
                    </View>

                    <Pressable style={styles.logOutButton} onPress={handleLogOutButtonClick} >
                        <Text style={styles.logOutButtonText}>Log out</Text>
                    </Pressable>
                    
                    <View style={styles.footerButtonContainer}>

                        <Pressable style={styles.discardChangesButton}>
                            <Text style={styles.discardChangesButtonText}>Discard changes</Text>
                        </Pressable>

                        <Pressable 
                            disabled={(validateName(firstName)&&validateName(lastName)&&validateEmail(email)&&validatePhone(phone)) ? 
                                false : true}
                            style={[
                                styles.saveChangesButton,
                                {backgroundColor: 
                                    (validateName(firstName)&&validateName(lastName)&&validateEmail(email)&&validatePhone(phone)) ? 
                                    '#495E57' : '#EDEFEE'
                                }
                            ]}
                            onPress={handleSaveChangesButtonClick}
                        >
                            <Text 
                                style={[
                                    styles.saveChangesButtonText,
                                    {color: 
                                        (validateName(firstName)&&validateName(lastName)&&validateEmail(email)&&validatePhone(phone)) ? 
                                        '#EDEFEE' : '#333333'
                                    }
                                ]}
                            >
                                Save changes
                            </Text>

                        </Pressable>

                    </View>

                </ScrollView>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1, 
    },
    containerBody: {       
        flex: 0.9,               
        marginLeft: 20,    
        marginRight: 20,
        padding: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        borderColor: '#333333',
    },  
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 80,                
    },
    avatarPlaceholderCircle: { 
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80, 
        height: 80,        
        borderRadius: 40,        
        backgroundColor: '#FBDABB',
    },
    avatarPlaceholderText: {               
        color: '#333333',
        fontSize: 24,        
    },
    avatarImage: { 
        width: 80, 
        height: 80,        
        borderRadius: 40,
    },
    changeAvatarButton: {
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
        backgroundColor: '#495E57',        
    },
    changeAvatarButtonText: {
        fontSize: 20,
        color: '#EDEFEE',
    },
    removeAvatarButton: {
        padding: 8,        
        borderRadius: 10,        
        borderWidth: 2,
        borderColor: '#495E57',
    },
    removeAvatarButtonText: {
        fontSize: 20,
        color: '#333333',
    },
    headerText: {                
        color: '#333333',        
        fontSize: 26,
        fontWeight: 'bold',
    },
    inputLabelText: {
        marginTop: 20,        
        marginBottom: 10,
        fontSize: 16,
        color: '#333333',                
    },
    inputBox: {
        height: 55,        
        marginBottom: 20,
        borderWidth: 1,
        padding: 10,
        fontSize: 16,
        borderColor: '#333333',        
        borderRadius: 16,
        color: '#333333',        
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },    
    checkboxLabelText: {
        fontSize: 16,
        marginLeft: 10,
    },
    logOutButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginTop: 40,        
        borderRadius: 10,
        backgroundColor: '#F4CE14',        
    },
    logOutButtonText: {
        fontSize: 16,        
        fontWeight: 'bold',
        color: '#333333',
    },
    footerButtonContainer: {        
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 40,
    },    
    discardChangesButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,        
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#495E57',
        backgroundColor: '#FFFFFF',        
    },
    discardChangesButtonText: {
        fontSize: 16,        
        fontWeight: 'bold',
        color: '#333333',
    },
    saveChangesButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,        
        borderRadius: 10,
        backgroundColor: '#495E57',        
    },
    saveChangesButtonText: {
        fontSize: 16,        
        fontWeight: 'bold',
        color: '#EDEFEE',
    },
});