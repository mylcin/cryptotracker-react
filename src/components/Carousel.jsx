import { makeStyles } from "tss-react/mui";
import axios from "axios";
import { TrendingCoins } from "../config/api";
import { CryptoState } from "../context/CryptoContext";
import { useState } from "react";
import { useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { numberWithCommas } from "../config/data";
import { Box } from "@mui/material";

/*css styles*/
const useStyles = makeStyles()(() => ({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    fontFamily: "Montserrat",
    textTransform: "uppercase",
    color: "white",
  },
}));

function Carousel() {
  const { classes } = useStyles();
  const { currency, symbol } = CryptoState();
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const fetchTrendingCoins = async () => {
      const { data } = await axios.get(TrendingCoins(currency));
      setTrending(data);
    };
    fetchTrendingCoins();
  }, [currency]);

  //trending coins items
  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;
    return (
      <Link to={`/coins/${coin.id}`} className={classes.carouselItem}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {numberWithCommas(coin?.current_price.toFixed(2))} {symbol}
        </span>
      </Link>
    );
  });

  return (
    <Box className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={2000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={{
          0: {
            items: 2,
          },
          512: {
            items: 4,
          },
        }}
        autoPlay
        items={items}
      />
    </Box>
  );
}

export default Carousel;
