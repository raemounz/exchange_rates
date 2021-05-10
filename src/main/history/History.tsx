import {
  IconButton,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { CurrencyContext } from "../../App";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { historyStyles } from "./history.style";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { mainService } from "../../shared/main.service";
import moment from "moment";
const currencyToSymbolMap = require("currency-symbol-map/map");

interface Props {
  baseCurrency: string;
}

const History: React.FC<Props> = (props: Props) => {
  const classes = historyStyles();
  const currencies: any = useContext(CurrencyContext);
  const location = useLocation();
  const history = useHistory();
  const [currency, setCurrency] = useState<any>(undefined);
  const [tab, setTab] = useState(1);
  const [rates, setRates] = useState<any>([]);
  const [inProgress, setInProgress] = useState(false);

  useEffect(() => {
    const ccy = location.pathname.substr(1);
    const _ccy = currencies.find((c: any) => c.code === ccy);
    if (_ccy) {
      _ccy.symbol = currencyToSymbolMap[_ccy.code];
    }
    setCurrency(_ccy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setInProgress(true);
    if (currency) {
      mainService
        .getHistorical(props.baseCurrency, currency?.code, tab)
        .then((response: any) => {
          setRates(response.data);
          setInProgress(false);
        });
    }
  }, [tab, props.baseCurrency, currency]);

  return (
    <div className={classes.container}>
      <div>
        <IconButton onClick={() => history.goBack()}>
          <ArrowBackIcon />
        </IconButton>
      </div>
      {currency ? (
        <div className={classes.currency}>
          <div className={classes.currencyCode}>{currency.code}</div>
          <div>{currency.name}</div>
        </div>
      ) : (
        <div className={classes.invalidCcy}>Invalid currency</div>
      )}
      {currency && (
        <>
          <div className={classes.tabs}>
            <ToggleButtonGroup
              color="primary"
              value={tab}
              exclusive
              onChange={(event: any, value: any) => setTab(value)}
            >
              <ToggleButton value={1}>
                <span className={classes.tab}>Today</span>
              </ToggleButton>
              <ToggleButton value={3}>
                <span className={classes.tab}>Last 3 days</span>
              </ToggleButton>
              <ToggleButton value={7}>
                <span className={classes.tab}>Last 7 days</span>
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          <TableContainer component={Paper} className={classes.table}>
            {inProgress && (
              <LinearProgress color="primary" className={classes.progress} />
            )}
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" width={200}>
                    Date
                  </TableCell>
                  <TableCell align="center" width={200}>
                    Exchange rate
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rates.map((rate: any) => (
                  <TableRow key={rate.date}>
                    <TableCell align="center">
                      {moment(rate.date).format("DD MMM YYYY")}
                    </TableCell>
                    <TableCell align="center">
                      {rate.rate?.toFixed(currency.decimal)}
                      {rate.rate && currency.symbol && `  ${currency.symbol}`}
                      {!rate.rate && "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  );
};

export default History;
