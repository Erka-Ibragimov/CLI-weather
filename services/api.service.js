import axios from "axios";
import { getKeyValue, TOKEN_DICTIONARY } from "./storate.service.js";

const getWeather = async (city) => {
  const token =
    process.env.TOKEN ?? (await getKeyValue(TOKEN_DICTIONARY.token));
  if (!token) {
    throw new Error(
      "Не задан ключ API, задайте его через команду -t [API_KEY]"
    );
  }

  const url = new URL("https://api.openweathermap.org/data/2.5/weather");
  url.searchParams.append("q", city);
  url.searchParams.append("appid", token);
  url.searchParams.append("lang", "ru");
  url.searchParams.append("units", "metric");

  const config = {
    method: "get",
    proxy: {
      protocol: "http",
      host: "10.8.88.22",
      port: 8080,
    },
    url: url.href,
  };

  const { data } = await axios(config);
  // .then((res) => {
  //   const data = res.data;
  //   // console.log(data);
  // })
  // .catch((err) => console.log(err));
  return data;
};
export { getWeather };
