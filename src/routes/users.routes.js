const { Router } = require('express')
const multer = require('multer')
const uploadConfig = require('../configs/upload')

const UsersController = require('../controllers/UsersController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const usersRoutes = Router()

const usersController = new UsersController()

const upload = multer(uploadConfig.MULTER)

usersRoutes.post('/', usersController.create)
usersRoutes.put('/', ensureAuthenticated, usersController.update)
usersRoutes.patch('/avatar', ensureAuthenticated, upload.single('avatar'), (req, res) => {
  console.log(req.file.filename)
  res.status(200).send()
} )

module.exports = usersRoutes