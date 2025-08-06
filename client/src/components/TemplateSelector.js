import React, { useState, useEffect } from 'react';
import './TemplateSelector.css';

const TemplateSelector = ({ templates, onSelectTemplate, onUseBlank }) => {
  const [filteredTemplates, setFilteredTemplates] = useState(templates);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter templates based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredTemplates(templates);
    } else {
      const filtered = templates.filter(template => 
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTemplates(filtered);
    }
  }, [searchTerm, templates]);

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

  const groupedTemplates = groupTemplatesByType(filteredTemplates);

  // Get display name for template type
  const getTypeDisplayName = (type) => {
    const typeNames = {
      'debugging': 'Debugging',
      'feature-implementation': 'Feature Implementation',
      'code-optimization': 'Code Optimization',
      'collaborative-work': 'Collaborative Work',
      'other': 'Other',
      'custom': 'Custom'
    };
    return typeNames[type] || type;
  };

  return (
    <div className="template-selector">
      <div className="template-header">
        <h2>Choose a Template</h2>
        <p>Select a template to guide your STAR journal entry, or start with a blank entry</p>
      </div>

      <div className="template-search">
        <input
          type="text"
          placeholder="Search templates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="template-actions">
        <button 
          className="btn btn-primary btn-large"
          onClick={onUseBlank}
        >
          Start with Blank Entry
        </button>
      </div>

      <div className="template-groups">
        {Object.keys(groupedTemplates).map(type => (
          <div key={type} className="template-group">
            <h3>{getTypeDisplayName(type)}</h3>
            <div className="templates-grid">
              {groupedTemplates[type].map(template => (
                <div 
                  key={template._id} 
                  className="template-card"
                  onClick={() => onSelectTemplate(template)}
                >
                  <div className="template-icon">
                    {template.isDefault ? '⭐' : '📝'}
                  </div>
                  <h4>{template.name}</h4>
                  <p className="template-description">{template.description}</p>
                  <div className="template-tags">
                    {template.tags && template.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                    {template.tags && template.tags.length > 3 && (
                      <span className="tag more">+{template.tags.length - 3} more</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="no-templates">
          <p>No templates found matching your search.</p>
          <button 
            className="btn btn-secondary"
            onClick={() => setSearchTerm('')}
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;