import { defineComponent } from 'vue'
import { UiButton } from '@shgk/vue-course-ui'
import './UiCounter.css'

export default defineComponent({
  name: 'UiCounter',

  components: {
    UiButton,
  },

  props: {
    count: {
      type: Number,
      required: true
    },
    min: {
      type: Number,
      required: false,
      default: ()=>{return 0}
    },
    max: {
      type: Number,
      required: false,
      default: ()=>{return Infinity}
    }
  },

  emits:['update:count'],

  setup(props, { emit }) {
    // Рекомендуется для практики реализовать обработку событий внутри setup, а не непосредственно в шаблоне
    function changeCount(operator){
      const currentCount = props.count
      const newCount = operator == 'inc' ? currentCount + 1  : currentCount - 1;
      emit('update:count',newCount)
    }

    return {
      changeCount
    }
  },

  template: `
    <div class="counter">
      <UiButton aria-label="Decrement" :disabled="count == min" @click="changeCount('dec')">➖</UiButton>
      <span class="count" data-testid="count">{{ count }}</span>
      <UiButton aria-label="Increment" :disabled="count == max" @click="changeCount('inc')">➕</UiButton>
    </div>
  `,
})
