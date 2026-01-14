const API_BASE_URL = '/api/github';

export const githubApi = {
  getRepos: async (username: string) => {
    const response = await fetch(`${API_BASE_URL}/repos?username=${encodeURIComponent(username)}`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch repos: ${response.status} - ${errorText}`);
    }
    return response.json();
  },

  getRepoDetails: async (owner: string, repo: string) => {
    const response = await fetch(`${API_BASE_URL}/repo/${owner}/${repo}`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch repo details: ${response.status} - ${errorText}`);
    }
    return response.json();
  }
};