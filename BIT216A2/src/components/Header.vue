<template>
  <div style="height:50px;">
    <header style="width:100%;">
    <div v-if="isLogin">
      <router-link style="margin-right:30px;" to="/homepage">
        <h1 >Home</h1>
      </router-link>
      <router-link style="margin-right:30px;" to="/home">
        <h1>Dashboard</h1>
      </router-link>
      <h1 @click="logout" style="margin-right:30px;">Log Out</h1>
    </div>
    <div v-else>
      <route-link style="margin-right:30px;" to="/homepage">
        <h1 @click="toHome">Home</h1>
      </route-link>
      <router-link style="margin-right:30px;" to="signup">
        <h1>Log In</h1>
      </router-link>
      <router-link style="margin-right:30px;" to="login">
        <h1>Sign Up</h1>
      </router-link>
    </div>
  </header>
  </div>
  
</template>
<script>
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import router from '../router'
import {localGet,localSet } from '../utils/index.js'
export default defineComponent({
  setup() {
    const state=reactive({
      isLogin:false
    })
    onMounted(()=>{
      
      state.isLogin=localGet('isLogin')
    })
    const logout=()=>{
      state.isLogin=false
      localSet('isLogin',false)
      router.push('/signup')
    }
    const toHome=()=>{
      router.push("/homepage")
    }
    return {
      ...toRefs(state),
      logout,
      toHome
    }
  },
})
</script>
<style scoped>
header{
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
header  div{
  width:100%;
  height:100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
}
a{
  text-decoration: none;
  color:black
}
h1{
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>

