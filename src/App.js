import { makeStyles } from "tss-react/mui";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CoinPage from "./pages/CoinPage";
import Home from "./pages/Home";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Footer from "./components/Footer";
import { Box } from "@mui/material";

const useStyles = makeStyles()(() => ({
  App: {
    backgroundColor: "#14161a",
    minHeight: "100vh",
    color: "white",
  },
}));

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const { classes } = useStyles();
  return (
    <Box className={classes.App}>
      <ThemeProvider theme={darkTheme}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </Box>
  );
}

export default App;
