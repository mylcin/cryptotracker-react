import {
  AppBar,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  Container,
  Box,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { makeStyles } from "tss-react/mui";
import { CryptoState } from "../context/CryptoContext";

/*css styles*/
const useStyles = makeStyles()(() => ({
  title: {
    flex: 1,
    color: "#24ae8f",
    fontFamily: "Montserrat",
    fontWeight: "bold",
  },
  select: {
    width: 100,
    height: 40,
  },
}));

function Navbar() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { currency, setCurrency } = CryptoState();

  return (
    <Box>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              onClick={() => navigate("/")}
              className={classes.title}
              variant={"h6"}
            >
              <Link color="#fff" href="/">
                Crypto Hünkar
              </Link>
            </Typography>
            <Select
              variant="outlined"
              value={currency}
              className={classes.select}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"TRY"}>TRY</MenuItem>
              <MenuItem value={"EUR"}>EUR</MenuItem>
              <MenuItem value={"USD"}>USD</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default Navbar;
