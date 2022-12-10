import { countryState } from './state'
import { countryMutation } from './mutation'
import { countryAction } from './action'
import { countryGetters } from './getters'

export const countryModule = {
  namespaced: true,
  state: countryState,
  mutations: countryMutation,
  actions: countryAction,
  getters: countryGetters,
}