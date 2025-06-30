import { defineComponent,computed } from 'vue'
import { getWeatherData } from './weather.service.ts'
import WeatherItem from './components/WeatherItem'
import './WeatherApp.css'

export default defineComponent({
  name: 'WeatherApp',

  components: {
    WeatherItem
  },

  setup(){
    const weatherItems = computed(()=>getWeatherData())

    function isNight(weatherItem){
      return weatherItem.current.dt < weatherItem.current.sunrise || weatherItem.current.dt > weatherItem.current.sunset;
    }

    return {
      weatherItems,
      isNight
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <WeatherItem v-for="weatherItem in weatherItems" :weatherItem :class="{'weather-card--night':isNight(weatherItem)}" />
      </ul>
    </div>
  `,
})
