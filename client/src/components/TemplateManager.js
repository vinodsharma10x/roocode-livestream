import React, { useState, useEffect } from 'react';
import './TemplateManager.css';

const TemplateManager = ({ templates, onSaveTemplate, onDeleteTemplate }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [templateData, setTemplateData] = useState({
    name: '',
    type: 'other',
    description: '',
    situationPrompt: '',
    taskPrompt: '',
    actionPrompt: '',
    resultPrompt: '',
    exampleSituation: '',
    exampleTask: '',
    exampleAction: '',
    exampleResult: '',
    tags: []
  });
  const [newTag, setNewTag] = useState('');

  // Template types for the dropdown
  const templateTypes = [
    { value: 'debugging', label: 'Debugging' },
    { value: 'feature-implementation', label: 'Feature Implementation' },
    { value: 'code-optimization', label: 'Code Optimization' },
    { value: 'collaborative-work', label: 'Collaborative Work' },
    { value: 'other', label: 'Other' },
    { value: 'custom', label: 'Custom' }
  ];

  // Reset form when creating or editing
  useEffect(() => {
    if (isCreating || editingTemplate) {
      if (editingTemplate) {
        setTemplateData({
          name: editingTemplate.name || '',
          type: editingTemplate.type || 'other',
          description: editingTemplate.description || '',
          situationPrompt: editingTemplate.situationPrompt || '',
          taskPrompt: editingTemplate.taskPrompt || '',
          actionPrompt: editingTemplate.actionPrompt || '',
          resultPrompt: editingTemplate.resultPrompt || '',
          exampleSituation: editingTemplate.exampleSituation || '',
          exampleTask: editingTemplate.exampleTask || '',
          exampleAction: editingTemplate.exampleAction || '',
          exampleResult: editingTemplate.exampleResult || '',
          tags: editingTemplate.tags || []
        });
      } else {
        setTemplateData({
          name: '',
          type: 'other',
          description: '',
          situationPrompt: '',
          taskPrompt: '',
          actionPrompt: '',
          resultPrompt: '',
          exampleSituation: '',
          exampleTask: '',
          exampleAction: '',
          exampleResult: '',
          tags: []
        });
      }
      setNewTag('');
    }
  }, [isCreating, editingTemplate]);

  // Handle input changes
  const handleInputChange = (field, value) => {
    setTemplateData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle tag management
  const addTag = () => {
    if (newTag.trim() && !templateData.tags.includes(newTag.trim())) {
      setTemplateData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTemplateData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTemplate) {
      onSaveTemplate({ ...templateData, _id: editingTemplate._id });
    } else {
      onSaveTemplate(templateData);
    }
    handleCancel();
  };

  // Handle cancel
  const handleCancel = () => {
    setIsCreating(false);
    setEditingTemplate(null);
  };

  // Handle edit template
  const handleEditTemplate = (template) => {
    setEditingTemplate(template);
  };

  // Handle delete template
  const handleDeleteTemplate = (templateId) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      onDeleteTemplate(templateId);
    }
  };

  // Group templates by type
  const groupTemplatesByType = (templatesList) => {
    const grouped = {};
    templatesList.forEach(template => {
      if (!grouped[template.type]) {
        grouped[template.type] = [];
      }
      grouped[template.type].push(template);
    });
    return grouped;
  };

  const groupedTemplates = groupTemplatesByType(templates);

  // Get display name for template type
  const getTypeDisplayName = (type) => {
    const typeObj = templateTypes.find(t => t.value === type);
    return typeObj ? typeObj.label : type;
  };

  if (isCreating || editingTemplate) {
    return (
      <div className="template-manager">
        <div className="template-form-header">
          <h2>{editingTemplate ? 'Edit Template' : 'Create New Template'}</h2>
          <button className="btn btn-secondary" onClick={handleCancel}>
            ← Back to Templates
          </button>
        </div>

        <form onSubmit={handleSubmit} className="template-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Template Name *</label>
              <input
                type="text"
                id="name"
                value={templateData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="type">Template Type *</label>
              <select
                id="type"
                value={templateData.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
                required
              >
                {templateTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={templateData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows="2"
            />
          </div>

          <div className="form-section">
            <h3>STAR Prompts</h3>
            
            <div className="form-group">
              <label htmlFor="situationPrompt">Situation Prompt *</label>
              <textarea
                id="situationPrompt"
                value={templateData.situationPrompt}
                onChange={(e) => handleInputChange('situationPrompt', e.target.value)}
                rows="2"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="taskPrompt">Task Prompt *</label>
              <textarea
                id="taskPrompt"
                value={templateData.taskPrompt}
                onChange={(e) => handleInputChange('taskPrompt', e.target.value)}
                rows="2"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="actionPrompt">Action Prompt *</label>
              <textarea
                id="actionPrompt"
                value={templateData.actionPrompt}
                onChange={(e) => handleInputChange('actionPrompt', e.target.value)}
                rows="2"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="resultPrompt">Result Prompt *</label>
              <textarea
                id="resultPrompt"
                value={templateData.resultPrompt}
                onChange={(e) => handleInputChange('resultPrompt', e.target.value)}
                rows="2"
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Example Responses (Optional)</h3>
            
            <div className="form-group">
              <label htmlFor="exampleSituation">Example Situation</label>
              <textarea
                id="exampleSituation"
                value={templateData.exampleSituation}
                onChange={(e) => handleInputChange('exampleSituation', e.target.value)}
                rows="2"
              />
            </div>

            <div className="form-group">
              <label htmlFor="exampleTask">Example Task</label>
              <textarea
                id="exampleTask"
                value={templateData.exampleTask}
                onChange={(e) => handleInputChange('exampleTask', e.target.value)}
                rows="2"
              />
            </div>

            <div className="form-group">
              <label htmlFor="exampleAction">Example Action</label>
              <textarea
                id="exampleAction"
                value={templateData.exampleAction}
                onChange={(e) => handleInputChange('exampleAction', e.target.value)}
                rows="2"
              />
            </div>

            <div className="form-group">
              <label htmlFor="exampleResult">Example Result</label>
              <textarea
                id="exampleResult"
                value={templateData.exampleResult}
                onChange={(e) => handleInputChange('exampleResult', e.target.value)}
                rows="2"
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Tags</h3>
            <div className="tag-input-container">
              <div className="tag-input">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <button type="button" onClick={addTag}>Add</button>
              </div>
            </div>
            <div className="tags-container">
              {templateData.tags.map(tag => (
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

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {editingTemplate ? 'Update Template' : 'Create Template'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="template-manager">
      <div className="template-manager-header">
        <h2>Template Management</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setIsCreating(true)}
        >
          Create New Template
        </button>
      </div>

      <div className="template-groups">
        {Object.keys(groupedTemplates).map(type => (
          <div key={type} className="template-group">
            <h3>{getTypeDisplayName(type)}</h3>
            <div className="templates-grid">
              {groupedTemplates[type].map(template => (
                <div key={template._id} className="template-card">
                  <div className="template-card-header">
                    <h4>{template.name}</h4>
                    <div className="template-card-actions">
                      <button 
                        className="btn-icon"
                        onClick={() => handleEditTemplate(template)}
                        title="Edit"
                      >
                        ✏️
                      </button>
                      {!template.isDefault && (
                        <button 
                          className="btn-icon"
                          onClick={() => handleDeleteTemplate(template._id)}
                          title="Delete"
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="template-description">{template.description}</p>
                  <div className="template-tags">
                    {template.tags && template.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                    {template.tags && template.tags.length > 3 && (
                      <span className="tag more">+{template.tags.length - 3} more</span>
                    )}
                  </div>
                  {template.isDefault && (
                    <div className="default-badge">Default</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {templates.length === 0 && (
        <div className="no-templates">
          <p>No templates found.</p>
          <button 
            className="btn btn-primary"
            onClick={() => setIsCreating(true)}
          >
            Create Your First Template
          </button>
        </div>
      )}
    </div>
  );
};

export default TemplateManager;