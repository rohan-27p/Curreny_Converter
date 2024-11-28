import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Modal, Image, ActivityIndicator } from "react-native";
import styles from "./styles";
import currencyToCountry from "./currencyToCountry";

const API_BASE_URL = "https://v6.exchangerate-api.com/v6/435928af75ba208f4c00a7ba/latest";

const App = () => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [exchangeRate, setExchangeRate] = useState(1);
  const [currency, setCurrency] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFromCurrencyModalVisible, setFromCurrencyModalVisible] = useState(false);
  const [isToCurrencyModalVisible, setToCurrencyModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [convertedAmount, setConvertedAmount] = useState("");

  useEffect(() => {
    fetchCurrencies();
  }, []);

  useEffect(() => {
    updateExchangeRate();
  }, [fromCurrency, toCurrency]);

  const fetchCurrencies = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/USD`);
      const data = await response.json();
      setCurrency(Object.keys(data.conversion_rates));
      await updateExchangeRate();
    } catch (error) {
      alert("Error fetching currency data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateExchangeRate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/${fromCurrency}`);
      const data = await response.json();
      setExchangeRate(data.conversion_rates[toCurrency]);
    } catch (error) {
      alert("Error fetching exchange rate. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const filteredCurrencies = currency.filter((cur) =>
    cur.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const calculateConvertedAmount = () => {
    if (!amount || isNaN(amount)) return "Enter a valid amount";
    return (parseFloat(amount) * exchangeRate).toFixed(3);
  };

  const handleConvert = () => {
    const result = calculateConvertedAmount();
    setConvertedAmount(result);
  };

  const CurrencyModal = ({ visible, setVisible, setCurrency }) => (
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
                  uri: `https://flagsapi.com/${currencyToCountry[item]}/flat/64.png`,
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
        value={amount}
        onChangeText={(text) => setAmount(text)}
        placeholder="Enter amount"
        placeholderTextColor="#666"
        keyboardType="decimal-pad"
      />
      <View style={styles.dropdownContainer}>
        <TouchableOpacity
          onPress={() => setFromCurrencyModalVisible(true)}
          style={styles.currencyButton}
        >
          <Image
            style={styles.flagIconSmall}
            source={{
              uri: `https://flagsapi.com/${currencyToCountry[fromCurrency]}/flat/64.png`,
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
      <TouchableOpacity style={styles.convertButton} onPress={handleConvert}>
        <Text style={styles.convertButtonText}>Convert</Text>
      </TouchableOpacity>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text style={styles.result}>
          {convertedAmount && `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`}
        </Text>
      )}
      <CurrencyModal
        visible={isFromCurrencyModalVisible}
        setVisible={setFromCurrencyModalVisible}
        setCurrency={setFromCurrency}
      />
      <CurrencyModal
        visible={isToCurrencyModalVisible}
        setVisible={setToCurrencyModalVisible}
        setCurrency={setToCurrency}
      />
    </View>
  );
};

export default App;

