<script setup>
// Вместо <span> должен быть <RouterLink> или <a>
// Используйте динамический компонент <component :is="...">
import {ref} from 'vue'

const props = defineProps({
  to: {
    type: [String,Object]
  },
  href: {
    type: String
  }
})

const componentName = ref('a')
if(props.to) {
  componentName.value = 'RouterLink'
}
</script>

<template>
  <component :is="componentName" :to="to" :href="href"><slot/></component>
</template>

<style scoped>
.link {
  color: var(--color-text-primary);
}

.link:hover {
  text-decoration: underline;
}
</style>
