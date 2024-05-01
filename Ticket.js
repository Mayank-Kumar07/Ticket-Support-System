const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  category: String,
  urgency: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Ticket', ticketSchema);
