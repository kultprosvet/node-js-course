import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { apolloProvider } from '@/graphql/graphqlProvider'
import { store } from '@/vuex/store'

const app = createApp(App)
app.use(apolloProvider)
app.use(router)
app.use(store)
app.mount('#app')
