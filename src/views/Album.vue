<template>
  <div id="album">
    <b-container>
      <h1 class="text-center">My Album</h1>
      <br>
      <b-form @submit="submit">
        <b-form-file
          multiple
          v-model="file"
          :state="state"
          placeholder="選擇檔案或拖曳至此"
          drop-placeholder="將檔案拖曳至此"
          required
          browse-text="劉覽"
          accept="image/*"
          @input="validateFile"
        >
        </b-form-file>
        <p class="text-danger">僅支援 1MB 以下的圖片</p>
        <b-form-textarea
          v-model="description"
          placeholder="相片說明"
          rows="3" max-rows="6"
          maxlength="200"
          @input="validateText"
          :state="textstate"
        >
        </b-form-textarea>
        <br>
        <b-button type="submit" variant="info">上傳</b-button>
      </b-form>
      <hr>
      <b-row>
        <b-col class="col-12 col-md-6 col-lg-3 my-3" v-for="(image, idx) in images" :key="idx">
          <b-card>
            <b-card-img :src="image.src" img-top></b-card-img>
            <b-card-body>
              <b-btn v-if="image.edit" variant="danger" @click="cancel(image)">取消</b-btn>
              <b-btn v-else variant="success" @click="edit(image)">編輯</b-btn>
              <b-btn v-if="image.edit" variant="success" @click="update(image)">更新</b-btn>
              <b-btn v-else variant="danger" @click="del(image, idx)">刪除</b-btn>
              <hr>
              <pre v-if="!image.edit"> {{ image.title }} </pre>
              <b-form-textarea v-else v-model="image.model"></b-form-textarea>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'album',
  data () {
    return {
      file: [],
      description: '',
      state: null,
      textstate: null,
      images: []
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    validateFile () {
      for (const file of this.file) {
      // console.log(this.file)
      // 沒寫判斷而直接讓不符合的檔案清掉，程式會出錯
        if (file != null) {
          if (file.size >= 1024 * 1024 || !file.type.includes('image')) {
            this.state = false
            this.file = null
          } else {
            this.state = true
          }
        }
      }
    },
    validateText () {
      if (this.description.length > 200) {
        this.textstate = false
      } else {
        this.textstate = true
      }
    },
    submit (event) {
      event.preventDefault()
      // this.file 讀的是data的資料
      for (const file of this.file) {
        // file 指的是 this.file 的值
        if (file === null || file.size >= 1024 * 1024 || !file.type.includes('image')) {
          this.$swal.fire({
            icon: 'error',
            text: '檔案格式不符'
          })
          return
        }
      }
      // FormData 可以同時傳送檔案和表單資料
      const fd = new FormData()
      for (const i of this.file) {
        fd.append('image', i)
      }
      fd.append('description', this.description)

      this.axios.post(process.env.VUE_APP_APIURL + '/file', fd, {
        // 因為 axios 預設是送 json，所以要自己設定成 formdata
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        // console.log(response.data)
        this.images = response.data.result
        this.file = null
        this.description = ''
      }).catch(error => {
        alert(error.response.data.message)
      })
    },
    edit (image) {
      image.edit = true
      image.model = image.title
    },
    update (image) {
      this.axios.patch(process.env.VUE_APP_APIURL + '/file/' + image._id, { description: image.model })
        .then(response => {
          image.edit = false
          image.title = image.model
        })
        .catch(() => {
          this.$swal.fire({
            icon: 'warning',
            text: '你不是照片的主人'
          })
        })
    },
    cancel (image) {
      image.edit = false
      image.model = image.title
    },
    del (image, idx) {
      this.axios.delete(process.env.VUE_APP_APIURL + '/file/' + image._id)
        .then(response => {
          this.images.splice(idx, 1)
        })
        .catch(() => {
          alert('發生錯誤2')
        })
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_APIURL + '/album/image')
      .then(response => {
        // 編輯圖片
        this.images = response.data.result.map(d => {
          return {
            title: d.description,
            src: process.env.VUE_APP_APIURL + '/file/' + d.name,
            _id: d._id,
            edit: false,
            model: d.name
          }
        })
      })
      .catch((error) => {
        console.log(error)
        this.$swal.fire({
          icon: 'error',
          text: '發生錯誤3'
        })
      })
  }
}
</script>
