interface IConfig {
  localurl: string;
  productionUrl: string;
}

export const config: IConfig = {
  localurl: "http://localhost:3000",
  productionUrl: "http://65.0.106.45:3000"
}