const express = require('express');
const router = express.Router();
const JournalEntry = require('../models/JournalEntry');

// Search entries by keyword
router.get('/', async (req, res) => {
  try {
    const { q, tag, templateType, startDate, endDate } = req.query;
    let query = {};

    // Text search across all STAR fields
    if (q) {
      query.$or = [
        { situation: { $regex: q, $options: 'i' } },
        { task: { $regex: q, $options: 'i' } },
        { action: { $regex: q, $options: 'i' } },
        { result: { $regex: q, $options: 'i' } }
      ];
    }

    // Filter by tag
    if (tag) {
      query.tags = { $in: [tag] };
    }

    // Filter by template type
    if (templateType) {
      query.templateType = templateType;
    }

    // Filter by date range
    if (startDate || endDate) {
      query.date = {};
      if (startDate) {
        query.date.$gte = new Date(startDate);
      }
      if (endDate) {
        query.date.$lte = new Date(endDate);
      }
    }

    const entries = await JournalEntry.find(query).sort({ date: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get search suggestions
router.get('/suggestions', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.json([]);
    }

    // Search for tags that match the query
    const entries = await JournalEntry.find(
      { tags: { $regex: q, $options: 'i' } },
      { tags: 1 }
    );
    
    const allTags = entries.flatMap(entry => entry.tags || []);
    const matchingTags = [...new Set(allTags)]
      .filter(tag => tag.toLowerCase().includes(q.toLowerCase()))
      .slice(0, 10);

    res.json(matchingTags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;