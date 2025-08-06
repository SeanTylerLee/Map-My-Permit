export function parseRouteSteps(text) {
  const lines = text.split('\n');

  return lines.filter(line =>
    line.match(/\b(US|I|SR|HWY|Hwy|FM)-?\s?\d+/i) ||  // highway matches
    line.toLowerCase().includes("take") ||
    line.toLowerCase().includes("continue") ||
    line.toLowerCase().includes("exit") ||
    line.toLowerCase().includes("merge")
  ).map(line => line.trim());
}