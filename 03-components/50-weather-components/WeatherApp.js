import { defineComponent,ref } from 'vue'
import { getWeatherData } from './weather.service.ts'
import WeatherItem from './components/WeatherItem'
import './WeatherApp.css'

export default defineComponent({
  name: 'WeatherApp',

  components: {
    WeatherItem
  },

  setup(){
    const weatherItems = ref(getWeatherData())

    return {
      weatherItems
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <WeatherItem v-for="weatherItem in weatherItems" :weatherItem />
      </ul>
    </div>
  `,
})
