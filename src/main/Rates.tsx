import { LinearProgress, Paper } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { CurrencyContext } from "../App";
import { mainService } from "../shared/main.service";
import { rateStyles } from "./rates.style";
const currencyToSymbolMap = require("currency-symbol-map/map");

interface Props {
  baseCurrency: string;
}

const Rates: React.FC<Props> = (props: Props) => {
  const classes = rateStyles();
  const currencies: any = useContext(CurrencyContext);
  const [rates, setRates] = useState<any>([]);
  const [inProgress, setInProgress] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (props.baseCurrency && currencies.length > 0) {
      setInProgress(true);
      mainService.getLatestRates(props.baseCurrency).then((response: any) => {
        const latestRates = Object.keys(response.data).map((c: any) => {
          const currency = currencies.find((ccy: any) => ccy.code === c);
          return {
            code: c,
            name: currency?.name,
            rate: response.data[c],
            symbol: currencyToSymbolMap[c],
            decimal: currency?.decimal,
          };
        });
        setRates(latestRates);
        setInProgress(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.baseCurrency, currencies]);

  return (
    <div className={classes.container}>
      {inProgress && (
        <LinearProgress color="primary" className={classes.progress} />
      )}
      {rates.map((rate: any) => (
        <Paper
          key={rate.code}
          className={classes.item}
          elevation={4}
          onClick={() => history.push(`/${rate.code}`)}
        >
          <div className={classes.rate}>
            <div>{rate.code}</div>
            <span style={{ flexGrow: 1 }}></span>
            <div>
              {rate.rate.toFixed(rate.decimal)}&nbsp;&nbsp;{rate.symbol}
            </div>
          </div>
          <span style={{ flexBasis: 10 }}></span>
          <div>{rate.name}</div>
        </Paper>
      ))}
    </div>
  );
};

export default Rates;
