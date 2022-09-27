import { Box, Container, Typography } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import Carousel from "./Carousel";

/*css styles*/
const useStyles = makeStyles()(() => ({
  banner: {
    backgroundImage: "url(./banner.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    paddingTop: 25,
  },
  trending: {
    marginBottom: 15,
    fontFamily: "Montserrat",
    color: "white",
  },
  desc: {
    color: "darkgrey",
    textTransform: "capitalize",
    fontFamily: "Montserrat",
  },
  tagline: {
    display: "flex",
    flexDirection: "column",
    height: "40%",
    textAlign: "center",
    justifyContent: "center",
  },
  carousel: {
    display: "flex",
    alignItems: "center",
    height: "50%",
  },
}));

function Banner() {
  const { classes } = useStyles();
  return (
    <Box className={classes.banner}>
      {/*banner*/}
      <Container className={classes.bannerContent}>
        <Box className={classes.tagline}>
          <Typography variant="h3" className={classes.trending}>
            Trending Coins
          </Typography>
          <Typography variant="subtitle2" className={classes.desc}>
            Coins with a significant raise in 24h trading volume and a high
            number of transactions.
          </Typography>
        </Box>
        {/*carousel for trending coins*/}
        <Carousel />
      </Container>
    </Box>
  );
}

export default Banner;
