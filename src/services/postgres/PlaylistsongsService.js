const { nanoid } = require('nanoid')
const { Pool } = require('pg')
const InvariantError = require('../../exceptions/InvariantError')
const { mapSongModel } = require('../../utils/mapDBToModel')

class PlaylistsongsService {
  constructor (cacheService) {
    this._pool = new Pool()
    this._cacheService = cacheService
  }

  async addPlaylistsong (playlistId, songId) {
    const id = `playlistsong-${nanoid(16)}`

    const query = {
      text: 'INSERT INTO playlistsongs VALUES($1, $2, $3) RETURNING id',
      values: [id, playlistId, songId]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new InvariantError('Lagu gagal ditambahkan ke playlist')
    }

    await this._cacheService.delete(`songs:${playlistId}`)
    return result.rows[0].id
  }

  async getPlaylistsongs (playlistId) {
    try {
      // mendapatkan lagu dari cache
      const result = await this._cacheService.get(`songs:${playlistId}`)
      return JSON.parse(result)
    } catch (error) {
      // bila gagal, diteruskan dengan mendapatkan lagu dari database
      const query = {
        text: `SELECT songs.* FROM playlistsongs
        INNER JOIN songs ON songs.id = playlistsongs.song_id
        WHERE playlistsongs.playlist_id = $1`,
        values: [playlistId]
      }

      const result = await this._pool.query(query)
      const mappedResult = result.rows.map(mapSongModel)

      // lagu akan disimpan pada cache sebelum fungsi getPlaylistsongs dikembalikan
      await this._cacheService.set(`songs:${playlistId}`, JSON.stringify(mappedResult))

      return mappedResult
    }
  }

  async deletePlaylistsong (playlistId, songId) {
    const query = {
      text: 'DELETE FROM playlistsongs WHERE playlist_id = $1 AND song_id = $2 RETURNING id',
      values: [playlistId, songId]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new InvariantError('Lagu gagal dihapus dari playlist')
    }

    await this._cacheService.delete(`songs:${playlistId}`)
  }
}

module.exports = PlaylistsongsService
