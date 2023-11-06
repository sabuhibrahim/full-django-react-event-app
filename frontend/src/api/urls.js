export const BASE_URL = "http://localhost";
export const BASE_API_URL = BASE_URL + "/api/v1";

export function getImageUrl(path) {
  return BASE_URL + path;
}
