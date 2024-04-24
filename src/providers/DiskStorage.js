const fs = require('fs')
const path = require('path')
const UploadConfig = require('../configs/upload')

class DiskStorage {
  async save(file) {
    const { TMP_FOLDER, UPLOAD_FOLDER } = UploadConfig
    await fs.promises.rename(
      path.resolve(TMP_FOLDER, file),
      path.resolve(UPLOAD_FOLDER, file)
    )

    return file
  }

  async delete(file) {
    const { UPLOAD_FOLDER } = UploadConfig
    const filePath = path.resolve(UPLOAD_FOLDER, file)

    try {
      await fs.promises.stat(filePath)
    } catch {
      return
    }

    await fs.promises.unlink(filePath)
  }
}

module.exports = DiskStorage  