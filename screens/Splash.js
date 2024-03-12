import { StyleSheet, Image, View } from 'react-native';

export default function SplashScreen() {
    return(
        
        <View style={styles.container}>
            <Image 
                style={styles.image}
                source={require('../img/Grilled_fish.png')}
                resizeMode="cover"
            />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,   
        flexDirection: 'column',   
        justifyContent: 'space-between',            
        backgroundColor: '#495E57',
    },      
    image: {
        width: 600,
        height: 900,        
    },
});
