<template>
  <pre>
    {{ JSON.stringify(laptop, null, 2) }}}
  </pre>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import {
  LaptopGraphQl,
  Query,
  QueryLaptopArgs,
  Subscription,
  SubscriptionLaptopUpdatesByIdArgs,
} from '@/generated/graphql'
import gql from 'graphql-tag'
export default class LaptopDetails extends Vue {
  laptop: LaptopGraphQl | null | undefined = null
  subscription: any
  async created() {
    const data = await this.$apollo.query<
      Pick<Query, 'laptop'>,
      QueryLaptopArgs
    >({
      query: gql`
        query {
          laptop(id: 2) {
            model
            price
            description
            brand {
              id
              name
            }
          }
        }
      `,
    })

    this.laptop = data.data.laptop
    this.subscription = this.$apollo
      .subscribe<
        Pick<Subscription, 'laptopUpdatesById'>,
        SubscriptionLaptopUpdatesByIdArgs
      >({
        query: gql`
          subscription ($id: Int!) {
            laptopUpdatesById(id: $id) {
              model
              price
              description
              brand {
                id
                name
              }
            }
          }
        `,
        variables: {
          id: 2,
        },

        context: {
          connectionParams: {
            Authorization:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInVzZXJOYW1lIjoidGVzdF8zIiwiaWF0IjoxNjM4ODk4NzEyLCJleHAiOjE2NDE0OTA3MTJ9.lkruyPTQ5rxHU4CmqnYsUSk7d8EfSKf5lGccsk-Y6Jo',
          },
        },
      })
      .subscribe((v) => {
        this.laptop = v.data?.laptopUpdatesById
      })
  }
  unmounted(): void {
    this.subscription.unsubscribe()
  }
}
</script>

<style scoped></style>
