import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Modal, Image } from "react-native";
import styles from "./styles";

const App = () => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [exchangeRate, setExchangeRate] = useState(1);
  const [currency, setCurrency] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFromCurrencyModalVisible, setFromCurrencyModalVisible] = useState(false);
  const [isToCurrencyModalVisible, setToCurrencyModalVisible] = useState(false);

  const currencyToCountry = {
    USD: "US",
    EUR: "EU",
    INR: "IN",
    GBP: "GB",
    AUD: "AU",
    CAD: "CA",
    JPY: "JP",
    CNY: "CN",
    AED: "AE",
    EGP: "EG",

    //mapping to fetch maps api for better ui while searching
  };

  const API_URL =
    "https://v6.exchangerate-api.com/v6/435928af75ba208f4c00a7ba/latest/USD";

  useEffect(() => {
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

    fetchCurrencies();
  }, []);

  const filteredCurrencies = currency.filter((cur) =>
    cur.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const convertCurrency =() => {
    if(!amount) return "";
    return (amount*exchangeRate).toFixed(3);
  };
  const swapCurrencies = async () => {
    const newFromCurrency = toCurrency;
    const newToCurrency = fromCurrency;
  
    setFromCurrency(newFromCurrency);
    setToCurrency(newToCurrency);
  
    try {
      const response=await fetch(
        `https://v6.exchangerate-api.com/v6/435928af75ba208f4c00a7ba/latest/${newFromCurrency}`
      );
      const data=await response.json();
      setExchangeRate(data.conversion_rates[newToCurrency]);
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
    }
  };
  
  
  const CurrencyModal=({ visible, setVisible, setCurrency }) => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.modalContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Currency"
          placeholderTextColor="#666"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
        <FlatList
          data={filteredCurrencies}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.currencyItem}
              onPress={() => {
                setCurrency(item);
                setVisible(false);
                setSearchQuery("");
              }}
            >
              <Image
                style={styles.flagIcon}
                source={{
                  uri:`https://flagsapi.com/${currencyToCountry[item]}/flat/64.png`,
                }}
              />
              <Text style={styles.currencyText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EZ Converter</Text>
      <TextInput
        style={styles.input}
        value={amount.toString()}
        onChangeText={(text) => setAmount(parseFloat(text) || "")}
        placeholder="Enter amount"
        placeholderTextColor="#666"
        keyboardType="decimal-pad"
      />
      <View style={styles.dropdownContainer}>
        <TouchableOpacity
          onPress={()=>setFromCurrencyModalVisible(true)}
          style={styles.currencyButton}
        >
          <Image
            style={styles.flagIconSmall}
            source={{
              uri:`https://flagsapi.com/${currencyToCountry[fromCurrency]}/flat/64.png`,
            }}
          />
          <Text style={styles.currencyButtonText}>{fromCurrency}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={swapCurrencies} style={styles.swapButton}>
          <Text style={styles.swapText}>⇄</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setToCurrencyModalVisible(true)}
          style={styles.currencyButton}
        >
          <Image
            style={styles.flagIconSmall}
            source={{
              uri: `https://flagsapi.com/${currencyToCountry[toCurrency]}/flat/64.png`,
            }}
          />
          <Text style={styles.currencyButtonText}>{toCurrency}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.result}>
        {amount && `${amount} ${fromCurrency} = ${convertCurrency()} ${toCurrency}`}
      </Text>

      {/* From Currency Modal */}
      <CurrencyModal
        visible={isFromCurrencyModalVisible}
        setVisible={setFromCurrencyModalVisible}
        setCurrency={setFromCurrency}
      />

      {/* To Currency Modal */}
      <CurrencyModal
        visible={isToCurrencyModalVisible}
        setVisible={setToCurrencyModalVisible}
        setCurrency={setToCurrency}
      />
    </View>
  );
};

export default App;
