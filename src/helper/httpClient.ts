export const httpClient = async (
  endpoint: string,
  config = {
    method: "GET",
  } as any
) => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;
  let options:any = {
    method: config.method,
  };

  let headers = new Headers();

  if (config.payload) {
    headers.append("Content-Type", "application/json");
    options.body = JSON.stringify(config.payload);
  }

  if (config.queryParams) {
    url += `?${new URLSearchParams(config.queryParams).toString()}`;
  }

  options.headers = headers;
  options.credentials = "include";

  try {
    const response = await fetch(url, options)
    const data = await response.json();
    // network_error.set(false);
    return data;
  } catch (error) {
    // network_error.set(true);
    return error;
  }
};
