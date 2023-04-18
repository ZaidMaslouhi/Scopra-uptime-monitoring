export interface PullRequest {
  id: string;
  url: string;
  title: string;
  number: number;
  user: {
    name: string;
    avatar_url: string;
    date: string;
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toPullRequest(pullRequest: any | null): PullRequest | null {
  if (!pullRequest) return null;
  return {
    id: pullRequest.id,
    url: pullRequest.html_url,
    title: pullRequest.title,
    number: pullRequest.number,
    user: {
      name: pullRequest.user.login,
      avatar_url: pullRequest.user.avatar_url,
      date: pullRequest.created_at,
    },
  } as PullRequest;
}
