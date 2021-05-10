import { makeStyles, createStyles } from "@material-ui/core";

export const historyStyles = makeStyles(() =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
    },
    currency: {
      margin: "8px 48px",
      display: "flex",
      flexDirection: "column",
    },
    currencyCode: {
      fontWeight: "bold",
      fontSize: "1.2em",
      marginBottom: 4,
    },
    invalidCcy: {
      margin: "8px 48px",
    },
    tabs: {
      margin: "16px 48px",
    },
    tab: {
      textTransform: "none",
    },
    table: {
      width: 400,
      margin: "0 48px",
      position: "relative",
    },
    progress: {
      position: "absolute",
      top: 54,
      width: "100%",
    },
  })
);
