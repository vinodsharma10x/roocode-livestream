const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  // Helper method for making API requests
  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  // Authentication methods
  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  }

  async getCurrentUser(token) {
    return this.request('/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  // Journal entries methods
  async getEntries(token) {
    return this.request('/entries', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  async getEntry(id, token) {
    return this.request(`/entries/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  async createEntry(entryData, token) {
    return this.request('/entries', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(entryData)
    });
  }

  async updateEntry(id, entryData, token) {
    return this.request(`/entries/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(entryData)
    });
  }

  async deleteEntry(id, token) {
    return this.request(`/entries/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  // Templates methods
  async getTemplates(token) {
    return this.request('/templates', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  async getDefaultTemplates(token) {
    return this.request('/templates/default', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  async getTemplate(id, token) {
    return this.request(`/templates/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  async createTemplate(templateData, token) {
    return this.request('/templates', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(templateData)
    });
  }

  async updateTemplate(id, templateData, token) {
    return this.request(`/templates/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(templateData)
    });
  }

  async deleteTemplate(id, token) {
    return this.request(`/templates/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  // Tags methods
  async getTags(token) {
    return this.request('/tags', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  async getEntriesByTag(tag, token) {
    return this.request(`/tags/${tag}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  async getPopularTags(token) {
    return this.request('/tags/stats/popular', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  // Search methods
  async searchEntries(queryParams, token) {
    const queryString = new URLSearchParams(queryParams).toString();
    const endpoint = `/search${queryString ? `?${queryString}` : ''}`;
    
    return this.request(endpoint, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  async getSearchSuggestions(query, token) {
    return this.request(`/search/suggestions?q=${encodeURIComponent(query)}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;