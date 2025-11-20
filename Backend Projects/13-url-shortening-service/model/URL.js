const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const URLSchema = new Schema(
  {
    id: { type: Number },
    url: { type: String, required: true },
    shortCode: { type: String, required: true, unique: true },
    accessCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

URLSchema.plugin(AutoIncrement, {
  id: 'URL_seq',
  inc_field: 'id',
});

module.exports = mongoose.model('URL', URLSchema);
