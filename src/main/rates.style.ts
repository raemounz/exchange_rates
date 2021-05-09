import { makeStyles, createStyles } from "@material-ui/core";

export const rateStyles = makeStyles(() =>
  createStyles({
    container: {
      overflow: "auto",
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      padding: "16px",
      justifyContent: "center",
      position: "relative",
    },
    item: {
      width: 400,
      margin: 8,
      display: "flex",
      flexDirection: "column",
      padding: 16,
      "&:hover": {
        cursor: "pointer",
      },
    },
    rate: {
      display: "flex",
      flexDirection: "row",
      fontWeight: "bold",
      fontSize: "1.2em",
    },
    progress: {
      width: "100vw",
      position: "absolute",
      top: 0,
    },
  })
);
