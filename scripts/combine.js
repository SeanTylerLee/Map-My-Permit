const permitListDiv = document.getElementById("permitList");

const permits = JSON.parse(localStorage.getItem("allPermits") || "[]");

if (permits.length === 0) {
  permitListDiv.innerHTML = "<p>No saved permits found.</p>";
} else {
  permitListDiv.innerHTML = permits
    .map((text, index) => `
      <label>
        <input type="checkbox" value="${index}" checked>
        Permit ${index + 1}
      </label>
      <pre>${text}</pre>
      <hr>
    `)
    .join('');
}

function combineSelected() {
  const selectedIndexes = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
    .map(cb => parseInt(cb.value));

  const combinedText = selectedIndexes.map(i => permits[i]).join('\n');

  localStorage.setItem("permitText", combinedText);

  window.location.href = "routes.html"; // back to route parsing page
}