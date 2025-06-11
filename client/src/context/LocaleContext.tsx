import { createContext } from "react";
import { useState, useEffect, useMemo } from "react";
import type { ReactNode, Dispatch, SetStateAction } from "react";
import axios from "axios";

interface LocaleType {
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
  convert: (usd: number, target: string) => number;
}

export const LocaleContext = createContext<LocaleType>({
  code: "USD",
  setCode: (): void => {
    throw new Error("Must use inside LocaleContext");
  },
  convert: (): number => {
    throw new Error("Must use inside LocaleContext");
  },
});

interface Rates {
  [currency: string]: number;
}

interface LocaleProviderProps {
  children: ReactNode;
}

export const LocaleProvider = ({ children }: LocaleProviderProps) => {
  const [code, setCode] = useState("USD");
  const [rates, setRates] = useState<Rates>({ USD: 1 });

  useEffect(() => {
    const getRates = async () => {
      const response = await axios.get("https://open.er-api.com/v6/latest/USD");
      return response.data.rates;
    };

    getRates().then((rates) => setRates(rates));
  }, []);

  const locale = useMemo(() => {
    const convert = (usd: number, target: string) => {
      return usd * rates[target];
    };

    return { code, setCode, convert };
  }, [code, rates]);

  return <LocaleContext value={locale}>{children}</LocaleContext>;
};
