import axios from "axios";
import { useEffect, useState } from "react";
import { CryptoState } from "../context/CryptoContext";
import { HistoricalChart } from "../config/api";
import { makeStyles } from "tss-react/mui";
import { CircularProgress, Box } from "@mui/material";
import { chartDays } from "../config/data";
import CoinInfoButton from "./CoinInfoButton";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

/*css styles*/
const useStyles = makeStyles()((theme) => ({
  container: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 0,
    },
  },
  buttons: {
    display: "flex",
    marginTop: 20,
    justifyContent: "space-around",
    width: "100%",
  },
}));

function CoinInfo({ coin }) {
  const { classes } = useStyles();
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      const { data } = await axios.get(
        HistoricalChart(coin.id, days, currency)
      );
      setFlag(true);
      setHistoricData(data.prices);
    };
    fetchHistoricalData();
  }, [coin.id, currency, days]);

  return (
    <Box className={classes.container}>
      {!historicData | !flag ? (
        <CircularProgress
          style={{ color: "#24ae8f" }}
          size={250}
          thickness={1}
        />
      ) : (
        <>
          <Line
            data={{
              labels: historicData.map((coin) => {
                let date = new Date(coin[0]);
                let hour =
                  date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
                let time =
                  date.getMinutes() > 9
                    ? `${hour}:${date.getMinutes()}`
                    : `${hour}:0${date.getMinutes()}`;

                return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: historicData.map((coin) => coin[1]),
                  label:
                    days === 1
                      ? `Price ( Past ${days} Day ) in ${currency}`
                      : `Price ( Past ${days} Days ) in ${currency}`,
                  borderColor: "#24ae8f",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
          <Box className={classes.buttons}>
            {chartDays.map((day) => (
              <CoinInfoButton
                key={day.value}
                selected={day.value === days}
                onClick={() => {
                  setDays(day.value);
                  if (days !== day.value) setFlag(false);
                }}
              >
                {day.label}
              </CoinInfoButton>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}
export default CoinInfo;
