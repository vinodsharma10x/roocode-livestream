import React, { useState, useEffect } from 'react';
import './EntryForm.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const EntryForm = ({ template, onSubmit, onCancel }) => {
  const [entryData, setEntryData] = useState({
    situation: '',
    task: '',
    action: '',
    result: '',
    tags: [],
    templateType: 'other'
  });
  const [newTag, setNewTag] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [smartSuggestions, setSmartSuggestions] = useState({
    tags: [],
    actions: [],
    metrics: [],
    patterns: []
  });
  const [typingTimers, setTypingTimers] = useState({
    situation: null,
    task: null,
    action: null,
    result: null
  });
  const DEBOUNCE_MS = 350;

  // Initialize form with template data
  useEffect(() => {
    if (template) {
      setEntryData(prev => ({
        ...prev,
        templateType: template.type || 'other'
      }));
    }
  }, [template]);

  // Handle input changes
  const handleInputChange = (field, value) => {
    setEntryData(prev => ({
      ...prev,
      [field]: value
    }));
    debounceFetchSuggestions(field, value);
  };

  // Debounced suggestions fetch per field
  const debounceFetchSuggestions = (field, value) => {
    if (typingTimers[field]) {
      clearTimeout(typingTimers[field]);
    }
    const timerId = setTimeout(() => {
      fetchSmartSuggestions(field, value);
    }, DEBOUNCE_MS);
    setTypingTimers(prev => ({ ...prev, [field]: timerId }));
  };

  // Fetch backend suggestions
  const fetchSmartSuggestions = async (field, text) => {
    try {
      if (!text || text.trim().length < 3) {
        setSmartSuggestions(prev => ({ ...prev, [field]: [] }));
        return;
      }
      const url = new URL(`${API_BASE_URL}/suggestions`);
      url.searchParams.set('field', field);
      url.searchParams.set('q', text);
      const res = await fetch(url.toString());
      if (!res.ok) throw new Error('Failed to fetch suggestions');
      const data = await res.json();
      setSmartSuggestions(data);
    } catch (e) {
      // Non-fatal: keep UI responsive even if suggestions fail
      // console.warn('Suggestion fetch error:', e);
    }
  };

  // Handle tag management
  const addTag = () => {
    if (newTag.trim() && !entryData.tags.includes(newTag.trim())) {
      setEntryData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setEntryData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(entryData);
  };

  // Get prompt for a field based on template
  const getFieldPrompt = (field) => {
    if (template && template[`${field}Prompt`]) {
      return template[`${field}Prompt`];
    }
    
    const prompts = {
      situation: 'Describe the context and situation. What problem or challenge did you face?',
      task: 'What was your specific responsibility or task in this situation?',
      action: 'What actions did you take to address the situation? Be specific about your approach.',
      result: 'What was the outcome of your actions? Quantify the results when possible.'
    };
    
    return prompts[field];
  };

  // Get example for a field based on template
  const getFieldExample = (field) => {
    if (template && template[`example${field.charAt(0).toUpperCase() + field.slice(1)}`]) {
      return template[`example${field.charAt(0).toUpperCase() + field.slice(1)}`];
    }
    
    return '';
  };

  // Handle tag suggestions (local quick suggestions)
  const handleTagInput = (value) => {
    setNewTag(value);
    // In a real app, this could call /api/search/suggestions?q=
    if (value.length > 1) {
      const commonTags = [
        'javascript', 'python', 'java', 'react', 'nodejs', 'express', 
        'mongodb', 'postgresql', 'docker', 'kubernetes', 'aws', 'azure',
        'debugging', 'optimization', 'refactoring', 'testing', 'ci/cd'
      ];
      const filtered = commonTags.filter(tag => 
        tag.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  // Helpers to click-insert a suggestion snippet into current field
  const insertIntoField = (field, text) => {
    setEntryData(prev => ({
      ...prev,
      [field]: prev[field] ? `${prev[field]} ${text}` : text
    }));
  };

  const SuggestionSection = ({ title, items, onClick }) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="smart-suggestions-section">
        <div className="smart-suggestions-title">{title}</div>
        <div className="smart-suggestions-list">
          {items.map(item => (
            <button
              key={item}
              type="button"
              className="smart-suggestion"
              onClick={() => onClick(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="entry-form">
      <h2>Create New Journal Entry</h2>
      <form onSubmit={handleSubmit}>
        {/* Situation Section */}
        <div className="form-section">
          <label htmlFor="situation">
            <h3>Situation</h3>
            <p className="prompt">{getFieldPrompt('situation')}</p>
          </label>
          {getFieldExample('situation') && (
            <div className="example">
              <strong>Example:</strong> {getFieldExample('situation')}
            </div>
          )}
          <textarea
            id="situation"
            value={entryData.situation}
            onChange={(e) => handleInputChange('situation', e.target.value)}
            placeholder="Describe the context and situation..."
            rows="4"
            required
          />
          <SuggestionSection
            title="Suggested Tags"
            items={smartSuggestions.tags}
            onClick={(t) => !entryData.tags.includes(t) && setEntryData(prev => ({ ...prev, tags: [...prev.tags, t] }))}
          />
        </div>

        {/* Task Section */}
        <div className="form-section">
          <label htmlFor="task">
            <h3>Task</h3>
            <p className="prompt">{getFieldPrompt('task')}</p>
          </label>
          {getFieldExample('task') && (
            <div className="example">
              <strong>Example:</strong> {getFieldExample('task')}
            </div>
          )}
          <textarea
            id="task"
            value={entryData.task}
            onChange={(e) => handleInputChange('task', e.target.value)}
            placeholder="What was your specific responsibility?"
            rows="3"
            required
          />
          <SuggestionSection
            title="Suggested Patterns"
            items={smartSuggestions.patterns}
            onClick={(txt) => insertIntoField('task', txt)}
          />
        </div>

        {/* Action Section */}
        <div className="form-section">
          <label htmlFor="action">
            <h3>Action</h3>
            <p className="prompt">{getFieldPrompt('action')}</p>
          </label>
          {getFieldExample('action') && (
            <div className="example">
              <strong>Example:</strong> {getFieldExample('action')}
            </div>
          )}
          <textarea
            id="action"
            value={entryData.action}
            onChange={(e) => handleInputChange('action', e.target.value)}
            placeholder="What steps did you take to address the situation?"
            rows="5"
            required
          />
          <SuggestionSection
            title="Suggested Actions"
            items={smartSuggestions.actions}
            onClick={(txt) => insertIntoField('action', txt)}
          />
        </div>

        {/* Result Section */}
        <div className="form-section">
          <label htmlFor="result">
            <h3>Result</h3>
            <p className="prompt">{getFieldPrompt('result')}</p>
          </label>
          {getFieldExample('result') && (
            <div className="example">
              <strong>Example:</strong> {getFieldExample('result')}
            </div>
          )}
          <textarea
            id="result"
            value={entryData.result}
            onChange={(e) => handleInputChange('result', e.target.value)}
            placeholder="What was the outcome? Include measurable results."
            rows="4"
            required
          />
          <SuggestionSection
            title="Suggested Metrics"
            items={smartSuggestions.metrics}
            onClick={(txt) => insertIntoField('result', txt)}
          />
        </div>

        {/* Tags Section */}
        <div className="form-section">
          <label>
            <h3>Tags</h3>
            <p className="prompt">Add tags for technologies, languages, or skills used</p>
          </label>
          <div className="tag-input-container">
            <div className="tag-input">
              <input
                type="text"
                value={newTag}
                onChange={(e) => handleTagInput(e.target.value)}
                placeholder="Add a tag (e.g., react, python, debugging)"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <button type="button" onClick={addTag}>Add</button>
            </div>
            {suggestions.length > 0 && (
              <div className="tag-suggestions">
                {suggestions.map(suggestion => (
                  <button
                    key={suggestion}
                    type="button"
                    className="suggestion-tag"
                    onClick={() => {
                      setNewTag(suggestion);
                      setSuggestions([]);
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="tags-container">
            {entryData.tags.map(tag => (
              <span key={tag} className="tag">
                {tag}
                <button
                  type="button"
                  className="remove-tag"
                  onClick={() => removeTag(tag)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Save Entry
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EntryForm;