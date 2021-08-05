const ClientError = require('../../exceptions/ClientError')

class UploadsHandler {
  constructor (service, validator) {
    this._service = service
    this._validator = validator

    this.postUploadPicturesHandler = this.postUploadPicturesHandler.bind(this)
  }

  async postUploadPicturesHandler (request, h) {
    try {
      const { data } = request.payload
      this._validator.validateImageHeaders(data.hapi.headers)

      const filename = await this._service.writeFile(data, data.hapi)

      const response = h.response({
        status: 'success',
        message: 'Gambar berhasil diunggah',
        data: {
          pictureUrl: `http://${process.env.HOST}:${process.env.PORT}/upload/pictures/${filename}`
        }
      })
      response.code(201)
      return response
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message
        })
        response.code(error.statusCode)
        return response
      }

      // Server Error
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami'
      })
      response.code(500)
      console.error(error)
      return response
    }
  }
}

module.exports = UploadsHandler
