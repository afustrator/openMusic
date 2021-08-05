const Joi = require('joi')

const ExportSongsFromPlaylistPayloadSchema = Joi.object({
  targetEmail: Joi.string().email({ tlds: true }).required()
})

module.exports = ExportSongsFromPlaylistPayloadSchema
