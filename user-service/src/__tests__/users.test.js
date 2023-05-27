require('../__mocks__/mocks')
const request = require('supertest')
const createServer = require('../express-app')
const { GenerateToken, GeneratePassword } = require('../utils')
const { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } = require('../config')
const UserRepository = require('../database/repository/user-repository')

const app = createServer()
let jwt = null
const userSession = { user: '123456789' }
const userPayload = {
  user: {
    id: '123456789',
    username: 'Jhon Doe',
    email: 'jhon.doe@gmail.com',
    password: 'FooBarBaz'
  }
}

beforeAll(() => {
  jwt = GenerateToken(userSession, ACCESS_TOKEN_KEY, '1min')
})

describe('POST /signin', () => {
  describe('user email or password not defined on the request body', () => {
    test('should return error message with 400 status', async () => {
      const response = await request(app).post('/signin').send({ user: {} })

      expect(response.statusCode).toBe(400)
      expect(response.text).toEqual('"User email and password are required!"')
    })
  })

  describe('the given email not found on the database', () => {
    test('should return error message with 400 status', async () => {
      const mockFindUserByEmail = jest
        .spyOn(UserRepository.prototype, 'FindUserByEmail')
        .mockResolvedValue(null)

      const response = await request(app)
        .post('/signin')
        .send({ user: { ...userPayload.user } })

      expect(response.statusCode).toBe(404)
      expect(response.text).toEqual('"Cannot found the user!"')
      expect(mockFindUserByEmail).toHaveBeenCalledTimes(1)
      expect(mockFindUserByEmail).toHaveBeenCalledWith(userPayload.user.email)
    })
  })

  describe('Invalid password given', () => {
    test('should return error message with 401 status', async () => {
      const mockFindUserByEmail = jest
        .spyOn(UserRepository.prototype, 'FindUserByEmail')
        .mockResolvedValue({ password: userPayload.user.password })

      const response = await request(app)
        .post('/signin')
        .send({ user: { ...userPayload.user } })

      expect(response.statusCode).toBe(401)
      expect(response.text).toEqual('"Invalid password!"')
      expect(mockFindUserByEmail).toHaveBeenCalledTimes(1)
      expect(mockFindUserByEmail).toHaveBeenCalledWith(userPayload.user.email)
    })
  })

  describe('Update user refresh token', () => {
    test('should update user token 201 status', async () => {
      const passwordHash = await GeneratePassword(userPayload.user.password)
      jest
        .spyOn(UserRepository.prototype, 'FindUserByEmail')
        .mockResolvedValue({
          _id: userPayload.user.id,
          email: userPayload.user.email,
          password: passwordHash
        })

      const mockUpdateUserToken = jest
        .spyOn(UserRepository.prototype, 'UpdateUserToken')
        .mockResolvedValue({ user: { ...userPayload.user } })

      const response = await request(app)
        .post('/signin')
        .send({
          user: {
            email: userPayload.user.email,
            password: userPayload.user.password
          }
        })

      expect(response.statusCode).toBe(201)
      expect(mockUpdateUserToken).toHaveBeenCalledTimes(1)
      expect(mockUpdateUserToken).toHaveBeenCalledWith({
        id: userPayload.user.id,
        token: expect.any(String)
      })
    })
  })

  describe('User logged successfully', () => {
    test('should set cookie refresh token', async () => {
      const passwordHash = await GeneratePassword(userPayload.user.password)
      jest
        .spyOn(UserRepository.prototype, 'FindUserByEmail')
        .mockResolvedValue({
          _id: userPayload.user.id,
          email: userPayload.user.email,
          password: passwordHash
        })

      jest
        .spyOn(UserRepository.prototype, 'UpdateUserToken')
        .mockResolvedValue({ user: { ...userPayload.user } })

      const response = await request(app)
        .post('/signin')
        .send({
          user: {
            email: userPayload.user.email,
            password: userPayload.user.password
          }
        })
        .set('authorization', `Bearer ${jwt}`)
      const cookie = response.headers['set-cookie'][0].split(';')[0]

      expect(response.statusCode).toBe(201)
      expect(cookie).toContain('jwt=')
      expect(cookie.split('jwt=')[1]).toBeTruthy()
    })

    test('should return user and token with 201 status', async () => {
      const passwordHash = await GeneratePassword(userPayload.user.password)
      jest
        .spyOn(UserRepository.prototype, 'FindUserByEmail')
        .mockResolvedValue({
          _id: userPayload.user.id,
          email: userPayload.user.email,
          password: passwordHash
        })

      jest
        .spyOn(UserRepository.prototype, 'UpdateUserToken')
        .mockResolvedValue({
          _id: userPayload.user.id,
          email: userPayload.user.email
        })

      const response = await request(app)
        .post('/signin')
        .send({
          user: {
            email: userPayload.user.email,
            password: userPayload.user.password
          }
        })
        .set('authorization', `Bearer ${jwt}`)

      expect(response.statusCode).toBe(201)
      expect(response.body).toEqual({
        user: {
          _id: userPayload.user.id,
          email: userPayload.user.email,
          token: expect.any(String)
        }
      })
    })
  })
})

describe('POST /signup', () => {
  describe('user email or passwod not defined on the request body', () => {
    test('should return error message with 400 status', async () => {
      const response = await request(app).post('/signup').send({ user: {} })

      expect(response.statusCode).toBe(400)
      expect(response.text).toEqual('"User Email and Password are required!"')
    })
  })

  describe('the given email already exist on the database', () => {
    test('should return error message with 409 status', async () => {
      const mockFindUserByEmail = jest
        .spyOn(UserRepository.prototype, 'FindUserByEmail')
        .mockResolvedValue({
          id: userPayload.user.id,
          email: userPayload.user.email
        })

      const response = await request(app)
        .post('/signup')
        .send({ user: { ...userPayload.user } })

      expect(response.statusCode).toBe(409)
      expect(response.text).toEqual('"User already exists!"')
      expect(mockFindUserByEmail).toHaveBeenCalledTimes(1)
      expect(mockFindUserByEmail).toHaveBeenCalledWith(userPayload.user.email)
    })
  })

  describe('Create new user', () => {
    test('should invoke CreateNewUser function once', async () => {
      jest
        .spyOn(UserRepository.prototype, 'FindUserByEmail')
        .mockResolvedValue(null)

      const mockCreateNewUser = jest
        .spyOn(UserRepository.prototype, 'CreateNewUser')
        .mockResolvedValue({})

      await request(app)
        .post('/signup')
        .send({ user: { ...userPayload.user } })

      const username =
        userPayload.user.username ??
        userPayload.user.email.slice(0, userPayload.user.email.indexOf('@'))

      expect(mockCreateNewUser).toHaveBeenCalledTimes(1)
      expect(mockCreateNewUser).toHaveBeenCalledWith({
        email: userPayload.user.email,
        username,
        password: expect.any(String),
        source: 'Scopra'
      })
    })

    test('should update user refresh token', async () => {
      jest
        .spyOn(UserRepository.prototype, 'FindUserByEmail')
        .mockResolvedValue(null)

      jest
        .spyOn(UserRepository.prototype, 'CreateNewUser')
        .mockResolvedValue({ _id: userPayload.user.id })

      const mockUpdateUserToken = jest
        .spyOn(UserRepository.prototype, 'UpdateUserToken')
        .mockResolvedValue({})

      const response = await request(app)
        .post('/signup')
        .send({ user: userPayload.user })

      expect(response.statusCode).toBe(201)
      expect(mockUpdateUserToken).toHaveBeenCalledTimes(1)
      expect(mockUpdateUserToken).toHaveBeenCalledWith({
        id: userPayload.user.id,
        token: expect.any(String)
      })
    })

    test('should return error message with 500 status', async () => {
      jest
        .spyOn(UserRepository.prototype, 'FindUserByEmail')
        .mockResolvedValue(null)

      jest
        .spyOn(UserRepository.prototype, 'CreateNewUser')
        .mockResolvedValue({ _id: userPayload.user.id })

      const mockUpdateUserToken = jest
        .spyOn(UserRepository.prototype, 'UpdateUserToken')
        .mockResolvedValue(null)

      const response = await request(app)
        .post('/signup')
        .send({ user: { ...userPayload.user } })

      expect(response.statusCode).toBe(500)
      expect(response.text).toEqual('"Cannot update user token!"')
      expect(mockUpdateUserToken).toHaveBeenCalledTimes(1)
    })

    test('should response user object and access toekn with 201 status', async () => {
      jest
        .spyOn(UserRepository.prototype, 'FindUserByEmail')
        .mockResolvedValue(null)

      jest
        .spyOn(UserRepository.prototype, 'CreateNewUser')
        .mockResolvedValue({ _id: userPayload.user.id })

      jest
        .spyOn(UserRepository.prototype, 'UpdateUserToken')
        .mockResolvedValue({
          _id: userPayload.user.id,
          email: userPayload.user.email
        })

      const response = await request(app)
        .post('/signup')
        .send({ user: userPayload.user })

      expect(response.statusCode).toBe(201)
      expect(response.body).toEqual({
        user: {
          _id: userPayload.user.id,
          email: userPayload.user.email,
          token: expect.any(String)
        }
      })
    })

    test('should set cookie', async () => {
      jest
        .spyOn(UserRepository.prototype, 'FindUserByEmail')
        .mockResolvedValue(null)

      jest
        .spyOn(UserRepository.prototype, 'CreateNewUser')
        .mockResolvedValue({ _id: userPayload.user.id })

      jest
        .spyOn(UserRepository.prototype, 'UpdateUserToken')
        .mockResolvedValue({
          _id: userPayload.user.id,
          email: userPayload.user.email
        })

      const response = await request(app)
        .post('/signup')
        .send({
          user: {
            email: userPayload.user.email,
            password: userPayload.user.password
          }
        })

      expect(response.statusCode).toBe(201)
      expect(response.headers['set-cookie'][0].split(';')[0]).toContain('jwt=')
      expect(
        response.headers['set-cookie'][0].split(';')[0].split('jwt=')[1]
      ).toBeTruthy()
    })
  })
})

describe('GET /refresh', () => {
  describe('No jwt refresh token cookie found', () => {
    test('shouold return error message with 404 status', async () => {
      const response = await request(app).get('/refresh')
      expect(response.statusCode).toBe(404)
      expect(response.text).toEqual('"Refresh Token not found!"')
    })
  })

  describe('Invalid the refresh token', () => {
    test('should return error message with 403 status', async () => {
      const expiredToken = await GenerateToken(
        userPayload.user.email,
        REFRESH_TOKEN_KEY,
        '0s'
      )
      const response = await request(app)
        .get('/refresh')
        .set('Cookie', [`jwt=${expiredToken}`])

      expect(response.statusCode).toBe(403)
      expect(response.text).toEqual('"Unvalid Refresh Token!"')
    })
  })

  describe('Find user by refresh token', () => {
    test('should return user object with access token and 201 status', async () => {
      const mockFindUserByToken = jest
        .spyOn(UserRepository.prototype, 'FindUserByToken')
        .mockResolvedValue({ _id: userPayload.user.id })

      const refreshToken = GenerateToken(
        userPayload,
        REFRESH_TOKEN_KEY,
        '1min'
      )
      const response = await request(app)
        .get('/refresh')
        .set('Cookie', [`jwt=${refreshToken}`])

      expect(response.statusCode).toBe(201)
      expect(response.body).toEqual({
        _id: userPayload.user.id,
        token: expect.any(String)
      })
      expect(mockFindUserByToken).toHaveBeenCalledTimes(1)
      expect(mockFindUserByToken).toHaveBeenCalledWith(refreshToken)
    })
  })
})

describe('PUT /account', () => {
  describe('No user id defined on the request body', () => {
    test('should return error message with 400 status', async () => {
      const response = await request(app)
        .put('/account')
        .send({ user: {} })
        .set('authorization', `Bearer ${jwt}`)

      expect(response.statusCode).toBe(400)
      expect(response.text).toEqual('"User ID is required!"')
    })
  })

  describe('User information defined on the request body', () => {
    test('should return the updated user object with 201 status', async () => {
      const mockUpdateUser = jest
        .spyOn(UserRepository.prototype, 'UpdateUser')
        .mockResolvedValue({
          _id: userPayload.user.id,
          username: userPayload.user.username
        })

      const response = await request(app)
        .put('/account')
        .send({
          user: { ...userPayload.user }
        })
        .set('authorization', `Bearer ${jwt}`)

      expect(mockUpdateUser).toHaveBeenCalledTimes(1)
      expect(response.statusCode).toBe(201)
      expect(response.body).toEqual({
        user: { _id: userPayload.user.id, username: userPayload.user.username }
      })
    })
  })
})
