<template>
  <button @click="loadData">Load profile data</button>
  {{ JSON.stringify(profileData) }}
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { Query } from '@/generated/graphql'
import gql from 'graphql-tag'
export default class Profile extends Vue {
  profileData: any = {}
  async loadData() {
    const res = await this.$apollo.query<Pick<Query, 'userMe'>>({
      query: gql`
        query {
          userMe {
            userName
            createdAt
          }
        }
      `,
      context: {
        /* headers: {
          Authorization: this.$store.state.token,
        },*/
      },
    })
    this.profileData = res.data.userMe
  }
}
</script>

<style scoped></style>
