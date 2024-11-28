import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#ffffff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    width: "90%",
    fontSize: 18,
    backgroundColor: "#ffffff",
    color: "#333",
  },
  dropdownContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    marginBottom: 20,
  },
  currencyButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#81C784",
    padding: 12,
    marginHorizontal: 5,
    borderRadius: 8,
  },
  currencyButtonText: {
    fontSize: 16,
    color: "#ffffff",
    marginLeft: 8,
  },
  swapButton: {
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 50,
    marginHorizontal: 5,
  },
  swapText: {
    fontSize: 22,
    color: "#4CAF50",
    fontWeight: "bold",
  },
  result: {
    fontSize: 22,
    marginTop: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    color: "#333",
  },
  currencyItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },
  currencyText: {
    fontSize: 18,
    color: "#333",
    marginLeft: 8,
  },
  flagIcon: {
    width: 32,
    height: 32,
  },
  flagIconSmall: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  convertButton: {
    backgroundColor: "#81C784",
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: "90%",
    alignItems: "center",
  },
  convertButtonText: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "bold",
  },
  
});

export default styles;
