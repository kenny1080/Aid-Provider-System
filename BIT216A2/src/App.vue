<template>
  <div class="app-container">
    <router-view />
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { localSet } from './utils'

export default defineComponent({
  setup() {
    const state=reactive({

    })
    onMounted(()=>{
      localSet("isLogin",false)
      localSet('userList',[{username: 'admin',password:'123456'}])
    })
    return {
      ...toRefs(state)
    }
  },
})
</script>
<style scoped>
</style>

