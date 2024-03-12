import { View, Text, Image, StyleSheet } from 'react-native';

export default function Item ({ name, description, price }) {

    const imageGreekSalad = require('../img/Greek_salad.png');
    const imageBruscheta = require('../img/Bruschetta.png');
    const imageGrilledFish = require('../img/Grilled_fish.png');
    const imagePasta = require('../img/Pasta.png');
    const imageLemonDessert = require('../img/Lemon_dessert.png');

    let dishImage;

    switch (name) {
        case "Greek Salad":
            dishImage = imageGreekSalad;
            break;
        case "Bruschetta":
            dishImage = imageBruscheta;
            break;
        case "Grilled Fish":
            dishImage = imageGrilledFish;
            break;
        case "Pasta":
            dishImage = imagePasta;
            break;
        case "Lemon Dessert":
            dishImage = imageLemonDessert;
            break;
    }

    return (
        <View style={styles.item}>
            <View style={styles.itemLeftColumn}>
                <Text style={styles.itemName}>{name}</Text>
                <Text style={styles.itemDescription} numberOfLines={2}>{description}</Text>
                <Text style={styles.itemPrice}>{price}</Text>
            </View>        
            <View style={styles.itemRightColumn}>
                <Image 
                    source={dishImage} 
                    style={styles.itemImage} 
                />            
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        padding: 30,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
    },
    itemLeftColumn: {
        width: '70%',
    },
    itemName: {
        marginBottom: 16,
        fontSize: 26,
        color: '#333333',        
    },
    itemDescription: {
        marginBottom: 16,
        marginRight: 20,
        fontSize: 16,
        color: '#495E57',        
    },
    itemPrice: {        
        fontSize: 20,
        fontWeight: 'bold',
        color: '#495E57',
    },
    itemRightColumn: {
        width: '30%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',                
    },   
    itemImage: {
        width: 90,
        height: 90,                   
    },
});