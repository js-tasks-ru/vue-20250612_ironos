import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WeatherDetails',

  props: {
    details: {
      type: Array,
      required: true
    }
  },

  template: `
    <div class="weather-details">
      <div v-for="detail in details" class="weather-details__item">
        <div class="weather-details__item-label">{{ detail.label }}, {{ detail.measure }}</div>
        <div class="weather-details__item-value">{{ detail.value }}</div>
      </div>
    </div>  
  `,
})
