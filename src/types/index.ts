const VIEW_MODE = ["loading", "arNotSupported", "main", "arSession"] as const;
export type ViewMode = (typeof VIEW_MODE)[number];

export type FileState = {
  url: string;
  extension: string;
  aspect: number;
};
