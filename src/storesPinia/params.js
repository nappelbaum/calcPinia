import { defineStore } from 'pinia'
import PostService from '@/API/PostService'
import loanCalc from '@/services/loanCalc'
import { watchEffect } from 'vue'
import { useBanks } from './banks'

const start = {
  sum: 300000,
  rate: 16,
  minmax: { min: 5000, max: 100000000 },
  minmaxRate: { min: 1, max: 500 },
  period: { months: 60, name: '5 лет' }
}

export const useParams = defineStore('params', {
  state: () => ({
    creditTerms: [],
    creditSum: start.sum,
    minMaxCreditSum: start.minmax,
    creditRate: start.rate,
    minmaxCreditRate: start.minmaxRate,
    currentCreditPeriod: start.period,
    creditSumDebounce: start.sum,
    creditRateDebounce: start.rate
  }),
  getters: {
    result: (state) => {
      const { creditSum, creditRate, currentCreditPeriod } = state
      return loanCalc(creditSum, creditRate, currentCreditPeriod.months)
    }
  },
  actions: {
    /** получение данных о всех сроках кредита */
    async fetchTerms() {
      const getData = await PostService.getTerms()
      if (getData) {
        this.creditTerms = getData
      }
    },
    /** запуск action для получения списка банков в зависимости от суммы, ставки и срока кредита (сумма и ставка отслеживаются с применением debounce) */
    setBanks() {
      watchEffect(() => {
        const banks = useBanks()
        banks.fetchBanks(
          this.creditSumDebounce,
          this.creditRateDebounce,
          this.currentCreditPeriod.months
        )
      })
    },
    /** изменение текущего периода(срока) кредита*/
    setCurrentPeriod(term) {
      this.currentCreditPeriod = term
    },
    /** изменение суммы кредита*/
    setSum(sum) {
      if (sum > this.minMaxCreditSum.max) {
        this.creditSum = this.minMaxCreditSum.max
        return
      }
      this.creditSum = sum ? sum : 0
    },
    /** изменение ставки кредита*/
    setRate(rate) {
      if (rate > this.minmaxCreditRate.max) {
        this.creditRate = this.minmaxCreditRate.max
        return
      }
      this.creditRate = rate ? rate : 0
    },
    /** установка debounce-суммы кредита*/
    setSumDeb(sum) {
      this.creditSumDebounce = sum ? sum : 0
    },
    /** установка debounce-ставки кредита*/
    setRateDeb(rate) {
      this.creditRateDebounce = rate ? rate : 0
    }
  }
})
