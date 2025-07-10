<script setup lang="ts">
import type { Slot } from 'vue'

withDefaults(defineProps<{
      for?: string | undefined,
      label?: string | undefined
      description?: string | undefined,
      hint?: string | undefined,
      showHint?: boolean,
      invalid?: boolean
    }>(),{
      showHint: false,
      invalid: false
    }
)

defineSlots<{
  default?: Slot,
  label?: Slot,
  description?: Slot
}>()
</script>

<template>
  <div class="form-group">
    <div class="form-group__label-wrapper">
      <label v-if="label || $slots.label" :for="for" class="form-group__label"><slot name="label">{{ label }}</slot></label>
      <div class="form-group__description"><slot name="description">{{ description }}</slot></div>
    </div>
    <div class="form-group__control"><slot name="default"></slot></div>
    <div v-if="hint" v-show="showHint || invalid" :class="{'form-group__hint': hint,'form-group__hint--invalid': invalid}">{{ (showHint || invalid) ? hint : '' }}</div>
  </div>
</template>

<style scoped>
/* _form-group.css */
.form-group {
}

.form-group__label-wrapper {
  margin-block-end: var(--spacing-small);
}

.form-group__label {
  display: block;
  font-size: var(--font-size-control);
}

.form-group__description {
  color: var(--color-dimmed);
}

.form-group__hint {
  font-size: var(--font-size-small);
  color: var(--color-dimmed);
  min-height: 1lh;

  &.form-group__hint--invalid {
    color: var(--color-danger);
  }
}
</style>
