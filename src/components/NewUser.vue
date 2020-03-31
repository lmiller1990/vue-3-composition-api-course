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
      <ValidatorInput 
        name="password"
        type="text"
        label="password"
        v-model:value="password"
        :rules="[]"
        @validate="handleValidate"
      />
      <ValidatorInput 
        name="email"
        type="text"
        label="Email"
        v-model:value="email"
        :rules="[]"
        @validate="handleValidate"
      />
      <button 
        class="button is-primary"
        type="submit"
        :disabled="!formValid"
        >
        Submit
      </button>
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
    const password = ref('')
    const email = ref('')
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
      password,
      email,
      formValid,
      handleValidate
    }
  } 
})
</script>