const { hash, compare } = require('bcryptjs')
const AppError = require('../utils/AppError')
const sqliteConnection = require('../database/sqlite')
const { use } = require('../routes')

class UsersController {
  /**
   * index - GET para listar vários registros.
   * show - GET para exibir um registro específico.
   * create - POST para criar um registro.
   * update - PUT para atualizar um registro.
   * delete - DELETE para remover um registro.
   */

 async create(request, response) {
    const { name, email, password } = request.body
    const database = await sqliteConnection()
    const checkUserExists = await database.get('SELECT * FROM users WHERE email = (?)', [email])

    if(checkUserExists) {
      throw new AppError('User email already exists', 400)
    }

    const hashedPassword = await hash(password, 8)

    await database.run(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
       [name, email, hashedPassword]
    )

    return response.status(201).json()
    
  }

  async update (request, response) {
    const { name, email, password, old_password } = request.body
    const user_id  = request.user.id

    const database = await sqliteConnection()
    const user = await database.get('SELECT * FROM users WHERE id = (?)', [user_id])

    if(!user) {
      throw new AppError('User not found', 404)
    }

    const userWithUpdatedEmail = await database.get('SELECT * FROM users WHERE email = (?)', [email])

    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError('The user s email is already in use', 400)
    }

    user.name = name ?? user.name
    user.email = email ?? user.email

    if(password && !old_password) {
      throw new AppError('You need to enter your old password to be able to set a new password.')
    }

    if(password && old_password) {
      const chekOldPassword = await compare(old_password, user.password)
      
      if(!chekOldPassword) {
        throw new AppError('Your old password is incorrect', 400)
      }

      user.password = await hash(password, 8)
    }

    await database.run(`
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      WHERE id = ?`,  
      [user.name , user.email, user.password, user_id]
    )


    return response.status(200).json()

  }
}

module.exports = UsersController