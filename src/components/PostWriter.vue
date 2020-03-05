<template>
  <div>
    <div class="columns">
      <div class="column">
        <div class="field">
          <div class="label">Title</div>
          <div class="control">
            <input v-model="title" type="text" class="input">
          </div>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column one-half">
        <div ref="contentEditable" id="markdown" contenteditable @input="handleEdit" />
      </div>

      <div class="column one-half">
        <div id="content" v-html="content" />
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <div class="buttons is-pulled-right">
          <button class="button is-primary" @click="handleSubmit">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue'
import * as marked from 'marked'
import { highlightAuto } from 'highlight.js'

import { Post } from '../types'

export default defineComponent({
  name: 'PostWriter',

  props: {
    post: {
      type: Object as () => Post,
      required: true
    }
  },

  setup(props, ctx) {
    const title = ref(props.post.title)
    const markdown = ref(props.post.markdown)
    const content = ref(props.post.content)
    const contentEditable = ref<HTMLDivElement | null>(null)

    onMounted(() => {
      const div = contentEditable.value
      if (!div) {
        throw Error('Content Editable not found')
      }

      div.innerText = props.post.markdown
    })

    const options: marked.MarkedOptions = {
      highlight: (code: string) => {
        return highlightAuto(code).value
      }
    }
    watch(() => markdown.value, (val) => {
      marked.parse(markdown.value, options, (err, res) => {
        if (err) {
          return
        }
        content.value = res
      })
    }, { immediate: true })

    const handleEdit = (e: any) => {
      if (!contentEditable.value) {
        return
      }
      markdown.value = contentEditable.value.innerText
    }

    const handleSubmit = () => {
      const post: Post = {
        ...props.post,
        title: title.value,
        content: content.value,
        markdown: markdown.value,
      }

      ctx.emit('submitted', post)
    }

    return {
      title,
      markdown,
      handleSubmit,
      content,
      handleEdit,
      contentEditable
    }
  }
})
</script>