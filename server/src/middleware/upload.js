const multer = require('multer')

const fileFilter = (req, file, cb) => {
  const validMimeTypes = ['image/jpeg', 'image/png']
  const isImage = validMimeTypes.includes(file.mimetype)

  if (isImage) {
    cb(null, true)
  } else {
    cb(new Error('please supply a valid image file.'), false)
  }
}

const multerOptions = {
  fileFilter,
}

const uploadErrorHandler = (err, req, res, next) => {
  res.status(400).send({ error: err.message })
}

const upload = multer(multerOptions)

module.exports = {
  upload,
  uploadErrorHandler,
}
