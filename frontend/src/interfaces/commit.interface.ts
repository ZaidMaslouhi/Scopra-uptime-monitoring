
export interface Commit {
  id: string;
  url: string;
  message: string;
  committer: {
    name: string;
    avatar_url: string;
    date: string;
  };
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toCommit(commit: any | null): Commit | null {
  if (!commit) return null;
  return {
    id: commit["sha"],
    url: commit.html_url,
    message: commit.commit?.message,
    committer: {
      name: commit.commit?.committer.name,
      avatar_url: commit.committer?.avatar_url,
      date: commit.commit?.committer.date,
    },
  } as Commit;
}
