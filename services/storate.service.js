import { homedir } from "os"; //applicationdata for window
import * as fs from "fs";
import {
  join,
  basename,
  dirname,
  extname,
  relative,
  isAbsolute,
  resolve,
  sep,
} from "path";

const filePath = join(homedir(), "weather-data.json");

const TOKEN_DICTIONARY = {
  token: "token",
  city: "city",
};

const saveKeyValue = async (key, value) => {
  let data = {};
  if (await isExist(filePath)) {
    const file = await fs.promises.readFile(filePath);
    data = JSON.parse(file);
  }
  data[key] = value;
  await fs.promises.writeFile(filePath, JSON.stringify(data));
};

const getKeyValue = async (key) => {
  if (await isExist(filePath)) {
    const file = await fs.promises.readFile(filePath);
    const data = JSON.parse(file);
    return data[key];
  }
  return undefined;
};

const isExist = async (path) => {
  try {
    await fs.promises.stat(path);
    return true;
  } catch (error) {
    return false;
  }
};
export { saveKeyValue, getKeyValue, TOKEN_DICTIONARY };

//   console.log(basename(filePath));
//   console.log(dirname(filePath));
//   console.log(extname(filePath));
//   console.log(relative(filePath, dirname(filePath)));
//   console.log(isAbsolute(filePath));
//   console.log(resolve(".."));
//   console.log(sep);
