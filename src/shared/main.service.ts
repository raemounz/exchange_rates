import axios from "axios";

class MainService {
  getCurrencies(): Promise<any> {
    return axios.get("http://localhost:3000/currencies");
  }

  getLatestRates(base: string): Promise<any> {
    return axios.get(`http://localhost:3000/latest?base=${base}`);
  }

  getHistorical(
    base: string,
    currency: string,
    timePeriod: number
  ): Promise<any> {
    return axios.get(
      `http://localhost:3000/historical?base=${base}&currency=${currency}&period=${timePeriod}`
    );
  }
}

export const mainService = new MainService();
