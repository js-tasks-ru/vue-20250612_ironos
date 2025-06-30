import { defineComponent,ref,onBeforeUnmount } from 'vue'

export default defineComponent({
  name: 'UiClock',
  props: {
    showClock: {
      type: Boolean,
      default: ()=>true
    }
  },

  setup(props) {
    const currentTime = ref(new Date().toLocaleTimeString(navigator.language, { timeStyle: 'medium' }))

    const interval = setInterval(()=>{
      currentTime.value = new Date().toLocaleTimeString(navigator.language, { timeStyle: 'medium' });
    },1000)

    onBeforeUnmount(()=>{clearInterval(interval)})

    return {
      currentTime
    }
  },

  template: `<div class="clock">{{ currentTime }}</div>`,
})
