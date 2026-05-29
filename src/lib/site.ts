export const SITE_BASE_PATH = "";
export const SITE_URL = "https://nvatom.com";

export function withBasePath(path: `/${string}`) {
  return `${SITE_BASE_PATH}${path}`;
}
