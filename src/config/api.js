export const CoinList = (currency) =>
  `${process.env.REACT_APP_API}/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

export const SingleCoin = (id) =>
  `${process.env.REACT_APP_API}/${id}`;

export const HistoricalChart = (id, days = 365, currency) =>
  `${process.env.REACT_APP_API}/${id}/market_chart?vs_currency=${currency}&days=${days}`;

export const TrendingCoins = (currency) =>
  `${process.env.REACT_APP_API}/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;
