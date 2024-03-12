import { useEffect, useState, useCallback, useMemo } from 'react';
import { View, FlatList, Alert, StyleSheet } from 'react-native';

import Header from '../components/Header';
import HeroBanner from '../components/HeroBanner';
import Filters from '../components/Filters';
import FlatListItemSeparator from '../components/FlatListItemSeparator';
import Item from '../components/Item';

import { createTable, getMenuItemsFromDB, filterByQueryAndCategoriesFromDB } from '../utils/database';

import debounce from 'lodash.debounce';

const categories = ['Starters', 'Mains', 'Desserts', 'Drinks', 'Specials'];

const API_URL =
    'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';

export default function HomeScreen({ route, navigation }){

    const [data, setData] = useState([]);

    const [searchBarText, setSearchBarText] = useState('');
    const [query, setQuery] = useState('');
    const [filterSelections, setFilterSelections] = useState(
        categories.map(() => false)
    );
    
    const lookup = useCallback((q) => {
        setQuery(q);
      }, []);
    
      const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);
    
      const handleSearchChange = (text) => {
        setSearchBarText(text);
        debouncedLookup(text);
      };

    const handleFiltersChange = async (index) => {
        const arrayCopy = [...filterSelections];
        arrayCopy[index] = !filterSelections[index];
        setFilterSelections(arrayCopy);
    };

    useEffect(() => {

        (async () => {
            
            try {               
                
                // 1. Create table "menu" in Database if not exists                
                await createTable();
                        
                let menuItems = [];

                // 2. Check if data was already stored                
                menuItems = await getMenuItemsFromDB();
                                        
                // The application only fetches the menu data once from a remote URL
                // and then stores it into a SQLite database.
                // After that, every application restart loads the menu from the database            
                if (!menuItems.length) {    
                        
                    // Fetching menu from URL
                    const response = await fetch(API_URL);
                    const json = await response.json();
                    menuItems = await json.menu;
                    
                    // Storing into database
                    saveMenuItemsInDB();       

                }              
            
                setData(menuItems);
        
        } catch(e) {
            Alert.alert(e.message);
        }

        })();

    }, []);

    useEffect(() => {
        (async () => {

            try {

                const activeCategories = categories.filter((currentValue, index) => {

                    // If all filters are deselected, all categories are active
                    if (filterSelections.every((item) => item === false)) {
                        return true;
                    }
                    return filterSelections[index];
    
                });

                const menuItems = await filterByQueryAndCategoriesFromDB(
                    query,
                    activeCategories
                );
                
                setData(menuItems);

            } catch(e) {
                Alert.alert(e.message);
            }

        })();
    }, [filterSelections, query]);

    return(
        <View style={styles.container}>

            <Header route={route} navigation={navigation} />

            <HeroBanner 
                searchBarText={searchBarText}
                onSearchChange={handleSearchChange}
            />

            <View style={styles.filtersBoundingBox}>
                <Filters
                    selections={filterSelections}
                    onChange={handleFiltersChange}
                    categories={categories}
                />
            </View>

            <FlatList                
                data={data}
                renderItem={({item}) => 
                    <Item
                        name ={item.name}
                        description = {item.description}
                        price = {'$' + item.price}                                             
                    />
                }
                ItemSeparatorComponent={() => <FlatListItemSeparator/>}
            />
        
        </View> 
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },        
    filtersBoundingBox: {
        height: 100,
    },      
});