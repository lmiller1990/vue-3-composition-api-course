<template>
  <div class="columns">
    <div class="column is-one-third"></div>
    <div class="column is-one-third">
      <form class="form" @submit="handleSubmit">

        <div class="field">
          <div class="control">
            <label class="label" for="email">
              Email
            </label>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <input 
              id="email"
              class="input"
              name="email"
              type="text"
              label="Email"
              v-model="email"
            />
          </div>
        </div>

        <div class="field">
          <div class="control">
            <label class="label" for="password">
              Password
            </label>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <input 
              id="password"
              class="input"
              name="password"
              type="password"
              label="password"
              v-model="password"
            />
          </div>
        </div>

        <div class="field">
          <div class="control">
            <button 
              class="button is-primary"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>

      <p v-if="error" class="help is-danger">{{ error }}</p>
    </div>

    <div class="column is-one-third"></div>
  </div>
</template>

<script lang="ts">
import axios, { AxiosError } from 'axios'
import { defineComponent, ref, reactive } from 'vue'
import { useRouter } from '@posva/vue-router-next'

import { useStore } from '../store'
import { User } from '../types'

export default defineComponent({
  setup() {
    const password = ref('')
    const email = ref('')
    const error = ref<string | null>(null)

    const router = useRouter()
    const store = useStore()

    const handleSubmit = async (e: Event) => {
      e.preventDefault()
      try {
        const response = await axios.post<User>('/login', {
          email: email.value,
          password: password.value,
        })
        await store.signin(response.data)
        router.push('/')
      } catch (e) {
        const err = e as AxiosError 
        if (err.code === '401') {
          error.value = 'Email or password is incorrect.'
        }
      }
    }

    return {
      password,
      error,
      email,
      handleSubmit,
    }
  } 
})
</script>