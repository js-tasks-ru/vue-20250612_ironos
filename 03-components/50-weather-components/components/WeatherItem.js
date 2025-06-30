import { defineComponent,toRef } from 'vue'
import { WeatherConditionIcons } from '.././weather.service.ts'
import WeatherAlert from './WeatherAlert'
import WeatherDetails from './WeatherDetails'

export default defineComponent({
  name: 'WeatherItem',

  props: {
    weatherItem: {
      type: Object,
      required: true
    }
  },

  components: {
    WeatherAlert,
    WeatherDetails
  },

  setup(props){
    function tempConvert(temp){
      const K = 273.15;
      return (temp - K).toFixed(1);
    }

    function pressureConvert(pressure){
      const koeff = 1/0.75;
      return Math.round(pressure/koeff);
    }

    const weatherItem = toRef(()=>props.weatherItem)

    const weatherDetails = [
      {
        label: 'Давление',
        measure: 'мм рт. ст.',
        value: pressureConvert(weatherItem.value.current.pressure)
      },
      {
        label: 'Влажность',
        measure: '%',
        value: weatherItem.value.current.humidity
      },
      {
        label: 'Облачность',
        measure: '%',
        value: weatherItem.value.current.clouds
      },
      {
        label: 'Ветер',
        measure: 'м/с',
        value: weatherItem.value.current.wind_speed
      }
    ]

    const weatherTemp = tempConvert(weatherItem.value.current.temp)

    return {
      tempConvert,
      pressureConvert,
      WeatherConditionIcons,
      weatherDetails,
      weatherTemp
    }
  },
  template: `
    <li class="weather-card">
      <WeatherAlert v-if="weatherItem.alert">
        {{ weatherItem.alert.sender_name }}: {{ weatherItem.alert.description }}
      </WeatherAlert>
      
      <div>
        <h2 class="weather-card__name">
          {{ weatherItem.geographic_name }}
        </h2>
        <div class="weather-card__time">
          {{ weatherItem.current.dt }}
        </div>
      </div>
      
      <div class="weather-conditions">
        <div class="weather-conditions__icon" :title="weatherItem.current.weather.description">
          {{ WeatherConditionIcons[weatherItem.current.weather.id] }}️
        </div>
        <div class="weather-conditions__temp">{{ weatherTemp }} °C</div>
      </div>
      
      <WeatherDetails :details="weatherDetails" />
    </li>
  `,
})
