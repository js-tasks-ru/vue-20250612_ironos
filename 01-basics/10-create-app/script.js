import { defineComponent, createApp } from 'vue/dist/vue.esm-bundler'

const App = defineComponent({
  name: 'App',
  setup() {
    function formatAsLocalDate(date){
      return date.toLocaleString(navigator.language,{
        year: "numeric",
        month: "long",
        day: "numeric"
      })
    }

    return {
      now: new Date(),
      formatAsLocalDate
    };
  },
  template: `Сегодня {{ formatAsLocalDate(now) }}`
})

const app = createApp(App)
const vm = app.mount('#app')
