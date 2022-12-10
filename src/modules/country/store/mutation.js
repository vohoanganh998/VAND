export const countryMutation = {
    setCountries(state, countries) {
      state.countries = countries;
    },
    setError(state, error) {
      state.error = error;
    },
}