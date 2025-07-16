<script setup>
const props = defineProps({
  href: {
    type: String
  }
})
</script>

<template>
  <a :href="href"></a>
</template>

<style scoped>
.link {
  color: var(--color-text-primary);
}

.link:hover {
  text-decoration: underline;
}
</style>
