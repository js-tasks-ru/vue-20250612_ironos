import { defineComponent,computed,toRef } from 'vue'
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
    const weatherItem = toRef(()=>props.weatherItem)

    function tempConvert(){
      const K = 273.15;
      return (weatherItem.value.current.temp - K).toFixed(1);
    }

    function pressureConvert(){
      const koeff = 1/0.75;
      return Math.round(weatherItem.value.current.pressure/koeff);
    }

    const weatherTemp = computed(()=>tempConvert())

    const weatherIsNight = computed(()=>{
      return weatherItem.value.current.dt < weatherItem.value.current.sunrise ||
          weatherItem.value.current.dt > weatherItem.value.current.sunset
    })

    const weatherDetails = computed(()=> [
      {
        label: 'Давление',
        measure: 'мм рт. ст.',
        value: pressureConvert()
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
    ])

    return {
      tempConvert,
      pressureConvert,
      WeatherConditionIcons,
      weatherDetails,
      weatherTemp,
      weatherIsNight
    }
  },
  template: `
    <li class="weather-card" :class="{'weather-card--night':weatherIsNight}">
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
