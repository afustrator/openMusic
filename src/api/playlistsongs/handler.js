// const ClientError = require('../../exceptions/ClientError')

class PlaylistsongsHandler {
  constructor (playlistsongsService, playlistsService, validator) {
    this._playlistsongsService = playlistsongsService
    this._playlistsService = playlistsService
    this._validator = validator

    this.postPlaylistSongByIdHandler = this.postPlaylistSongByIdHandler.bind(this)
    this.getPlaylistSongByIdHandler = this.getPlaylistSongByIdHandler.bind(this)
    this.deletePlaylistSongByIdHandler = this.deletePlaylistSongByIdHandler.bind(this)
  }

  async postPlaylistSongByIdHandler (request, h) {
    // try {
    const { id: userId } = request.auth.credentials
    const { playlistId } = request.params

    this._validator.validatePlaylistSongPayload(request.payload)
    const { songId } = request.payload
    await this._playlistsService.verifyPlaylistAccess(playlistId, userId)
    const playlistSongId = await this._playlistsongsService.addPlaylistsong(playlistId, songId)

    const response = h.response({
      status: 'success',
      message: 'Lagu berhasil ditambahkan ke playlist',
      data: {
        playlistSongId
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

  async getPlaylistSongByIdHandler (request, h) {
    // try {
    const { id: userId } = request.auth.credentials
    const { playlistId } = request.params

    await this._playlistsService.verifyPlaylistAccess(playlistId, userId)
    const songs = await this._playlistsongsService.getPlaylistsongs(playlistId)
    return {
      status: 'success',
      data: {
        songs
      }
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
    //     message: 'Maaf, terjadi  kegagalan pada server kami'
    //   })
    //   response.code(500)
    //   console.error(error)
    //   return response
    // }
  }

  async deletePlaylistSongByIdHandler (request, h) {
    // try {
    const { id: userId } = request.auth.credentials
    const { playlistId } = request.params

    this._validator.validatePlaylistSongPayload(request.payload)
    const { songId } = request.payload
    await this._playlistsService.verifyPlaylistAccess(playlistId, userId)
    await this._playlistsongsService.deletePlaylistsong(playlistId, songId)

    return {
      status: 'success',
      message: 'Lagu berhasil dihapus dari playlist'
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

module.exports = PlaylistsongsHandler
