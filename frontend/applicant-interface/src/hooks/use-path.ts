const CDN_BASE = import.meta.env.VITE_CDN_URL;
const API_BASE = import.meta.env.VITE_BASE_URL;

export const useResFullPath = (path: string | null | undefined) => {
  if (!path) return "";
  return `${CDN_BASE}/${path.replace(/^\//, "")}`;
};
export const useResRelativePath = (path: string | null | undefined) => {
  if (!path) return "";
  return `${path.replace(`${CDN_BASE}`, "")}`;
};

export const useApiFullPath = (path: string | null | undefined) => {
  if (!path) return "";
  return `${API_BASE}/${path.replace(/^\//, "")}`;
};
export const useApiRelativePath = (path: string | null | undefined) => {
  if (!path) return "";
  return `${path.replace(`${API_BASE}`, "")}`;
};
