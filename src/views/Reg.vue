<template>
  <div id="reg">
    <b-container>
      <b-row id="base">
        <b-col class="wrapper" :class="{move:ismove}">
          <b-col id="reg1">
            <b-form @submit="submit">
              <h1 class="col-12 text-center">註冊</h1>
              <b-form-group
                label="帳號"
                label-for="input-accountReg"
                invalid-feedback="帳號格式不符"
                :state="state('account')"
                class="col-12"
              >
                <b-form-input
                  id="input-accountReg"
                  type="text"
                  placeholder="帳號長度為 4 - 20 個字"
                  v-model="accountReg"
                  :state="state('account')"
                >
                </b-form-input>
              </b-form-group>

              <b-form-group
                label="密碼"
                label-for="input-passwordReg"
                invalid-feedback="密碼格式不符"
                :state="state('password')"
                class="col-12"
              >
                <b-form-input
                  id="input-passwordReg"
                  type="password"
                  placeholder="密碼長度為 5 個字以上"
                  v-model="passwordReg"
                  :state="state('password')"
                >
                </b-form-input>
              </b-form-group>
              <b-col id="base-login" class="d-flex  justify-content-center mt-5">
              <b-button variant="info" class="col-4 mx-3"   @click="changetosignin" :disabled="!isdisabled" :class="  {active:!isactive}">會員登入</b-button>
              <b-button type="submit" variant="info" class="col-4 mx-3">  註冊</b-button>
            </b-col>
            </b-form>
          </b-col>

          <b-col id="login">
            <b-form @submit="submitLogin">
              <h1 class="col-12 text-center">登入</h1>
              <b-form-group
              label="帳號"
              label-for="input-accountLogin"
              invalid-feedback="帳號格式不符"
              :state="state('account1')"
              class="col-12"
              >
              <b-form-input
                id="input-accountLogin"
                type="text"
                placeholder="帳號長度為 4 - 20 個字"
                v-model="accountLogin"
                :state="state('account1')"
              >
              </b-form-input>
            </b-form-group>

              <b-form-group
              label="密碼"
              label-for="input-passwordLogin"
              invalid-feedback="密碼格式不符"
              :state="state('password1')"
              class="col-12"
              >
              <b-form-input
                id="input-passwordLogin"
                type="password"
                placeholder="密碼長度為 5 個字以上"
                v-model="passwordLogin"
                :state="state('password1')"
              >
              </b-form-input>
            </b-form-group>

            <b-col id="base-reg" class="d-flex justify-content-center mt-5">
              <b-button class="col-4 mx-3" variant="info" @click="changetoregister" :disabled="isdisabled" :class=" {active:isactive}">加入會員</b-button>
              <b-button type="submit" variant="info" class="col-4 mx-3">登入</b-button>
            </b-col>
            </b-form>
          </b-col>
        </b-col>
        <!-- <b-col class="wrapper2" :class="{move2:ismove}">
          <b-col id="text1">
            <p>12314654646</p>
          </b-col>

          <b-col id="text2">
            <p>sdkodslpdsl</p>
          </b-col>
        </b-col> -->
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'reg',
  data () {
    return {
      ismove: false,
      isactive: true,
      isdisabled: true,
      accountReg: '',
      passwordReg: '',
      nameReg: '',
      accountLogin: '',
      passwordLogin: '',
      nameLogin: ''
    }
  },
  methods: {
    state (type) {
      if (type === 'account') {
        if (this.accountReg.length === 0) {
          return null
        } else if (this.accountReg.length < 4 || this.accountReg.length > 20) {
          return false
        } else {
          return true
        }
      } else if (type === 'password') {
        if (this.passwordReg.length === 0) {
          return null
        } else if (this.passwordReg.length < 5 || this.passwordReg.length > 20) {
          return false
        } else {
          return true
        }
      } else if (type === 'account1') {
        if (this.accountLogin.length === 0) {
          return null
        } else if (this.accountLogin.length < 4 || this.accountLogin.length > 20) {
          return false
        } else {
          return true
        }
      } else if (type === 'password1') {
        if (this.passwordLogin.length === 0) {
          return null
        } else if (this.passwordLogin.length < 5 || this.passwordLogin.length > 20) {
          return false
        } else {
          return true
        }
      }
    },
    submit (event) {
      event.preventDefault()
      if (this.accountReg.length < 4 || this.accountReg.length > 20) {
        this.$swal.fire({
          icon: 'error',
          text: '帳號格式不符'
        })
      } else if (this.passwordReg.length < 5 || this.passwordReg.length > 20) {
        this.$swal.fire({
          icon: 'error',
          text: '密碼格式不符'
        })
      }
      this.axios.post(
        process.env.VUE_APP_APIURL + '/users',
        { account: this.accountReg, password: this.passwordReg }
      )
        .then(response => {
          const data = response.data
          if (data.success) {
            // 如果回來的資料 success 是 true
            this.$swal.fire({
              icon: 'success',
              text: '註冊成功'
            })
            this.accountReg = ''
            this.passwordReg = ''
            this.accountLogin = ''
            this.passwordLogin = ''
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
    },
    submitLogin (event) {
      event.preventDefault()
      if (this.accountLogin.length < 4 || this.accountLogin.length > 20) {
        this.$swal.fire({
          icon: 'error',
          text: '帳號格式不符'
        })
      } else if (this.passwordLogin.length < 5 || this.passwordLogin.length > 20) {
        this.$swal.fire({
          icon: 'error',
          text: '密碼格式不符'
        })
      }
      this.axios.post(
        process.env.VUE_APP_APIURL + '/login',
        { account: this.accountLogin, password: this.passwordLogin }
      )
        .then(response => {
          const data = response.data
          if (data.success) {
            // 如果回來的資料 success 是 true
            this.$swal.fire({
              icon: 'success',
              text: '登入成功'
            })
            this.$store.commit('login', this.accountLogin)
            this.$router.push('/explore')
            this.accountReg = ''
            this.passwordReg = ''
            this.accountLogin = ''
            this.passwordLogin = ''
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
    },
    changetoregister () {
      this.ismove = !this.ismove
      this.isactive = !this.isactive
      this.isdisabled = !this.isdisabled
    },
    changetosignin () {
      this.ismove = !this.ismove
      this.isactive = !this.isactive
      this.isdisabled = !this.isdisabled
    }
  }
}
</script>
