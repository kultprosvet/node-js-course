<template>
  <button @click="loadData">Query</button>
  <div>{{ msg }}</div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'

import { Query } from '@/generated/graphql'
import gql from 'graphql-tag' // @ is an alias to /src

export default class HelloWorld extends Vue {
  msg = ''
  async loadData() {
    const res = await this.$apollo.query<Pick<Query, 'helloWorld'>>({
      query: gql`
        query {
          helloWorld
        }
      `,
    })

    this.msg = res.data.helloWorld || ''

    // const data: Query['helloWorld'] = res?.data?.helloWorld
  }
}
</script>
