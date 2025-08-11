// Initialize EmailJS (if needed for future use)
// emailjs.init("YOUR_EMAILJS_USER_ID");

// Explore Gallery Button
document.getElementById("exploreBtn").addEventListener("click", () => {
  document.getElementById("gallery").classList.remove("hidden");
});

// Lightbox Image Viewer
document.querySelectorAll(".gallery-grid img").forEach(img => {
  img.onclick = () => {
    const lb = document.getElementById("lightbox");
    lb.querySelector("img").src = img.src;
    lb.classList.remove("hidden");
  };
});

document.getElementById("lightbox").onclick = () => {
  document.getElementById("lightbox").classList.add("hidden");
};

// Hamburger Toggle for Mobile Nav
document.getElementById("menu-toggle").addEventListener("click", () => {
  document.getElementById("navbar").classList.toggle("active");
});

// Membership Form Submission → Generate & Download PDF
document.getElementById("contactForm").addEventListener("submit", async e => {
  e.preventDefault();
  const f = e.target;
  const imgFile = f.myPics.files[0];
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF({ unit: "pt", format: "letter" });

  pdf.setFontSize(16);
  pdf.text("Membership Submission", 40, 40);

  let y = 80;

  const fields = {
    Name: f.myName.value,
    Address: f.myAddress.value,
    "Date of Birth": f.myAge.value,
    Gender: f.myGender.value,
    "Contact Number": f.myContact.value,
    Email: f.myEmail.value
  };

  for (const [label, value] of Object.entries(fields)) {
    pdf.text(`${label}: ${value}`, 40, y);
    y += 25;
  }

  const reader = new FileReader();
  reader.onload = () => {
    const imgData = reader.result;

    // Insert the image into the PDF
    pdf.addImage(imgData, 'JPEG', 40, y + 20, 160, 120);

    // Save the PDF locally
    const safeName = f.myName.value.trim().replace(/\s+/g, '_');
    pdf.save(`membership_${safeName}.pdf`);

    alert("Submitted Sucessfully !!");
    f.reset();
  };

  reader.readAsDataURL(imgFile);
});
