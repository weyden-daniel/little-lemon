import { View, Image, Text, TextInput, StyleSheet } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';

export default function HeroBanner({searchBarText, onSearchChange}){

    return(

        <View style={styles.banner}>

                <Text style={styles.headerText}>Little Lemon</Text>

                <View style={styles.bannerTable}>

                    <View style={styles.bannerTableColumnLeft}>

                        <Text style={styles.subHeaderText}>Chicago</Text>

                        <Text style={styles.descriptiveText}>
                            We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
                        </Text>
                    
                    </View>

                    <View style={styles.bannerTableColumnRight}>

                        <Image 
                            style={styles.heroImage} 
                            source={require('../img/Hero_image.png')}
                        />
                    
                    </View>

                {/* Banner Table */}
                </View> 
                
                <Searchbar
                    //placeholder="Search"
                    //placeholderTextColor="white"
                    onChangeText={onSearchChange}
                    value={searchBarText}
                    style={styles.searchBar}
                    //iconColor="white"
                    inputStyle={{ color: '#333333' }}
                    elevation={0}
                />
                    
            {/* Banner */}
            </View> 
        
    );
}

const styles = StyleSheet.create({
    banner: {        
        height: 300,
        backgroundColor: '#495E57',
        paddingTop: 5,
        paddingLeft: 20,
        paddingRight: 20,
    },    
    headerText: {
        color: '#F4CE14',
        fontSize: 46,
        fontWeight: 'bold',
    },
    subHeaderText: {
        color: '#EDEFEE',
        fontSize: 30,
        fontWeight: 'bold',        
    },
    descriptiveText: {
        color: '#EDEFEE',
        fontSize: 16,        
        marginTop: 20,
        marginRight: 30,
    },
    bannerTable: {
        flexDirection: 'row',        
        height: 160,       
    },
    bannerTableColumnLeft: {
        width: '60%',        
        height: 160,                
    },
    bannerTableColumnRight: {
        width: '40%',        
        height: 160,
        justifyContent: 'flex-end',        
    },
    heroImage: {
        width: '100%',
        height: 150,   
        borderRadius: 20,         
    },        
    searchBar: {
        marginTop: 10,
        borderRadius: 12,        
        fontSize: 16,
        color: '#333333',      
        backgroundColor: '#EDEFEE',
    },
});