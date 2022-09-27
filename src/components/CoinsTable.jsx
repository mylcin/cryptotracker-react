import {
  Container,
  LinearProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "tss-react/mui";
import axios from "axios";
import { useEffect, useState } from "react";
import { CoinList } from "../config/api";
import { CryptoState } from "../context/CryptoContext";
import { numberWithCommas } from "../config/data";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles()(() => ({
  container: {
    textAlign: "center",
    border: "1px solid grey",
  },
  row: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#131111",
    },
    fontFamily: "Montserrat",
  },
  pagination: {
    "& .MuiPaginationItem-root": {
      color: "#24ae8f",
    },
  },
}));

function CoinsTable() {
  const { classes } = useStyles();
  const { currency, symbol } = CryptoState();
  const navigate = useNavigate();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };
  const handleChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);
      const { data } = await axios.get(CoinList(currency));
      setCoins(data);
      setLoading(false);
    };
    fetchCoins();
  }, [currency]);

  return (
    <Container className={classes.container}>
      <Typography variant="h4" style={{ margin: 16, fontFamily: "Montserrat" }}>
        Cryptocurrency Prices by Market Cap
      </Typography>
      {/*search*/}
      <TextField
        value={search}
        label="Search"
        variant="outlined"
        style={{ marginBottom: 20, width: "100%" }}
        onChange={handleChange}
      />
      <TableContainer>
        {loading ? (
          <LinearProgress style={{ backgroundColor: "#24ae8f" }} />
        ) : (
          <Table style={{ borderCollapse: "separate" }}>
            {/*table header titles*/}
            <TableHead style={{ backgroundColor: "#24ae8f" }}>
              <TableRow>
                {["Name", "Price", "24h Change", "Market Cap"].map((head) => (
                  <TableCell
                    style={{
                      fontFamily: "Montserrat",
                    }}
                    key={head}
                    align={head === "Name" ? "left" : "right"}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {/*table body*/}
            <TableBody>
              {handleSearch()
                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map((row) => {
                  let profit = row.price_change_percentage_24h >= 0;
                  return (
                    <TableRow
                      key={row.id}
                      className={classes.row}
                      onClick={() => navigate(`/coins/${row.id}`)}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          display: "flex",
                          gap: 15,
                        }}
                      >
                        <img
                          src={row?.image}
                          alt={row.name}
                          height="50"
                          width="50"
                          style={{ marginBottom: 10 }}
                        />
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <span
                            style={{
                              textTransform: "uppercase",
                              fontSize: 22,
                            }}
                          >
                            {row.symbol}
                          </span>
                          <span style={{ color: "darkgrey" }}>{row.name}</span>
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        <span style={{ paddingRight: "4px" }}>
                          {numberWithCommas(row.current_price)}
                        </span>
                        {symbol}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                          fontWeight: 500,
                        }}
                      >
                        {profit && "+"}
                        {row.price_change_percentage_24h.toFixed(2)}%
                      </TableCell>
                      <TableCell align="right">
                        <span style={{ paddingRight: "4px" }}>
                          {numberWithCommas(row.market_cap)}
                        </span>
                        {symbol}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      {/*pages*/}
      <Pagination
        style={{
          padding: 20,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        classes={{ ul: classes.pagination }}
        onChange={(_, value) => {
          setPage(value);
          window.scroll(0, 450);
        }}
        count={parseInt(handleSearch().length / 10)}
      />
    </Container>
  );
}

export default CoinsTable;
