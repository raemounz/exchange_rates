import React, { useContext, useEffect, useState } from "react";
import { AppBar, TextField, Toolbar } from "@material-ui/core";
import { useLocation } from "react-router";
import { CurrencyContext } from "../App";
import { Autocomplete } from "@material-ui/lab";
import { headerStyles } from "./header.style";

interface Props {
  onCurrencyChange: (currency: string) => void;
}

const Header: React.FC<Props> = (props: Props) => {
  const classes = headerStyles();
  const location = useLocation();
  const currencies = useContext(CurrencyContext);
  const [selectedBase, setSelectedBase] = useState("");

  useEffect(() => {
    const currency = localStorage.getItem("currency");
    if (currency) {
      setSelectedBase(currency);
    } else {
      setSelectedBase("SGD");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("currency", selectedBase);
    props.onCurrencyChange(selectedBase);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBase]);

  return (
    <AppBar position="static">
      <Toolbar>
        <div>
          {location.pathname === "/rates" ? "Currencies" : "Historical Rates"}
        </div>
        <span style={{ flexGrow: 1 }}></span>
        <span style={{ marginRight: 10 }}>Base:</span>
        <Autocomplete
          size="small"
          options={currencies.map((c: any) => c.code)}
          value={selectedBase}
          onChange={(event: any, value: any) => setSelectedBase(value)}
          style={{ width: 95 }}
          renderInput={(params) => <TextField {...params} variant="outlined" />}
          disableClearable={true}
          autoHighlight={true}
          classes={{
            popupIndicator: classes.indicator,
            input: classes.indicator,
          }}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
