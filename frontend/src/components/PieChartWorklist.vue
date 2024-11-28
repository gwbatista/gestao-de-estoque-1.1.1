<template>
  <div style="width: 400px; height: 400px;">
    <template v-if="selectedChartType === 'pie'">
      <Pie :data="data" :options="options" />
    </template>
    <template v-else-if="selectedChartType === 'bar'">
      <BarChart :data="data" :options="options" />
    </template>
  </div>
</template>

<script>
  import { Chart as ChartJS, ArcElement, Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale } from 'chart.js'
  import { Pie, Bar } from 'vue-chartjs'
  import * as chartConfig from '../util/chartConfigWorklist'

  ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

  export default {
    name: 'App',
    components: {
      Pie,
      BarChart: Bar
    },
    props: {
      selectedChartType: String, // Recebe o tipo de gráfico selecionado
    },
    data() {
      return chartConfig
    }
  }
</script>

<style scoped>
/* Estilos personalizados, se necessário */
</style>