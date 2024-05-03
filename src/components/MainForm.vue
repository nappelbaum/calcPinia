<script setup>
import { computed, onMounted } from 'vue'
import { useParams } from '@/storesPinia/params'
import CalcResults from './CalcResults.vue'
import toString from '@/services/toString'
import toNumber from '@/services/toNumber'

const params = useParams()

const creditTerms = computed(() => params.creditTerms)
const currentCreditPeriod = computed(() => params.currentCreditPeriod)

const creditSum = computed(() => toString(params.creditSum))
const minMaxCreditSum = computed(() => params.minMaxCreditSum)
const creditRate = computed(() => params.creditRate)
const minMaxCreditRate = computed(() => params.minmaxCreditRate)

onMounted(() => {
  !creditTerms.value.length && params.fetchTerms()
  params.setBanks()
})
</script>

<template>
  <pre>{{}}</pre>

  <form @submit.prevent="" class="row mt-4 bg-white rounded-2 shadow-sm">
    <div class="calc col-lg p-4">
      <u-input
        title="Сумма кредита"
        name="sum"
        :data="{ value: creditSum, units: '₽' }"
        @setData="(sum) => params.setSum(toNumber(sum))"
        @setDebounceData="(sum) => params.setSumDeb(toNumber(sum))"
        :minmax="[toString(minMaxCreditSum.min) + ' ₽', toString(minMaxCreditSum.max) + ' ₽']"
        :max="minMaxCreditSum.max"
      />
      <u-input
        title="Ставка"
        name="rate"
        :data="{ value: creditRate, units: '%' }"
        @setData="(rate) => params.setRate(toNumber(rate))"
        @setDebounceData="(rate) => params.setRateDeb(toNumber(rate))"
        :minmax="['Ключевая ставка Банка России']"
        :max="minMaxCreditRate.max"
      />
      <u-dropdown
        :currentCreditPeriod="currentCreditPeriod"
        :creditTerms="creditTerms"
        @setCurrentCreditPeriod="(period) => params.setCurrentPeriod(period)"
      />
    </div>
    <div class="result col-lg p-4">
      <div class="bg-light rounded-2 p-4 pb-0">
        <h3 class="fs-4 fw-bold mb-3">Результаты расчета</h3>
        <calc-results />
        <h3 class="fs-4 fw-bold my-4">Получите реальные условия от банков</h3>
        <u-button color="blue" name="Заполнить анкету" disabled />
      </div>
    </div>
  </form>
</template>
