
exports.up = pgm => {
  pgm.createTable('songs', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true
    },
    title: {
      type: 'VARCHAR(50)',
      notNull: true
    },
    year: {
      type: 'INTEGER',
      notNull: true
    },
    performer: {
      type: 'VARCHAR(50)',
      notNull: true
    },
    genre: {
      type: 'VARCHAR(50)'
    },
    duration: {
      type: 'INTEGER'
    },
    inserted_at: {
      type: 'VARCHAR(50)',
      notNull: true
    },
    updated_at: {
      type: 'VARCHAR(50)',
      notNull: true
    }
  })
}

exports.down = pgm => {
  pgm.dropTable('songs')
}
