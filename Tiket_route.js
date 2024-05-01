const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/tickets - Get all tickets
router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST /api/tickets - Create a new ticket
router.post('/', async (req, res) => {
  try {
    const { description, category, urgency } = req.body;
    const ticket = new Ticket({
      description,
      category,
      urgency,
    });
    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// PUT /api/tickets/:id - Update a ticket by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description, category, urgency } = req.body;
    const updatedTicket = await Ticket.findByIdAndUpdate(id, { description, category, urgency }, { new: true });
    res.json(updatedTicket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// DELETE /api/tickets/:id - Delete a ticket by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Ticket.findByIdAndDelete(id);
    res.json({ message: 'Ticket deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
