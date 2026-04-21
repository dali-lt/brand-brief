window.jsPDF = window.jspdf.jsPDF;

const encoded = new URLSearchParams(window.location.search).get('d');
const data = encoded 
  ? JSON.parse(decodeURIComponent(escape(atob(encoded))))
  : {};

document.getElementById('brief-display').innerHTML = `
  <div class="brief-section">
    <h2><ion-icon name="person-outline"></ion-icon> Client Details</h2>
    <div class="fields-grid">
      <div class="field"><label>Name</label><p class="brief-value">${data.name || '—'}</p></div>
      <div class="field"><label>Company</label><p class="brief-value">${data.company || '—'}</p></div>
      <div class="field"><label>Phone</label><p class="brief-value">${data.phone || '—'}</p></div>
      <div class="field"><label>Email</label><p class="brief-value">${data.email || '—'}</p></div>
    </div>
  </div>

  <div class="brief-section">
    <h2><ion-icon name="sparkles-outline"></ion-icon> Brand Strategy</h2>
    <div class="fields-grid">
      <div class="field full"><label>Brand Name</label><p class="brief-value">${data.brandName || '—'}</p></div>
      <div class="field full"><label>Brand Story</label><p class="brief-value">${data.brandStory || '—'}</p></div>
      <div class="field full"><label>Personality</label><p class="brief-value">${data.personality || '—'}</p></div>
      <div class="field full"><label>Values</label><p class="brief-value">${data.values || '—'}</p></div>
    </div>
  </div>

  <div class="brief-section">
    <h2><ion-icon name="color-palette-outline"></ion-icon> Visual Preferences</h2>
    <div class="fields-grid">
      <div class="field full"><label>Logo Types</label><p class="brief-value">${data.logoTypes || '—'}</p></div>
      <div class="field full"><label>Visual Direction</label><p class="brief-value">${data.visual || '—'}</p></div>
    </div>
  </div>
`;

function downloadPDF() {
  const doc = new jsPDF();
  let y = 20;

  const addField = (label, value) => {
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text(label.toUpperCase(), 16, y);
    y += 6;
    doc.setFontSize(12);
    doc.setTextColor(27, 29, 27);
    const lines = doc.splitTextToSize(value || '—', 170);
    doc.text(lines, 16, y);
    y += (lines.length * 7) + 10;
    if (y > 270) { doc.addPage(); y = 20; }
  };

  doc.setFontSize(22);
  doc.text('PROJECT BRIEF', 16, y);
  y += 15;

  addField('Client Name', data.name);
  addField('Company', data.company);
  addField('Brand Story', data.brandStory);
  addField('Brand Personality', data.personality);
  addField('Logo Types Preferred', data.logoTypes);
  addField('Visual Notes', data.visual);
  addField('Budget', data.budget);

  doc.save(`Brief_${data.brandName || 'Project'}.pdf`);
}
