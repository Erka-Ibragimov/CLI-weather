#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { getWeather } from "./services/api.service.js";
import {
  printHelp,
  printSuccess,
  printError,
  printWeather,
} from "./services/log.service.js";
import {
  getKeyValue,
  saveKeyValue,
  TOKEN_DICTIONARY,
} from "./services/storate.service.js";

const saveToken = async (token) => {
  if (!token.length) {
    printError("Не передан token");
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    return printSuccess("Token сохранен");
  } catch (error) {
    return printError(error.message);
  }
};

const saveCity = async (city) => {
  if (!city.length) {
    printError("Не передан city");
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    return printSuccess("City сохранен");
  } catch (error) {
    return printError(error.message);
  }
};

const initCLI = async () => {
  const args = getArgs(process.argv);
  if (args.h) {
    return printHelp();
  }
  if (args.s) {
    return saveCity(args.s);
  }
  if (args.t) { ///50c0dec07443d65c6595f7d2f6033a81
    return saveToken(args.t);
  }
  return await getForcast();
};

const getForcast = async () => {
  try {
    const weather = await getWeather(
      process.env.CITY ?? (await getKeyValue(TOKEN_DICTIONARY.city))
    );
    return printWeather(weather);
  } catch (error) {
    if (error?.response?.status == 404) {
      return printError("Неверно указан город");
    } else if (error?.response?.status == 401) {
      return printError("Неверно указан токен");
    } else {
      return printError(error.message);
    }
  }
};

initCLI();
