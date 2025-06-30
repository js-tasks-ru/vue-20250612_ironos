import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EmailListItem',

  props: {
    email: {
      type: String,
      required: true,
    },

    marked: {
      type: Boolean,
      default: false,
    },
    index: {
      type: Number,
      required: true,
    }
  },

  emits:['click-remove'],

  template: `
    <li :class="{ marked }">
      {{ email }}
      <button type="button" aria-label="Удалить" @click.stop="$emit('click-remove')">❌</button>
    </li>
  `,
})
