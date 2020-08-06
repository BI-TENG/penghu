<template>
  <div id="app">
    <b-navbar toggleable="lg" type='light' variant='dark' class="fixed-top">
      <b-navbar-brand to="/">
        <b-img id="nav-img" :src="'./images/LOGO.png'"></b-img>
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
            <b-nav-item-dropdown font-awesome-icon:icon="['fas', 'place-of-worship']" text="景點探索" center>
            <b-dropdown-item to="/explore">景點美食</b-dropdown-item>
            <b-dropdown-divider class="d-md-none"></b-dropdown-divider>
            <b-dropdown-item to="/magong">馬公市</b-dropdown-item>
            <b-dropdown-divider class="d-md-none"></b-dropdown-divider>
            <b-dropdown-item to="huxi">湖西鄉</b-dropdown-item>
            <b-dropdown-divider class="d-md-none"></b-dropdown-divider>
            <b-dropdown-item to="wangan">望安鄉</b-dropdown-item>
            <b-dropdown-divider class="d-md-none"></b-dropdown-divider>
            <b-dropdown-item to="xiyu">西嶼鄉</b-dropdown-item>
            <b-dropdown-divider class="d-md-none"></b-dropdown-divider>
            <b-dropdown-item to="qimei">七美鄉</b-dropdown-item>
            <b-dropdown-divider class="d-md-none"></b-dropdown-divider>
            <b-dropdown-item to="baisha">白沙鄉</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item to="/activity"><font-awesome-icon :icon="['fas', 'horse']" /> 主題活動</b-nav-item>
          <b-nav-item v-if="user.length !== 0" to="/planning"><font-awesome-icon :icon="['fas', 'atlas']" /> 行程規劃</b-nav-item>
          <b-nav-item to="/album"><font-awesome-icon :icon="['fab', 'algolia']" /> 旅遊相簿</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-if="user.length === 0" to="/reg"><font-awesome-icon :icon="['fas', 'atom']" /> 註冊 / 登入 </b-nav-item>
          <b-nav-item v-if="user.length !== 0" @click="logout"><font-awesome-icon :icon="['fas', 'sign-out-alt']" /> 登出 </b-nav-item>
          <p v-if="user.length !== 0"><font-awesome-icon :icon="['fas', 'user']" />  {{ user + ' &emsp;&emsp;Hello' }} </p>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view></router-view>
    <b-navbar toggleable='lg' type='dark' variant='dark'>
      <b-navbar-brand class="m-auto">
        © BI-TENG XIE 2020
      </b-navbar-brand>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    logout () {
      this.axios.delete(process.env.VUE_APP_APIURL + '/logout')
        .then(response => {
          const data = response.data
          if (data.success) {
            // 如果回來的資料 success 是 true
            this.$swal.fire({
              icon: 'success',
              text: '登出成功'
            })
            // 呼叫 vuex 的登入
            this.$store.commit('logout')
            // 如果現在不是在首頁，跳到登出後的首頁
            if (this.$route.path !== '/') {
              this.$router.push('/')
            }
          } else {
            // 不是就顯示回來的 message
            this.$swal.fire({
              icon: 'error',
              text: data.message
            })
          }
        })
        .catch(error => {
          // 如果回來的狀態不是 200，顯示回來的 message
          this.$swal.fire({
            icon: 'error',
            text: error.response.data.message
          })
        })
    },
    heartbeat () {
      this.axios.get(process.env.VUE_APP_APIURL + '/heartbeat')
        .then(response => {
          const data = response.data
          // 如果現在狀態是登入中
          if (this.user.length > 0) {
            // 但是如果後端登入時間過期
            if (!data) {
              this.$swal.fire({
                icon: 'error',
                text: '登入時效已過'
              })
              // 將前端登出
              this.$store.commit('logout')
              // 如果現在不是在首頁，跳到登出後的首頁
              if (this.$route.path !== '/') {
                this.$router.push('/')
              }
            }
          }
        })
        // 檢查途中發生錯誤，把前端登出
        .catch(() => {
          this.$swal.fire({
            icon: 'error',
            text: '發生錯誤'
          })
          this.$store.commit('logout')
          // 如果現在不是在首頁，跳到登出後的首頁
          if (this.$route.path !== '/') {
            this.$router.push('/')
          }
        })
    }
  },
  // 每分鐘跟後端要資料，來延長登入時間，因為只設定30分鐘
  mounted () {
    this.heartbeat()
    setInterval(() => {
      this.heartbeat()
    }, 1000 * 5)
  }
}
</script>
