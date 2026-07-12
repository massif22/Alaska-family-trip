const COPY_REPLACEMENTS = [
  [
    "and a realistic number of snacks.",
    "and an unrealistic number of snacks, because morale is measured in granola bars."
  ],
  [
    "Base camp, big scenery, flexible days.",
    "Base camp, big scenery, flexible days, and only mild logistical overconfidence."
  ],
  [
    "Boat day: glaciers, wildlife if we are lucky, cold wind very likely.",
    "Boat day: glaciers, wildlife if we are lucky, cold wind almost certainly filing a formal appearance."
  ],
  [
    "Interior Alaska day: tundra, wildlife spotting, and a bus ride where binoculars become social status.",
    "Interior Alaska day: tundra, wildlife spotting, and a bus ride where binoculars become social status and snacks become diplomacy."
  ],
  [
    "Cars already gone. This morning is about shuttle timing, luggage, passports, and not discovering a missing charger at the airport.",
    "Cars already gone. This morning is about shuttle timing, luggage, passports, and not discovering a missing charger at the airport like it is the final boss."
  ],
];

export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    const contentType = response.headers.get("content-type") || "";

    if (!contentType.includes("text/html")) {
      return response;
    }

    let html = await response.text();
    for (const [before, after] of COPY_REPLACEMENTS) {
      html = html.replace(before, after);
    }

    const headers = new Headers(response.headers);
    headers.delete("content-length");

    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
