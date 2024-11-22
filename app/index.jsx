import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Image } from "react-native";
import {Picker} from '@react-native-picker/picker'
const App = () => {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [exchangeRate, setExchangeRate] = useState(0);
  const [currency, setCurrency] = useState([]);

  const API_URL = "https://v6.exchangerate-api.com/v6/435928af75ba208f4c00a7ba/latest/USD";

  const fetchCurrencies = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setCurrency(Object.keys(data.conversion_rates));
      setExchangeRate(data.conversion_rates[toCurrency]);
    } catch (error) {
      console.error("Error fetching currencies:", error);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setExchangeRate(data.conversion_rates[toCurrency]);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };
    fetchExchangeRate();
  }, [toCurrency]);

  const convertCurrency = () => {
    return (amount * exchangeRate).toFixed(3);
  };

  return (
    <View style={styles.container}>
     {/* <Image source={require("./images/favicon.png")} style={styles.image} /> */}
      <Text style={styles.title}>EZ Converter</Text>
      <TextInput
        style={styles.input}
        value={amount.toString()}
        onChangeText={(text) => setAmount(parseFloat(text) || 1)}
        placeholder="Enter amount"
        keyboardType="numeric"
      />
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          selectedValue={fromCurrency}
          onValueChange={(itemValue) => setFromCurrency(itemValue)}
        >
          {currency.map((currency, idx) => (
            <Picker.Item key={idx} label={currency} value={currency} />
          ))}
        </Picker>
        <Picker
          style={styles.picker}
          selectedValue={toCurrency}
          onValueChange={(itemValue) => setToCurrency(itemValue)}
        >
          {currency.map((currency, idx) => (
            <Picker.Item key={idx} label={currency} value={currency} />
          ))}
        </Picker>
      </View>
      <Text style={styles.result}>
        {amount} {fromCurrency} = {convertCurrency()} {toCurrency}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: "80%",
    fontSize: 16,
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },
  picker: {
    flex: 1,
    height: 50,
    marginHorizontal: 10,
  },
  result: {
    fontSize: 25,
    marginTop: 20,
    fontWeight: "bold",
    color: "#1d3627",
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default App;
