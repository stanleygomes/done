import boxen from "boxen";
import chalk from "chalk";
import figlet from "figlet";

export class Output {
  public static banner(subtitle: string): void {
    const title = figlet.textSync("Paul", {
      font: "Small",
      horizontalLayout: "default",
    });

    const content = `${chalk.cyan(title)}\n${chalk.dim(subtitle)}`;
    console.log(
      boxen(content, {
        borderColor: "cyan",
        padding: 1,
        margin: 1,
        title: "CLI",
      }),
    );
  }

  public static success(message: string): void {
    console.log(chalk.green(`✔ ${message}`));
  }

  public static info(message: string): void {
    console.log(chalk.blue(`ℹ ${message}`));
  }

  public static warning(message: string): void {
    console.log(chalk.yellow(`⚠ ${message}`));
  }

  public static error(message: string): void {
    console.error(chalk.red(`✖ ${message}`));
  }
}
