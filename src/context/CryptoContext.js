import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

const Crypto = createContext();

function CryptoContext({ children }) {
  const [currency, setCurrency] = useState(
    localStorage.getItem("pref") || "TRY"
  );
  const [symbol, setSymbol] = useState("₺");

  useEffect(() => {
    if (currency === "TRY") {
      localStorage.setItem("pref", "TRY");
      setSymbol("₺");
    } else if (currency === "USD") {
      localStorage.setItem("pref", "USD");
      setSymbol("$");
    } else if (currency === "EUR") {
      localStorage.setItem("pref", "EUR");
      setSymbol("€");
    }
  }, [currency]);
  const values = { currency, symbol, setCurrency };

  return <Crypto.Provider value={values}>{children}</Crypto.Provider>;
}
export default CryptoContext;

export const CryptoState = () => useContext(Crypto);
