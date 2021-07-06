/* eslint-disable camelcase */

const mapDBToModel = ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  inserted_at,
  updated_at
}) => ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  insertedAt: inserted_at,
  updatedAt: updated_at
})

const mapSongModel = ({
  id,
  title,
  performer
}) => ({
  id,
  title,
  performer
})

const mapPlaylistModel = ({
  id,
  name,
  username
}) => ({
  id,
  name,
  username
})

module.exports = { mapDBToModel, mapSongModel, mapPlaylistModel }
