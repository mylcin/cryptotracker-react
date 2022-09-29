import { Box, LinearProgress, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "tss-react/mui";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import { numberWithCommas } from "../config/data";
import { CryptoState } from "../context/CryptoContext";
import parse from "html-react-parser";

const useStyles = makeStyles()((theme) => ({
  container: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  sidebar: {
    width: "30%",
    borderRight: "2px solid grey",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      borderRight: "none",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Montserrat",
  },
  description: {
    width: "100%",
    fontFamily: "Montserrat",
    fontSize: "14px",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  },
  marketData: {
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "start",
    },
  },
}));

function CoinPage() {
  const { classes } = useStyles();
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();

  useEffect(() => {
    const fetchCoin = async () => {
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
    };
    fetchCoin();
  }, [id]);

  return (
    <>
      <Box className={classes.container}>
        {!coin ? (
          <LinearProgress style={{ backgroundColor: "#24ae8f" }} />
        ) : (
          <>
            <Box className={classes.sidebar}>
              <img
                src={coin?.image.large}
                alt={coin?.name}
                height="200"
                style={{ marginBottom: 20 }}
              />
              <Typography variant="h3" className={classes.heading}>
                {coin?.name}
              </Typography>
              <Typography className={classes.description}>
                {parse(coin?.description.en)}
              </Typography>
              <Box className={classes.marketData}>
                <span style={{ display: "flex" }}>
                  <Box className={classes.heading}>Rank:</Box>
                  &nbsp; &nbsp;
                  <Box
                    style={{
                      fontFamily: "Montserrat",
                    }}
                  >
                    {numberWithCommas(coin?.market_cap_rank)}
                  </Box>
                </span>

                <span style={{ display: "flex" }}>
                  <Box className={classes.heading}>Current Price:</Box>
                  &nbsp; &nbsp;
                  <Box
                    style={{
                      fontFamily: "Montserrat",
                    }}
                  >
                    {numberWithCommas(
                      coin?.market_data.current_price[currency.toLowerCase()]
                    )}{" "}
                    {symbol}
                  </Box>
                </span>
                <span style={{ display: "flex" }}>
                  <Box className={classes.heading}>Market Cap:</Box>
                  &nbsp; &nbsp;
                  <Box
                    style={{
                      fontFamily: "Montserrat",
                    }}
                  >
                    {numberWithCommas(
                      coin?.market_data.market_cap[
                        currency.toLowerCase()
                      ].toString()
                    )}{" "}
                    {symbol}
                  </Box>
                </span>
              </Box>
            </Box>
            <CoinInfo coin={coin} />
          </>
        )}
      </Box>
    </>
  );
}

export default CoinPage;
