import { mockCountries } from "../seeds/mockCountries.js";
export const countryAction = {
  async getCountries({ commit }) {
    try {
      const resCountries = await fetch("https://api.covid19api.com/summary", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (resCountries.status === 200) {
        const resJson = await resCountries.json();
        /**Because the covid19api API limits the number of requests,
         * in order to avoid the case when the call fails, 
         * a mock data was created. It will not be allowed to use this case for the actual project */
        commit("setCountries", resJson.Countries || mockCountries);
      }
    } catch (error) {
      commit("setError", error);
    }
  },

  async getCountry({ commit }, countryCode) {
    try {
      const resCountry = await fetch(
        `https://restcountries.com/v3.1/alpha/${countryCode}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return resCountry.status === 200 && resCountry.json();
    } catch (error) {
      commit("setError", error);
    }
  },
};
