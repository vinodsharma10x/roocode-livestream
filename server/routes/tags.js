const express = require('express');
const router = express.Router();
const JournalEntry = require('../models/JournalEntry');

// Get all unique tags
router.get('/', async (req, res) => {
  try {
    const entries = await JournalEntry.find({}, { tags: 1 });
    const allTags = entries.flatMap(entry => entry.tags || []);
    const uniqueTags = [...new Set(allTags)].sort();
    res.json(uniqueTags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get entries by tag
router.get('/:tag', async (req, res) => {
  try {
    const entries = await JournalEntry.find({ tags: req.params.tag }).sort({ date: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get tag statistics
router.get('/stats/popular', async (req, res) => {
  try {
    const entries = await JournalEntry.find({}, { tags: 1 });
    const tagCounts = {};
    
    entries.forEach(entry => {
      if (entry.tags) {
        entry.tags.forEach(tag => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      }
    });
    
    // Convert to array and sort by count
    const sortedTags = Object.entries(tagCounts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);
    
    res.json(sortedTags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;