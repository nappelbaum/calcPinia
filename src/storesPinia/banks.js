import { defineStore } from 'pinia'
import PostService from '@/API/PostService'
import creditsSort from '@/services/creditsSort'

export const useBanks = defineStore('banks', {
  state: () => ({
    banks: [],
    totalOffers: null,
    sort: '',
    singleCredit: {},
    banksLoadError: false,
    creditLoadError: false
  }),
  getters: {
    sortBanks: (state) => {
      const copyBanks = JSON.parse(JSON.stringify(state.banks))
      if (state.sort && state.sort === 'min') {
        creditsSort(copyBanks)
        return copyBanks
      }
      return state.banks
    }
  },
  actions: {
    /** получение данных о банках и кредитах с фильтрами по сумме, ставке и сроке кредита*/
    async fetchBanks(sum, rate, period) {
      const getBanks = await PostService.getBanks(sum, rate, period)

      if (getBanks) this.banks = getBanks
      else this.banksLoadError = true

      this.totalOffers = getBanks.reduce((acc, el) => acc + el.creditResultRows.length, 0)
    },
    /** запись условия сортировки*/
    setSort(sort) {
      this.sort = sort
    },
    /** получение данных о кредите по id для страницы кредита*/
    async fetchCredit(id) {
      const credit = await PostService.getCredit(id)
      if (credit) this.singleCredit = credit
      else this.creditLoadError = true
    }
  }
})
