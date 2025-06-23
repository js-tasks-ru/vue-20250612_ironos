import { defineComponent,ref, computed } from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    const operandLeft = ref(0),
          operandRight = ref(0),
          operator = ref('sum'),
          result = computed(()=>{
            switch (operator.value) {
              case 'sum':
                return operandLeft.value + operandRight.value
                break;
              case 'subtract':
                return operandLeft.value - operandRight.value
                break;
              case 'multiply':
                return operandLeft.value * operandRight.value
                break;
              case 'divide':
                return operandLeft.value / operandRight.value
                break;
              default:
                return 0
            }
          });

    return {
      operandLeft,
      operandRight,
      operator,
      result
    }
  },

  template: `
    <div class="calculator">
      <input type="number" aria-label="First operand" v-model="operandLeft" />

      <div class="calculator__operators">
        <label><input type="radio" name="operator" value="sum" v-model="operator"/>➕</label>
        <label><input type="radio" name="operator" value="subtract" v-model="operator"/>➖</label>
        <label><input type="radio" name="operator" value="multiply" v-model="operator"/>✖</label>
        <label><input type="radio" name="operator" value="divide" v-model="operator"/>➗</label>
      </div>

      <input type="number" aria-label="Second operand" v-model="operandRight" />

      <div>=</div>

      <output>{{ result }}</output>
    </div>
  `,
})
