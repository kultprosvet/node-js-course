<template>
  <div class="about">
    <h1>Login</h1>
    <div>
      <input v-model="username" placeholder="user name" />
    </div>
    <div>
      <input v-model="password" placeholder="password" />
    </div>
    <button @click="login">submit</button>
  </div>
</template>
<script lang="ts">
import { Vue } from 'vue-class-component'
import gql from 'graphql-tag'
import { Mutation, MutationUserLoginArgs } from '@/generated/graphql'
export default class Login extends Vue {
  username = ''
  password = ''
  async login() {
    const res = await this.$apollo.mutate<
      Pick<Mutation, 'userLogin'>,
      MutationUserLoginArgs
    >({
      mutation: gql`
        mutation ($data: UserRegisterInputGraphQL!) {
          userLogin(data: $data) {
            token
            user {
              id
              userName
              createdAt
            }
          }
        }
      `,
      variables: {
        data: {
          userName: this.username,
          password: this.password,
        },
      },
    })
    localStorage.setItem('token', res.data?.userLogin.token || '')
    this.$store.commit('setToken', res.data?.userLogin?.token || '')
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
