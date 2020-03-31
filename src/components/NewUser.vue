<template>
  <div class="columns">
    <div class="column is-one-third"></div>
    <div class="column is-one-third">
      <ValidatorInput 
        name="username"
        type="text"
        label="Username"
        v-model:value="username"
        :rules="usernameRules"
        @validate="handleValidate"
      />

    </div>
    <div class="column is-one-third"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'

import ValidatorInput from './ValidatorInput.vue'
import { minLength, maxLength } from './validate'

type Name = 'username' | 'password' | 'email'

interface ValidatedInput {
  name: Name
  valid: boolean
}

type FormValidationState = {
  [key in Name]: boolean
}

export default defineComponent({
  components: {
    ValidatorInput,
  },

  setup() {
    const username = ref('')
    const formValid = ref(false)
    const formValidationState = reactive<FormValidationState>({
      username: false,
      email: false,
      password: false,
    })

    const handleValidate = (validated: ValidatedInput) => {
      formValidationState[validated.name] = validated.valid
      formValid.value = Object.values(formValidationState).every(x => x)
    }

    return {
      usernameRules: [minLength(5), maxLength(10)],
      username,
      handleValidate
    }
  } 
})
</script>