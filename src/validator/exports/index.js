const ExportSongsFromPlaylistPayloadSchema = require('./schema')
const InvariantError = require('../../exceptions/InvariantError')

const ExportsValidator = {
  validateExportSongsFromPlaylistPayload: (payload) => {
    const validationResult = ExportSongsFromPlaylistPayloadSchema.validate(payload)

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message)
    }
  }
}

module.exports = ExportsValidator
