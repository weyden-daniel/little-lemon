import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

import { AppStateContext } from './Context'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';

import SplashScreen from './screens/Splash';
import OnboardingScreen from './screens/Onboarding';
import HomeScreen from './screens/Home';
import ProfileScreen from './screens/Profile';

const Stack = createNativeStackNavigator();

export default function App() {

  const [appState, setAppState] = useState({
    isLoading: true,
    isOnboardingCompleted: false,
  });

  useEffect(() => {
    (async () => {
      try {

        const jsonValue = await AsyncStorage.getItem('isOnboardingCompleted');
        onboardingReadValue = (jsonValue != null) ? JSON.parse(jsonValue) : false;

        setAppState({
          isLoading: false,
          isOnboardingCompleted: onboardingReadValue
        });

      } catch(e) {
        Alert.alert(`An error occurred: ${e.message}`);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {

        const jsonValue = await AsyncStorage.getItem('isOnboardingCompleted');
        onboardingReadValue = (jsonValue != null) ? JSON.parse(jsonValue) : false;

        setAppState({
          isLoading: false,
          isOnboardingCompleted: onboardingReadValue
        });

      } catch(e) {
        Alert.alert(`An error occurred: ${e.message}`);
      }
    })();
  }, [appState]);


  if (appState.isLoading) {
    return <SplashScreen/>;
  }

  return (    

    <AppStateContext.Provider value={{appState, setAppState}}>
      <NavigationContainer>
        <Stack.Navigator>
          {appState.isOnboardingCompleted ? (
            <>
              <Stack.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{headerShown: false}}
              />
              <Stack.Screen 
                name="Profile" 
                component={ProfileScreen} 
                options={{headerShown: false}}
              />
            </>
          ) : (            
            <>
              <Stack.Screen 
                name="Onboarding" 
                component={OnboardingScreen} 
                options={{headerShown: false}}              
              />
            </> 
          )}
        </Stack.Navigator> 
      </NavigationContainer>     
    </AppStateContext.Provider>
  )                
}
