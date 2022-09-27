import { makeStyles } from "tss-react/mui";

function CoinInfoButton({ children, selected, onClick }) {
  const useStyles = makeStyles()((theme) => ({
    selectbutton: {
      border: "1px solid #24ae8f",
      borderRadius: 8,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      textAlign: "center",
      fontFamily: "Montserrat",
      cursor: "pointer",
      backgroundColor: selected ? "#24ae8f" : "",
      fontWeight: 500,
      "&:hover": {
        backgroundColor: "#24ae8f",
      },
      width: "22%",
      [theme.breakpoints.down("sm")]: {
        fontSize: "12px",
      },
    },
  }));
  const { classes } = useStyles();

  return (
    <span onClick={onClick} className={classes.selectbutton}>
      {children}
    </span>
  );
}

export default CoinInfoButton;
