const imageInput = document.getElementById('imageInput');
const imagePreview = document.getElementById('imagePreview');
const ocrOutput = document.getElementById('ocrOutput');
const processBtn = document.getElementById('processBtn');

let selectedImage = null;

// Handle image selection
imageInput.addEventListener('change', () => {
  const file = imageInput.files[0];
  if (file) {
    selectedImage = file;
    const reader = new FileReader();
    reader.onload = function (e) {
      imagePreview.innerHTML = `<img src="${e.target.result}" style="max-width:100%; border:1px solid #ccc; margin-top:10px;">`;
    };
    reader.readAsDataURL(file);
  }
});

// Handle OCR processing
processBtn.addEventListener('click', () => {
  if (!selectedImage) {
    alert("Please upload or take a photo of the permit first.");
    return;
  }

  ocrOutput.textContent = "Reading text... Please wait.";

  Tesseract.recognize(selectedImage, 'eng')
    .then(({ data: { text } }) => {
      // Display extracted text
      ocrOutput.textContent = text;

      // Save this permit as the latest one
      localStorage.setItem('permitText', text);

      // Add to permit history
      const allPermits = JSON.parse(localStorage.getItem('allPermits') || '[]');
      allPermits.push(text);
      localStorage.setItem('allPermits', JSON.stringify(allPermits));
    })
    .catch(err => {
      console.error("OCR failed:", err);
      ocrOutput.textContent = "Failed to extract text. Try another image.";
    });
});