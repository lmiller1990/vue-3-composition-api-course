<template>
  <div class="field">
    <label class="label">
      {{ label }}
    </label>
    <div class="control">
      <input 
        :type="type" 
        :name="name"
        @input="handleInput"
        @keyup="handleValidation"
        :value="value"
        class="input"
      />
    </div>

    <span>
      <p v-if="!validity.valid" class="help is-danger">{{ validity.message }}</p>
    </span>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import debounce from 'lodash/debounce'

import { Rule, Status, validate } from './validate'

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },

    value: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    label: {
      type: String,
      required: true,
    },

    rules: {
      type: Array as () => Rule[],
      default: () => []
    }
  },

  setup(props, ctx) {
    const validity = reactive<Status>({
      valid: true,
      message: undefined
    })

    const handleInput = (e: any) => {
      ctx.emit('update:value', e.target.value)
    }

    const handleValidation = debounce(() => {
      const result = validate({ value: props.value, rules: props.rules })
      validity.valid = result.valid
      validity.message = result.message
      ctx.emit('validate', {
        name: props.name,
        valid: result.valid,
      })
    }, 500)

    return {
      handleInput,
      handleValidation,
      validity,
    }
  }
})
</script>