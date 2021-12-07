<template>
  <div class="about">
    <h1>Upload</h1>
    <div>
      <input v-on:change="setFile" placeholder="user name" type="file" />
    </div>

    <button @click="submit">submit</button>
    <button @click="submitImage">submit image</button>
  </div>
</template>
<script lang="ts">
import { Vue } from 'vue-class-component'
import gql from 'graphql-tag'
import {
  Mutation,
  MutationImageAddArgs,
  MutationUploadArgs,
} from '@/generated/graphql'
export default class Upload extends Vue {
  file = null
  setFile(e: any): void {
    console.log(e)
    this.file = e.target?.files?.[0] || null
  }
  async submit() {
    const res = await this.$apollo.mutate<
      Pick<Mutation, 'upload'>,
      MutationUploadArgs
    >({
      mutation: gql`
        mutation ($file: Upload!) {
          upload(file: $file)
        }
      `,
      variables: {
        file: this.file,
      },
    })
  }
  async submitImage() {
    const res = await this.$apollo.mutate<
      Pick<Mutation, 'imageAdd'>,
      MutationImageAddArgs
    >({
      mutation: gql`
        mutation ($data: ImageInputGraphQL!) {
          imageAdd(data: $data)
        }
      `,
      variables: {
        data: {
          laptopId: 1,
          file: this.file,
        },
      },
    })
  }
}
</script>
<style>
button {
  background: #2c3e50;
  border-radius: 3px;
  border-width: 0;
  color: white;
}
input {
  margin-bottom: 10px;
}
</style>
