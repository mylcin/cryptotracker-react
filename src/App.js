import { makeStyles } from "tss-react/mui";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Footer from "./components/Footer";
import { Box } from "@mui/material";
import { lazy, Suspense } from "react";
const Home = lazy(() => import("./pages/Home"));
const CoinPage = lazy(() => import("./pages/CoinPage"));

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
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coins/:id" element={<CoinPage />} />
          </Routes>
        </Suspense>
        <Footer />
      </ThemeProvider>
    </Box>
  );
}

export default App;
