import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',
  setup(){
    function tempConvert(temp){
      const K = 273.15;
      return (temp - K).toFixed(1);
    }

    function pressureConvert(pressure){
      const koeff = 1/0.75;
      return Math.round(pressure/koeff);
    }

    function isNight(weatherItem){
      return weatherItem.current.dt < weatherItem.current.sunrise || weatherItem.current.dt > weatherItem.current.sunset;
    }

    return {
      weatherItems: getWeatherData(),
      WeatherConditionIcons: WeatherConditionIcons,
      tempConvert,
      pressureConvert,
      isNight
    }
  },
  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <li v-for="weatherItem in weatherItems" class="weather-card" :class="{'weather-card--night':isNight(weatherItem)}">
          <div v-if="weatherItem.alert" class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{ weatherItem.alert.sender_name }}: {{ weatherItem.alert.description }}.</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{ weatherItem.geographic_name }}
            </h2>
            <div class="weather-card__time">
              {{ weatherItem.current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="weatherItem.current.weather.description">{{ WeatherConditionIcons[weatherItem.current.weather.id] }}️</div>
            <div class="weather-conditions__temp">{{ tempConvert(weatherItem.current.temp) }} °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ pressureConvert(weatherItem.current.pressure) }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ weatherItem.current.humidity }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ weatherItem.current.clouds }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{ weatherItem.current.wind_speed }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
