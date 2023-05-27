export interface Issue {
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
export function toIssue(issue: any | null): Issue | null {
  if (!issue) return null;
  return {
    id: issue.id,
    url: issue.html_url,
    title: issue.title,
    number: issue.number,
    user: {
      name: issue.user.login,
      avatar_url: issue.user.avatar_url,
      date: issue.created_at,
    },
  } as Issue;
}
