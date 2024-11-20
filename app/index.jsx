import React, { useState ,useEffect} from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

//435928af75ba208f4c00a7ba

const API_URL = ' https://v6.exchangerate-api.com/v6/435928af75ba208f4c00a7ba/latest/USD'
const Index = () => {
   const searchExchange = async(currency)=>{
    const response = await fetch(`${API_URL}&s=${currency}`)
    const data = await response.json;

    console.log(data)
   }
   useEffect(()=>{
     searchExchange
   },[])

  const [count, setCount] = useState(0); // State to manage the counter value
  
  //dependency array
  return (
    <View style={styles.container}>
      {/* Decrement Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setCount(count - 1)}
      >
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>

      {/* Counter Display */}
      <Text style={styles.counter}>{count}</Text>

      {/* Increment Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setCount(count + 1)}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  button: {
    backgroundColor: '#6200ea',
    padding: 10,
    borderRadius: 5,
    margin: 10,
    width: 60,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  counter: {
    fontSize: 48,
    fontWeight: 'bold',
    marginVertical: 20,
  },
});

export default Index;
