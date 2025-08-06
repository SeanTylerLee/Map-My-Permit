const permitTextArea = document.getElementById('permitTextArea');
const routeOutput = document.getElementById('routeOutput');

// Load saved permit text from localStorage
const savedText = localStorage.getItem('permitText');
if (savedText) permitTextArea.value = savedText;

function extractRoute() {
  const text = permitTextArea.value;

  // VERY basic routing logic (placeholder for AI parsing)
  const routeLines = text
    .split('\n')
    .filter(line =>
      line.toLowerCase().includes('take') ||
      line.toLowerCase().includes('merge') ||
      line.toLowerCase().includes('exit') ||
      line.toLowerCase().includes('continue') ||
      line.match(/I-\d+|US-\d+|SR-\d+/)
    );

  const cleanRoutes = routeLines.map(l => l.trim()).filter(l => l.length > 0);
  routeOutput.textContent = cleanRoutes.join('\n');

  // Save extracted route for next step
  localStorage.setItem('parsedRoute', JSON.stringify(cleanRoutes));
}