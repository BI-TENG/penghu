import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import connectMongo from 'connect-mongo'
import session from 'express-session'
import multer from 'multer'
import md5 from 'md5'
import dotenv from 'dotenv'
import path from 'path'
import FTPStorage from 'multer-ftp'
// 內建的，可以讀檔案、寫檔案、檔案是否在...做處理
import fs from 'fs'
// 傳送多筆資料時，讓檔名能以接近於零的機率不重複
import uuidv4 from 'uuidv4'
import db from './db.js'

const uuid = uuidv4.uuid

dotenv.config()

const MongoStore = connectMongo(session)

const app = express()

app.use(bodyParser.json())
app.use(cors({
  origin (origin, callback) {
    if (process.env.DEV) {
      callback(null, true)
    } else if (origin.includes('github')) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed'), false)
    }
  },
  credentials: true
}))

app.use(session({
  // 加密的序號，用來加密跟解密
  secret: 'album',
  // 將 session 存入 mongodb
  store: new MongoStore({
    // 使用 mongoose 的資料庫連接
    mongooseConnection: db.connection,
    // 設定存入的 collection
    collection: process.env.COLLECTION_SESSION
  }),
  // session(後端) 有效期間
  cookie: {
    // 1000毫秒 = 1 秒鐘
    // 1000毫秒 * 60 = 1 分鐘
    // 1000毫秒 * 60 * 30 = 30 分鐘
    maxAge: 1000 * 60 * 30
  },
  // 是否保存未修改的 session
  saveUninitialized: false,
  // 是否每次重設過期時間
  rolling: true,
  resave: true
}))

let storage
if (process.env.DEV) {
  // 開發環境將上傳檔案放本機
  storage = multer.diskStorage({
    // 放在哪個資料夾
    // req 進來的東西
    // file 進來的檔案
    // cb 回傳是否ok
    destination (req, file, cb) {
      cb(null, 'images/')
    },
    filename (req, file, cb) {
      // 現在的時間 + 原本的副檔名
      cb(null, uuid() + path.extname(file.originalname))
    }
  })
} else {
  // heroku 將上傳檔案放伺服器
  storage = new FTPStorage({
    // 上傳伺服器的路徑
    basepath: '/',
    // FTP 設定
    ftp: {
      host: process.env.FTP_HOST,
      secure: false,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD
    },
    destination (req, file, options, cb) {
      cb(null, md5(file) + path.extname(file.originalname))
    }
  })
}

const upload = multer({
  storage,
  fileFilter (req, file, cb) {
    // 觸發 multer 錯誤，不接受檔案
    // LIMIT_FORMAT 是自訂的錯誤 CODE，跟內建的錯誤 CODE 格式統一
    // 如果進來的檔案不是 IMAGE
    if (!file.mimetype.includes('image')) {
      cb(new multer.MulterError('LIMIT_FORMAT'), false)
    } else {
      cb(null, true)
    }
  },
  limits: {
    // 1 MB
    fileSize: 1024 * 1024
  }
})

app.listen(process.env.PORT, () => {
  console.log('已啟動')
})

// 新增使用者
app.post('/users', async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }

  try {
    await db.users.create({
      account: req.body.account,
      password: md5(req.body.password)
    })
    res.status(200)
    res.send({ success: true, message: '' })
  } catch (error) {
    // 資料格式錯誤，使用者的問題
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400)
      res.send({ success: false, message })
    } else {
      // 伺服器錯誤，開發者的問題
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤1' })
    }
  }
})

app.post('/login', async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }
  try {
    const result = await db.users.find(
      {
        account: req.body.account,
        password: md5(req.body.password)
      }
    )
    if (result.length > 0) {
      req.session.user = result[0].account
      res.status(200)
      res.send({ success: true, message: '' })
    } else {
      res.status(404)
      res.send({ success: false, message: '帳號密碼錯誤' })
    }
  } catch (error) {
    // 資料格式錯誤，使用者的問題
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400)
      res.send({ success: false, message })
    } else {
      // 伺服器錯誤，開發者的問題
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤2' })
    }
  }
})

app.delete('/logout', async (req, res) => {
  req.session.destroy(error => {
    if (error) {
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤3' })
    } else {
      res.clearCookie()
      res.status(200)
      res.send({ success: true, message: '' })
    }
  })
})

// 前端登入狀態寫在vuex(store)，不會主動跟後端溝通，所以在每次網頁是打開時，先跟後端要資料(使用者是否登入)，沒有 => 登入時效已過；有 => 登入時間延長60分鐘
// 跟後端要資料，延長登入時間，預設登入為30分鐘
app.get('/heartbeat', async (req, res) => {
  let islogin = false
  if (req.session.user !== undefined) {
    islogin = true
  }
  res.status(200)
  res.send(islogin)
})

// 在後台檔未登入的時候
app.post('/file', async (req, res) => {
  // 沒有登入
  if (req.session.user === undefined) {
    res.status(401)
    res.send({ success: false, message: '未登入' })
    return
  }
  // form-data html的 form 標籤，送出資料時會拿到的東西，multipart有包含檔案
  if (!req.headers['content-type'].includes('multipart/form-data')) {
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }

  // 有一個上傳進來的檔案，欄位是 image
  // req，進來的東西
  // res，要出去的東西
  // err，檔案上傳的錯誤
  // upload.single(欄位)(req, res, 上傳完畢的 function)
  upload.array('image', 10)(req, res, async error => {
    if (error instanceof multer.MulterError) {
      // 上傳錯誤
      let message = ''
      if (error.code === 'LIMIT_FILE_SIZE') {
        message = '檔案太大'
      } else {
        message = '檔案格式不符'
      }
      res.status(400)
      res.send({ success: false, message })
    } else if (error) {
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤4' })
    } else {
      try {
        for (const file of req.files) {
          let name = ''
          if (process.env.FTP === 'true') {
            name = path.basename(file.path)
          } else {
            name = file.filename
          }
          await db.files.create(
            {
              user: req.session.user,
              description: req.body.description,
              name
            }
          )
        }
        const result = await db.files.find()
        res.status(200)
        res.send({ success: true, message: '', result })
      } catch (error) {
        if (error.name === 'ValidationError') {
          // 資料格式錯誤
          const key = Object.keys(error.errors)[0]
          const message = error.errors[key].message
          res.status(400)
          res.send({ success: false, message })
        } else {
          // 伺服器錯誤
          console.log(error)
          res.status(500)
          res.send({ success: false, message: '伺服器錯誤5' })
        }
      }
    }
  })
})

app.get('/file/:name', async (req, res) => {
  // 如果是在本機
  if (process.env.DEV) {
    // 檢查東西是否在，檢查只能吃相對路徑，要用node.js執行的地方
    const path = process.cwd() + '/images/' + req.params.name
    const exists = fs.existsSync(path)
    // 如果有
    if (exists) {
      res.status(200)
      res.sendFile(path)
    } else {
      res.status(404)
      res.send({ success: false, message: '找不到圖片' })
    }
  // 在雲端的話，導去220
  } else {
    res.redirect(process.env.FTP_HOST + '/' + process.env.FTP_USER + '/' + req.params.name)
  }
})

app.get('/album/image', async (req, res) => {
  try {
    const result = await db.files.find()
    res.status(200)
    res.send({ success: true, message: '', result })
  } catch (error) {
    res.status(500)
    res.send({ success: false, message: '伺服器錯誤6' })
  }
})

app.patch('/file/:id', async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }
  // 沒有登入
  if (!req.session.user) {
    res.status(401)
    res.send({ success: false, message: '無權限' })
    return
  }

  try {
    // 檢查相片擁有者是不是本人
    let result = await db.files.findById(req.params.id)
    if (result.user !== req.session.user) {
      res.status(403)
      res.send({ success: false, message: '無權限' })
      return
    }
    // findByIdAndUpdate 預設回傳的是更新前的資料
    // 設定 new true 後會變成回傳新的資料
    result = await db.files.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200)
    res.send({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'CastError') {
      // ID 格式不是 MongoDB 的格式
      res.status(400)
      res.send({ success: false, message: 'ID 格式錯誤' })
    } else if (error.name === 'ValidationError') {
      // 資料格式錯誤
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400)
      res.send({ success: false, message })
    } else {
      // 伺服器錯誤
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤7' })
    }
  }
})

app.delete('/file/:id', async (req, res) => {
  // 沒有登入
  if (!req.session.user) {
    res.status(401)
    res.send({ success: false, message: '無權限' })
    return
  }

  try {
    // 檢查相片擁有者是不是本人
    let result = await db.files.findById(req.params.id)
    if (result.user !== req.session.user) {
      res.status(403)
      res.send({ success: false, message: '無權限' })
      return
    }
    // findByIdAndUpdate 預設回傳的是更新前的資料
    // 設定 new true 後會變成回傳新的資料
    result = await db.files.findByIdAndDelete(req.params.id)
    if (result === null) {
      res.status(404)
      res.send({ success: true, message: '找不到資料' })
    } else {
      res.status(200)
      res.send({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.name === 'CastError') {
      // ID 格式不是 MongoDB 的格式
      res.status(400)
      res.send({ success: false, message: 'ID 格式錯誤' })
    } else {
      // 伺服器錯誤
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤8' })
    }
  }
})
