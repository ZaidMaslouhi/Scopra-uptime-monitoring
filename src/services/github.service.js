export const getCommits = async ({ owner, repo }) => {
  const endpoint = `${process.env.REACT_APP_GITHUB_API}/repos/${owner}/${repo}/commits?per_page=5`;
  const response = await fetch(endpoint);
  if (response.status == 403)
    return Promise.reject(new Error(response.message));
  return response.json();
};

export const getBranches = async ({ owner, repo }) => {
  const endpoint = `${process.env.REACT_APP_GITHUB_API}/repos/${owner}/${repo}/branches?per_page=5`;
  const response = await fetch(endpoint);
  if (response.status == 403)
    return Promise.reject(new Error(response.message));
  return response.json();
};

export const getPullRequests = async ({ owner, repo }) => {
  const endpoint = `${process.env.REACT_APP_GITHUB_API}/repos/${owner}/${repo}/pulls?per_page=5`;
  const response = await fetch(endpoint);
  if (response.status == 403)
    return Promise.reject(new Error(response.message));
  return response.json();
};
