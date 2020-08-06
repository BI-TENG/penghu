<template lang="pug">
  #login
    #container
      #base
        #base_signin.splits
          p 登入會員即可快速結帳
          b-button(variant="outline-warning" @click="changetoregister" :disabled="isdisabled" :class="{active:isactive}") SIGN IN
        #base_register.splits
          p 加入會員即可訂購
          b-button(variant="outline-warning" @click="changetosignin" :disabled="!isdisabled" :class="{active:!isactive}") REGISTER
        .wrapper(:class="{move:ismove}")
          #signin
            b-form.px-4(@submit="submit")
              h1 Sign In
              b-form-group.text-left(
                label-for="input-signin-account"
                description="帳號長度為 4 - 20 個字"
                )
                b-form-input#input-signin-account(type="text" v-model="accountSignin" placeholder="Account 會員帳號" required)
              b-form-group.text-left(
                label-for="input-signin-password"
                description="密碼長度為 4 - 20 個字"
                )
                b-form-input#input-signin-password(type="password" v-model="passwordSignin" placeholder="Password 會員密碼" required)
              b-button.text-warning(type="submit" variant="dark" pill) SIGN IN
          #register
            b-form.px-4(@submit="submitRegister")
              h1 Register
              b-form-group.text-left(
                label-for="input-register-account"
                description="帳號長度為 4 - 20 個字"
                )
                b-form-input#input-register-account(type="text" v-model="accountRegister" placeholder="Account 會員帳號" required)
              b-form-group.text-left(
                label-for="input-register-password"
                description="密碼長度為 4 - 20 個字"
                )
                b-form-input#input-register-password(type="password" v-model="passwordRegister" placeholder="Password 會員密碼" required)
              b-button.text-warning(type="submit" variant="dark" pill) SIGN UP
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      ismove: false,
      isactive: true,
      isdisabled: true,
      accountSignin: '',
      passwordSignin: '',
      accountRegister: '',
      passwordRegister: ''
    }
  },
  methods: {
    submit (event) {
      event.preventDefault()
      if (this.accountSignin < 4 || this.accountSignin > 20) {
        alert('帳號格式不符')
        return
      } else if (this.passwordSignin.length < 4 || this.passwordSignin.length > 20) {
        alert('密碼格式不符')
        return
      }
      this.axios.post(
        process.env.VUE_APP_APIURL + '/login',
        { account: this.accountSignin, password: this.passwordSignin })
        .then(response => {
          const data = response.data
          // 如果回來的資料 success 是 true
          if (data.success) {
            alert('登入成功')
            // 呼叫 vuex 的登入
            this.$store.commit('login', this.accountSignin)
            this.$store.commit('patchmemberprofile', data.result[0]._id)
            this.$store.commit('patchname', data.result[0].name)
            this.$store.commit('patchemail', data.result[0].email)
            this.$store.commit('patchphone', data.result[0].phone)
            this.$store.commit('patchaddress', data.result[0].address)
            this.$store.commit('patchbirth', data.result[0].birth)
            // 跳到登入後首頁
            if (this.accountSignin === 'admin1234') {
              this.$router.push('/admin/adminsort')
            } else {
              this.$router.push('/')
            }
          } else {
            // 不是就顯示回來的 message
            alert(data.message)
          }
        })
        .catch(error => {
          // 如果回來的狀態不是 200，顯示回來的 message
          alert(error.response.data.message)
        })
    },
    submitRegister (event) {
      event.preventDefault()
      if (this.accountRegister.length < 4 || this.accountRegister.length > 20) {
        alert('帳號格式不符')
        return
      } else if (this.passwordRegister.length < 4 || this.passwordRegister.length > 20) {
        alert('密碼格式不符')
        return
      }
      this.axios.post(
        process.env.VUE_APP_APIURL + '/register',
        { account: this.accountRegister, password: this.passwordRegister })
        .then(response => {
          const data = response.data
          // 如果回來的資料 success 是 true
          if (data.success) {
            alert('註冊成功')
            // 呼叫 vuex 的登入
            this.$store.commit('login', this.accountRegister)
            this.$store.commit('patchmemberprofile', data.result._id)
            // 跳到登入後的相簿頁
            this.$router.push('/')
          } else {
            // 不是就顯示回來的 message
            alert(data.message)
          }
        })
        .catch(error => {
          // 如果回來的狀態不是 200，顯示回來的 message
          alert(error.response.data.message)
        })
    },
    changetoregister () {
      this.ismove = !this.ismove
      this.isactive = !this.isactive
      this.isdisabled = !this.isdisabled
      this.accountSignin = ''
      this.passwordSignin = ''
    },
    changetosignin () {
      this.ismove = !this.ismove
      this.isactive = !this.isactive
      this.isdisabled = !this.isdisabled
      this.accountRegister = ''
      this.passwordRegister = ''
    }
  }
}
</script>

<style lang="scss">
#login{
  h1{
    color: orangered;
    font-weight: bolder;
    margin-bottom: 2rem;
  }
}
#base{
  width: 100%;
  min-height: 50vh;
  margin:5rem 0;
  background: rgba($color: #000000, $alpha: 0.8);
  display: table;
  position: relative;
  box-shadow: 0 0 4px rgba(0,0,0,.14), 0 4px 8px rgba(0,0,0,.28);
  transition: all .5s;
}
#base > *{
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  color: #ffffff;
  }
.wrapper{
  position: absolute;
  width: 40%;
  height: 120%;
  top: -10%;
  left: 10%;
  background: #fff;
  box-shadow: 0 0 4px rgba(0,0,0,.14), 0 4px 8px rgba(0,0,0,.28);
  overflow: hidden;
  transition: all .5s;
}
#signin{
  padding-top: 25%;
  visibility: visible;
  transition: all .5s;
}
#register{
  transform: translateY(-100%) translateX(100%);
  visibility: hidden;
  transition: all .5s;
}
.move{
  left:50%;
}
.move #signin{
  transform: translateX(-100%);
  visibility: hidden;
}
.move #register{
transform: translateY(-100%) translateX(0%);
visibility: visible;
}
.splits button{
    font-size: 1.2rem;
    font-weight: bolder;
}
@media (max-width: 767px){
  #base{
    display: block;
  }
  .base > *{
    display: inline-block;
  }
  .splits{
    width: 50%;
    float: left;
  }
  .splits button{
    width: 100%;
    border-radius: 0;
    background: rgb(255, 255, 255);
  }
  .splits p{
    display: none;
  }
  .wrapper{
    position: relative;
    top: 0;
    left: 0;
  }
}
</style>
