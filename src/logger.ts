import * as chalk from 'chalk';

class logger {
  public caller: string = 'Generator';

  public log(...params: any): void {
    console.log(...params);
  }

  public currentTime(): string {
    const date = new Date();
    return date.toLocaleTimeString();
  }

  public warning(message: string, ...params: any): void {
    if (!params || params.length < 1) {
      this.log(
        chalk.default.bgYellow(`${chalk.default.black(`[${this.caller}]`)}`),
        `${this.currentTime()} -`,
        message
      );
    } else {
      this.log(
        chalk.default.bgYellow(`${chalk.default.black(`[${this.caller}]`)}`),
        `${this.currentTime()} -`,
        message,
        params[0],
        params[1]
      );
    }
  }
  public error(message: string, ...params: any): void {
    if (!params || params.length < 1) {
      this.log(
        chalk.default.bgRed(`${chalk.default.black(`[${this.caller}]`)}`),
        `${this.currentTime()} -`,
        message
      );
    } else {
      this.log(
        chalk.default.bgRed(`${chalk.default.black(`[${this.caller}]`)}`),
        `${this.currentTime()} -`,
        message,
        params[0],
        params[1]
      );
    }
  }
  public success(message: string, ...params: any): void {
    if (!params || params.length < 1) {
      this.log(
        chalk.default.bgGreen(`${chalk.default.black(`[${this.caller}]`)}`),
        `${this.currentTime()} -`,
        message
      );
    } else {
      this.log(
        chalk.default.bgGreen(`${chalk.default.black(`[${this.caller}]`)}`),
        `${this.currentTime()} -`,
        message,
        params[0],
        params[1]
      );
    }
  }
  public gray(content: string): string {
    return chalk.default.gray(content);
  }
}

const Logger = new logger();
export default Logger;
