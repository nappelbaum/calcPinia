<script setup>
import { computed, ref } from 'vue'
import { useParams } from '@/storesPinia/params'
import ModalRow from './ModalRow.vue'
import sheduleSplit from '@/services/sheduleSplit'

const params = useParams()

const result = computed(() => params.result)

const show = ref(false)

const { result1, result2, result3 } = sheduleSplit(result.value.schedule, result.value.annMonts)
</script>

<template>
  <table class="w-100">
    <tr class="border-bottom border-secondary">
      <td>
        <div class="text-secondary">Дата</div>
      </td>
      <td>
        <div class="text-secondary">Остаток, ₽</div>
      </td>
      <td>
        <div class="text-secondary">Проценты, ₽</div>
      </td>
      <td>
        <div class="text-secondary">Погашено, ₽</div>
      </td>
      <td>
        <div class="text-secondary">Платеж, ₽</div>
      </td>
    </tr>

    <modal-row :result="result1" />

    <tr v-if="result2.length && !show" class="border-bottom border-body-tertiary">
      <td class="d-flex align-items-center">
        <button @click="show = true" @keydown.enter="show = true" class="d-flex bg-white drop-btn">
          <div class="text-primary fs-6 fw-bold">Показать ещё</div>
          <u-arrow-btn :show="show" />
        </button>
      </td>
    </tr>

    <modal-row v-if="show" :result="result2" />
    <modal-row :result="result3" />
  </table>
</template>

<style lang="scss" scoped>
td {
  vertical-align: middle;
  text-align: left;
  padding: 24px 6px;
  white-space: nowrap;
}

.drop-btn:focus {
  border: solid 1px #5a5a5a;
}
</style>
