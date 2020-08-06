<template>
  <div id="reg">
    <b-container>
      <b-row class="justify-content-center">
        <b-form class="col-5 flex row justify-content-center" @submit="submit">
          <h1 class="col-12 text-center">登入</h1>
          <b-form-group
            label="帳號"
            label-for="input-account"
            invalid-feedback="帳號格式不符"
            :state="state('account')"
            class="col-12"
          >
            <b-form-input
              id="input-account"
              type="text"
              placeholder="帳號長度為 4 - 20 個字"
              v-model="account"
              :state="state('account')"
            >
            </b-form-input>
          </b-form-group>

          <b-form-group
            label="密碼"
            label-for="input-password"
            invalid-feedback="密碼格式不符"
            :state="state('password')"
            class="col-12"
          >
            <b-form-input
              id="input-password"
              type="password"
              placeholder="密碼長度為 5 個字以上"
              v-model="password"
              :state="state('password')"
            >
            </b-form-input>
          </b-form-group>
          <b-button type="submit" variant="info">
            登入
          </b-button>
        </b-form>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      account: '',
      password: ''
    }
  },
  methods: {
    state (type) {
      if (type === 'account') {
        if (this.account.length === 0) {
          return null
        }
        if (this.account.length < 4 || this.account.length > 20) {
          return false
        } else {
          return true
        }
      } else if (type === 'password') {
        if (this.account.length === 0) {
          return null
        }
        if (this.password.length < 5 || this.password.length > 20) {
          return false
        } else {
          return true
        }
      }
    },
    submit (event) {
      event.preventDefault()
      if (this.account.length < 4 || this.account.length > 20) {
        this.$swal.fire({
          icon: 'error',
          text: '帳號格式不符'
        })
      } else if (this.password.length < 5 || this.password.length > 20) {
        this.$swal.fire({
          icon: 'error',
          text: '密碼格式不符'
        })
      }
      this.axios.post(
        process.env.VUE_APP_APIURL + '/login',
        { account: this.account, password: this.password }
      )
        .then(response => {
          const data = response.data
          if (data.success) {
            // 如果回來的資料 success 是 true
            this.$swal.fire({
              icon: 'success',
              text: '登入成功'
            })
            this.$store.commit('login', this.account)
            this.$router.push('/explore')
          } else {
            // 不是就顯示回來的 message
            // alert(data.message)
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
    }
  }
}
</script>
