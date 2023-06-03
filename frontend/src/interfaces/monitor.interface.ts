export interface Monitor {
  name: string;
  id?: string;
  task?: string;
  endpoint: string;
}

function isMonitor(monitor: Monitor | unknown): monitor is Monitor {
  return (monitor as Monitor).name !== undefined;
}

export { isMonitor };
