import { Box, Container, Link, Typography } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import TelegramIcon from "@mui/icons-material/Telegram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";

const useStyles = makeStyles()(() => ({
  box: {
    display: "flex",
    marginTop: "30px",
    backgroundColor: "#24ae8f",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },

  footer: {
    textAlign: "center",
    padding: "8px",
    marginTop: "auto",
  },
  logo: {
    fontWeight: "bold",
    fontSize: "1.4rem",
    fontFamily: "Montserrat",
    color: "white",
    marginBottom: "10px",
  },
  list: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  socialbox: {
    display: "flex",
    justifyContent: "center",
  },
  socialmedia: {
    display: "flex",
    width: "200px",
    justifyContent: "space-around",
    marginBottom: "8px",
  },
  icon: {
    "&:hover": {
      color: "#14161a",
    },
  },
  desc: {
    fontSize: "12px",
  },
}));

function Footer() {
  const { classes } = useStyles();
  return (
    <Box className={classes.box}>
      <Container className={classes.container}>
        <Box component="footer" className={classes.footer}>
          <Container maxWidth="md">
            <Typography className={classes.logo}>Crypto Hünkar</Typography>
            <Box className={classes.socialbox}>
              <Box className={classes.socialmedia}>
                <Link color="#fff" href="https://t.me/crypt1453">
                  <TelegramIcon className={classes.icon} />
                </Link>
                <Link color="#fff" href="#">
                  <FacebookIcon className={classes.icon} />
                </Link>
                <Link color="#fff" href="#">
                  <TwitterIcon className={classes.icon} />
                </Link>
              </Box>
            </Box>
            <Typography className={classes.desc}>
              {"© Crypto Hünkar "}
              {new Date().getFullYear()}
            </Typography>
          </Container>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
