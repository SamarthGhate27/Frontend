const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: "include",
  });
}

export async function getErrorMessage(response: Response): Promise<string> {
  try {
    const data = await response.json();
    return (
      (typeof data.message === "string" && data.message) ||
      (typeof data.error === "string" && data.error) ||
      "Something went wrong"
    );
  } catch {
    return "Something went wrong";
  }
}
