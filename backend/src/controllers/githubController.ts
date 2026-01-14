import { Request, Response } from 'express';
import axios from 'axios';

export const getGithubRepos = async (req: Request, res: Response) => {
  try {
    const { username, sort = 'updated', direction = 'desc', page = 1, per_page = 10 } = req.query;
    
    if (!username) {
      return res.status(400).json({ error: 'GitHub username is required' });
    }
    
    const response = await axios.get<any[]>(`https://api.github.com/users/${username}/repos`, {
      params: {
        sort,
        direction,
        page,
        per_page,
        type: 'all'
      },
      headers: {
        Accept: 'application/vnd.github.v3+json',
        ...(process.env.GITHUB_TOKEN && { Authorization: `token ${process.env.GITHUB_TOKEN}` })
      }
    });
    
    // Filter out private repos if no token is provided
    let repos: any[] = response.data;
    if (!process.env.GITHUB_TOKEN) {
      repos = repos.filter((repo: any) => !repo.private);
    }
    
    // Add additional details for each repo
    const detailedRepos = await Promise.all(repos.map(async (repo: any) => {
      try {
        const languagesResponse = await axios.get<{[key: string]: number}>(repo.languages_url, {
          headers: {
            Accept: 'application/vnd.github.v3+json',
            ...(process.env.GITHUB_TOKEN && { Authorization: `token ${process.env.GITHUB_TOKEN}` })
          }
        });
        
        const languagesData = languagesResponse.data || {};
        const languages = Object.entries(languagesData)
          .sort(([_, a], [__, b]) => (b as number) - (a as number))
          .slice(0, 3)
          .map(([lang]) => lang);
        
        return {
          id: repo.id,
          name: repo.name,
          fullName: repo.full_name,
          description: repo.description,
          htmlUrl: repo.html_url,
          stargazersCount: repo.stargazers_count,
          forksCount: repo.forks_count,
          language: repo.language,
          languages: languages,
          updatedAt: repo.updated_at,
          createdAt: repo.created_at,
          size: repo.size,
          defaultBranch: repo.default_branch,
          topics: repo.topics,
          visibility: repo.private ? 'private' : 'public'
        };
      } catch (error: unknown) {
        // If we can't get languages, return basic info
        return {
          id: repo.id,
          name: repo.name,
          fullName: repo.full_name,
          description: repo.description,
          htmlUrl: repo.html_url,
          stargazersCount: repo.stargazers_count,
          forksCount: repo.forks_count,
          language: repo.language,
          languages: repo.language ? [repo.language] : [],
          updatedAt: repo.updated_at,
          createdAt: repo.created_at,
          size: repo.size,
          defaultBranch: repo.default_branch,
          topics: repo.topics,
          visibility: repo.private ? 'private' : 'public'
        };
      }
    }));
    
    res.json(detailedRepos);
  } catch (error: unknown) {
    if (error instanceof Error && 'response' in error) {
      const axiosError = error as any;
      if (axiosError.response?.status === 404) {
        return res.status(404).json({ error: 'GitHub user not found' });
      }
      if (axiosError.response?.status === 403) {
        return res.status(403).json({ error: 'GitHub API rate limit exceeded' });
      }
    }
    res.status(500).json({ error: 'Server error while fetching GitHub repositories' });
  }
};

export const getRepoDetails = async (req: Request, res: Response) => {
  try {
    const { owner, repo } = req.params;
    
    const repoResponse = await axios.get<any>(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        ...(process.env.GITHUB_TOKEN && { Authorization: `token ${process.env.GITHUB_TOKEN}` })
      }
    });
    
    const languagesResponse = await axios.get<{[key: string]: number}>(`https://api.github.com/repos/${owner}/${repo}/languages`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        ...(process.env.GITHUB_TOKEN && { Authorization: `token ${process.env.GITHUB_TOKEN}` })
      }
    });
    
    const contributorsResponse = await axios.get<any[]>(`https://api.github.com/repos/${owner}/${repo}/contributors`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        ...(process.env.GITHUB_TOKEN && { Authorization: `token ${process.env.GITHUB_TOKEN}` })
      }
    });
    
    const repoData = repoResponse.data;
    const languagesData = languagesResponse.data || {};
    const languages = Object.entries(languagesData)
      .sort(([_, a], [__, b]) => (b as number) - (a as number))
      .slice(0, 5)
      .map(([lang, bytes]) => ({ language: lang, bytes: bytes as number }));
    
    const contributors = contributorsResponse.data.slice(0, 10).map((contributor: any) => ({
      login: contributor.login,
      contributions: contributor.contributions,
      avatarUrl: contributor.avatar_url,
      htmlUrl: contributor.html_url
    }));
    
    res.json({
      id: repoData.id,
      name: repoData.name,
      fullName: repoData.full_name,
      description: repoData.description,
      htmlUrl: repoData.html_url,
      homepage: repoData.homepage || null,
      stargazersCount: repoData.stargazers_count,
      watchersCount: repoData.watchers_count,
      forksCount: repoData.forks_count,
      openIssuesCount: repoData.open_issues_count,
      language: repoData.language,
      languages,
      size: repoData.size,
      defaultBranch: repoData.default_branch,
      topics: repoData.topics,
      license: repoData.license?.name || null,
      visibility: repoData.private ? 'private' : 'public',
      createdAt: repoData.created_at,
      updatedAt: repoData.updated_at,
      cloneUrl: repoData.clone_url,
      sshUrl: repoData.ssh_url,
      contributors
    });
  } catch (error: unknown) {
    if (error instanceof Error && 'response' in error) {
      const axiosError = error as any;
      if (axiosError.response?.status === 404) {
        return res.status(404).json({ error: 'Repository not found' });
      }
      if (axiosError.response?.status === 403) {
        return res.status(403).json({ error: 'GitHub API rate limit exceeded' });
      }
    }
    res.status(500).json({ error: 'Server error while fetching repository details' });
  }
};