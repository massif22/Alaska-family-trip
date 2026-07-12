export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    const contentType = response.headers.get("content-type") || "";

    if (!contentType.includes("text/html")) {
      return response;
    }

    const html = await response.text();
    const updatedHtml = html.replace(
      "and a realistic number of snacks.",
      "and an unrealistic number of snacks."
    );

    return new Response(updatedHtml, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  },
};
