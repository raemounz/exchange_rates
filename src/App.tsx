import React, { createContext, useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Rates from "./main/Rates";
import History from "./main/history/History";
import { ThemeProvider } from "@material-ui/core";
import theme from "./shared/theme";
import Header from "./header/Header";
import { mainService } from "./shared/main.service";

export const CurrencyContext = createContext([]);

const App: React.FC = () => {
  const [currencies, setCurrencies] = useState<any>([]);
  const [baseCurrency, setBaseCurrency] = useState<any>();

  useEffect(() => {
    mainService.getCurrencies().then((response: any) => {
      setCurrencies(response.data);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CurrencyContext.Provider value={currencies}>
        <Router>
          <Header onCurrencyChange={setBaseCurrency} />
          <Switch>
            <Route path="/rates">
              <Rates baseCurrency={baseCurrency} />
            </Route>
            <Route path="/:ccy">
              {currencies.length > 0 && <History baseCurrency={baseCurrency} />}
            </Route>
            <Route exact path="/" render={() => <Redirect to="/rates" />} />
          </Switch>
        </Router>
      </CurrencyContext.Provider>
    </ThemeProvider>
  );
};

export default App;
