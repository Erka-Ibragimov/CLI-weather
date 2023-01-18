import chalk from "chalk";
import dedent from "dedent-js";

const printError = (error) => {
  console.log(`${chalk.bgRed(" ERROR ")} ${error}`);
};

const printSuccess = (message) => {
  console.log(`${chalk.bgGreen(" Success ")} ${message}`);
};

const printHelp = () => {
  console.log(
    dedent`${chalk.bgCyan(" HELP ")} 
    "Без параметров - вывод погоды" 
    -s [CITY] для установки города 
    -h для вывода помощи 
    -t [API_KEY] для сохранения токена`
  );
};

const printWeather = (weather) => {
  console.log(
    dedent`
    ${chalk.bgRedBright(" Town ")} ${weather.name}
    ${chalk.bgGray(" Now ")} ${weather.weather[0].description}
    ${chalk.bgBlue(" Temperature ")} ${weather.main.temp}
    ${chalk.bgMagenta(" Feels like ")} ${weather.main.feels_like}
    ${chalk.bgYellow(" Visibility ")} ${weather.visibility}`
  );
};

export { printError, printSuccess, printHelp, printWeather };
