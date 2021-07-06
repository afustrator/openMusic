// const AuthenticationError = require('../../exceptions/AuthenticationError')
// const ClientError = require('../../exceptions/ClientError')
const { mapPlaylistModel } = require('../../utils/mapDBToModel')

class PlaylistsHandler {
  constructor (service, validator) {
    this._service = service
    this._validator = validator

    this.postPlaylistHandler = this.postPlaylistHandler.bind(this)
    this.getPlaylistsHandler = this.getPlaylistsHandler.bind(this)
    this.deletePlaylistByIdHandler = this.deletePlaylistByIdHandler.bind(this)
  }

  async postPlaylistHandler (request, h) {
    // try {
    this._validator.validatePlaylistPayload(request.payload)
    const { name } = request.payload
    const { id: credentialId } = request.auth.credentials

    const playlistId = await this._service.addPlaylist({ name, owner: credentialId })

    const response = h.response({
      status: 'success',
      message: 'Playlist berhasil ditambahkan',
      data: {
        playlistId
      }
    })
    response.code(201)
    return response
    // } catch (error) {
    //   if (error instanceof ClientError) {
    //     const response = h.response({
    //       status: 'fail',
    //       message: error.message
    //     })
    //     response.code(error.statusCode)
    //     return response
    //   }

    //   // Server Error
    //   const response = h.response({
    //     status: 'error',
    //     message: 'Maaf, terjadi kegagalan pada server kami'
    //   })
    //   response.code(500)
    //   console.error(error)
    //   return response
    // }
  }

  async getPlaylistsHandler (request) {
    const { id: credentialId } = request.auth.credentials

    const playlists = await this._service.getPlaylists(credentialId)
    return {
      status: 'success',
      data: {
        playlists: playlists.map(mapPlaylistModel)
      }
    }
  }

  async deletePlaylistByIdHandler (request, h) {
    // try {
    const { playlistId } = request.params
    const { id: credentialId } = request.auth.credentials
    await this._service.verifyPlaylistOwner(playlistId, credentialId)
    await this._service.deletePlaylistById(playlistId)

    return {
      status: 'success',
      message: 'Playlist berhasil dihapus'
    }
    // } catch (error) {
    //   if (error instanceof ClientError) {
    //     const response = h.response({
    //       status: 'fail',
    //       message: error.message
    //     })
    //     response.code(error.statusCode)
    //     return response
    //   }

    //   // Server Error
    //   const response = h.response({
    //     status: 'error',
    //     message: 'Maaf, terjadi kegagalan pada server kami'
    //   })
    //   response.code(500)
    //   console.error(error)
    //   return response
    // }
  }
}

module.exports = PlaylistsHandler
