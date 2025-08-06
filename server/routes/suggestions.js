const express = require('express');
const router = express.Router();
const commonLexicon = require('../utils/suggestionLexicon');

// Utility: extract keywords from text
function extractKeywords(text) {
  if (!text) return [];
  const cleaned = text
    .toLowerCase()
    .replace(/[^a-z0-9+#.\- ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const tokens = cleaned.split(' ').filter(Boolean);

  // Stop words tuned for engineering context
  const stop = new Set([
    'the','a','an','and','or','to','of','in','on','for','with','by','is','it','as','at','from',
    'this','that','these','those','be','are','was','were','am','i','we','you','they','he','she',
    'my','our','their','your','its','into','over','under','about','after','before','during',
    'then','than','also','etc','via','per','vs','not','no','yes','if','but'
  ]);

  // Keep tokens that look technical or meaningful
  const keywords = tokens.filter(t => {
    if (stop.has(t)) return false;
    if (t.length <= 2 && !['go','c','ai'].includes(t)) return false;
    return true;
  });

  // Deduplicate
  return [...new Set(keywords)].slice(0, 20);
}

// Given keywords, return suggestions grouped by category
function buildSuggestions(keywords) {
  const suggestions = {
    tags: new Set(),
    actions: new Set(),
    metrics: new Set(),
    patterns: new Set()
  };

  // From lexicon
  keywords.forEach(k => {
    const entry = commonLexicon[k];
    if (entry) {
      (entry.tags || []).forEach(t => suggestions.tags.add(t));
      (entry.actions || []).forEach(a => suggestions.actions.add(a));
      (entry.metrics || []).forEach(m => suggestions.metrics.add(m));
      (entry.patterns || []).forEach(p => suggestions.patterns.add(p));
    }
  });

  // Heuristics for metrics (numbers + % or ms etc.)
  const metricHeuristics = [];
  keywords.forEach(k => {
    if (/^\d+%$/.test(k)) metricHeuristics.push('percentage improvement');
    if (/^\d+ms$/.test(k) || /^\d+s$/.test(k)) metricHeuristics.push('latency');
  });
  metricHeuristics.forEach(m => suggestions.metrics.add(m));

  return {
    tags: Array.from(suggestions.tags).slice(0, 15),
    actions: Array.from(suggestions.actions).slice(0, 15),
    metrics: Array.from(suggestions.metrics).slice(0, 10),
    patterns: Array.from(suggestions.patterns).slice(0, 10)
  };
}

// GET /api/suggestions?field=situation|task|action|result&q=...
router.get('/', async (req, res) => {
  try {
    const { field, q } = req.query;
    if (!q) return res.json({ tags: [], actions: [], metrics: [], patterns: [] });

    const keywords = extractKeywords(q);
    const result = buildSuggestions(keywords);

    // Simple field-based weighting (optional extension)
    if (field === 'action') {
      // prioritize actions for action field
      result.actions = [...result.actions, 'created runbook', 'added unit tests', 'added tracing']
        .filter((v, i, a) => a.indexOf(v) === i)
        .slice(0, 15);
    }
    if (field === 'result') {
      result.metrics = [...result.metrics, 'reduced p95 latency', 'increased throughput', 'reduced error rate']
        .filter((v, i, a) => a.indexOf(v) === i)
        .slice(0, 10);
    }

    res.json(result);
  } catch (e) {
    res.status(500).json({ message: 'Failed to build suggestions' });
  }
});

module.exports = router;