import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';

const Filters = ({ onChange, selections, categories }) => {
  return (
    <ScrollView       
      horizontal={true}
    > 
      <View style={styles.filtersContainer}>
        {categories.map((category, index) => (        
          <TouchableOpacity
            key={category}
            onPress={() => {
              onChange(index);
            }}
            style={{            
              justifyContent: 'center',
              alignItems: 'center',
              padding: 16,
              backgroundColor: selections[index] ? '#495E57' : '#EDEFEE',
              borderRadius: 20,
              marginLeft: 10,
              marginRight: 10,            
            }}
          >
            <View>
              <Text style={{ 
                  color: selections[index] ? '#EDEFEE' : '#495E57', 
                  fontWeight: 'bold', 
                  fontSize: 18, }}
              >
                {category}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  filtersContainer: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,        
  },  
});

export default Filters;
