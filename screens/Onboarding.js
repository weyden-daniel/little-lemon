import { useState, useContext } from 'react';
import { StyleSheet, Text, Pressable, View, Image, TextInput, Alert } from 'react-native';
import { validateEmail, validateName } from '../utils/utilFunctions';

import { AppStateContext } from '../Context.js'

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OnboardingScreen(){
    
    const {appState, setAppState} = useContext(AppStateContext);

    const [firstName, onChangeFirstName ] = useState('');
    const [email, onChangeEmail ] = useState('');
    
    async function persistOnboardingStatus() {
        try {
            await AsyncStorage.setItem('firstName', JSON.stringify(firstName));
            await AsyncStorage.setItem('email', JSON.stringify(email));
            await AsyncStorage.setItem('isOnboardingCompleted', 'true');
        } catch(e) {
            Alert.alert(`An error occurred: ${e.message}`);
        }
    }

    function handleButtonClick() {      

        persistOnboardingStatus();        
        
        setAppState({
            ...appState,
            isOnboardingCompleted: true
        })
    }

    return (
        <View 
            style={styles.container}            
        >
        
            <View style={styles.header}>
                <Image
                    style={styles.image}
                    source={require('../img/Logo.png')}
                    resizeMode="contain"
                />            
            </View>

            <View style={styles.body}>

                <Text style={styles.headingText}>It looks like this is your first time here!</Text>

                <Text style={styles.inputLabelText}>First Name</Text>
                <TextInput
                    style={styles.inputBox}                
                    value={firstName}
                    onChangeText={onChangeFirstName}
                />
                
                <Text style={styles.inputLabelText}>Email</Text>
                <TextInput
                    style={styles.inputBox}
                    value={email}
                    onChangeText={onChangeEmail}
                    keyboardType="email-address"
                />

            </View>

            <View style={styles.footer}>

                <Pressable                     
                    disabled={(validateName(firstName)&&validateEmail(email)) ? false : true}
                    style={[
                        styles.button,
                        {backgroundColor: (validateName(firstName)&&validateEmail(email)) ? '#495E57' : '#EDEFEE'}
                    ]}
                    onPress={handleButtonClick}
                >   
                    <Text 
                        style={[
                            styles.buttonText,
                            {color: (validateName(firstName)&&validateEmail(email)) ? '#EDEFEE' : '#333333'}
                        ]}
                    >
                        Next
                    </Text>

                </Pressable>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,   
        flexDirection: 'column',   
        justifyContent: 'space-between',
        marginTop: 60,        
        backgroundColor: '#495E57',
    },  
    header: {
        flex: 0.05,
        flexDirection: 'row',
        justifyContent: 'center',        
        backgroundColor: '#EE9972',
        padding: 20,
    },
    body: {
        flex: 0.70,
        padding: 30,
    },
    image: {
        width: 185,
        height: 40,        
    },
    headingText: {
        marginTop: 20,
        marginBottom: 20,        
        fontSize: 34,
        color: '#EDEFEE',                
    },
    inputLabelText: {
        marginTop: 20,        
        marginBottom: 15,
        fontSize: 24,
        color: '#EDEFEE',                
    },
    inputBox: {
        height: 55,        
        marginBottom: 30,
        borderWidth: 1,
        padding: 10,
        fontSize: 20,
        borderColor: '#EDEFEE',
        backgroundColor: '#EDEFEE',
        color: '#333333',        
      },
      footer: {
        flex: 0.25,
        flexDirection: 'column',
        alignItems: 'flex-end',         
        height: '400',                
        backgroundColor: '#EE9972',      
      },
      button: {              
        padding: 15,        
        marginTop: 20,
        marginRight: 50,        
        borderRadius: 15,        
        width: 120,
        height: 70,
      },
      buttonText: {    
        fontSize: 28,                    
        textAlign: 'center',
      },
  });