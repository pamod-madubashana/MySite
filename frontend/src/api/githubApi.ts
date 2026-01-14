const API_BASE_URL = '/api/github';

export const githubApi = {
  getRepos: async (username: string) => {
    const response = await fetch(`${API_BASE_URL}/repos?username=${encodeURIComponent(username)}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch repos: ${response.statusText}`);
    }
    return response.json();
  },

  getRepoDetails: async (owner: string, repo: string) => {
    const response = await fetch(`${API_BASE_URL}/repo/${owner}/${repo}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch repo details: ${response.statusText}`);
    }
    return response.json();
  }
};