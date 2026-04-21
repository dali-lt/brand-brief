window.jsPDF = window.jspdf.jsPDF;

const encoded = new URLSearchParams(window.location.search).get('d');
const data = encoded
  ? JSON.parse(decodeURIComponent(escape(atob(encoded))))
  : {};

document.getElementById('brief-display').innerHTML = `

  <div class="brief-section">
    <h2><ion-icon name="person-outline"></ion-icon> Client Info</h2>
    <div class="fields-grid">
      <div class="field"><label>Client's Name</label><p class="brief-value">${data.name || '—'}</p></div>
      <div class="field"><label>Company</label><p class="brief-value">${data.company || '—'}</p></div>
      <div class="field"><label>Phone</label><p class="brief-value">${data.phone || '—'}</p></div>
      <div class="field"><label>Email</label><p class="brief-value">${data.email || '—'}</p></div>
      <div class="field full"><label>Website / Social Media</label><p class="brief-value">${data.website || '—'}</p></div>
    </div>
  </div>

  <div class="brief-section">
    <h2><ion-icon name="sparkles-outline"></ion-icon> Brand Identity</h2>
    <div class="fields-grid">
      <div class="field"><label>Brand Name</label><p class="brief-value">${data.brandName || '—'}</p></div>
      <div class="field"><label>Tagline</label><p class="brief-value">${data.tagline || '—'}</p></div>
      <div class="field full"><label>Story Behind the Name</label><p class="brief-value">${data.brandStory || '—'}</p></div>
      <div class="field full"><label>Service or Product</label><p class="brief-value">${data.service || '—'}</p></div>
      <div class="field full"><label>Brand Message</label><p class="brief-value">${data.message || '—'}</p></div>
    </div>
  </div>

  <div class="brief-section">
    <h2><ion-icon name="people-outline"></ion-icon> Target Audience</h2>
    <div class="fields-grid">
      <div class="field full"><label>Age, Gender, Lifestyle</label><p class="brief-value">${data.audience || '—'}</p></div>
      <div class="field full"><label>Problem & Solution</label><p class="brief-value">${data.problem || '—'}</p></div>
    </div>
  </div>

  <div class="brief-section">
    <h2><ion-icon name="color-palette-outline"></ion-icon> Brand Personality</h2>
    <div class="fields-grid">
      <div class="field full"><label>Personality</label><p class="brief-value">${data.personality || '—'}</p></div>
      <div class="field full"><label>Values</label><p class="brief-value">${data.values || '—'}</p></div>
      <div class="field full"><label>What makes it different</label><p class="brief-value">${data.different || '—'}</p></div>
    </div>
  </div>

  <div class="brief-section">
    <h2><ion-icon name="podium-outline"></ion-icon> Competition & Vision</h2>
    <div class="fields-grid">
      <div class="field full"><label>Top 3 Competitors</label><p class="brief-value">${data.competitors || '—'}</p></div>
      <div class="field full"><label>Vision / Future Goal</label><p class="brief-value">${data.vision || '—'}</p></div>
    </div>
  </div>

  <div class="brief-section">
    <h2><ion-icon name="eye-outline"></ion-icon> Visual Preferences</h2>
    <div class="fields-grid">
      <div class="field"><label>Has a Logo?</label><p class="brief-value">${data.logo || '—'}</p></div>
      <div class="field"><label>Logo Types</label><p class="brief-value">${data.logoTypes || '—'}</p></div>
      <div class="field full"><label>Visual Preferences</label><p class="brief-value">${data.visual || '—'}</p></div>
    </div>
  </div>

  <div class="brief-section">
    <h2><ion-icon name="stats-chart-outline"></ion-icon> Project Parameters</h2>
    <div class="fields-grid">
      <div class="field"><label>Deadline</label><p class="brief-value">${data.deadline || '—'}</p></div>
      <div class="field"><label>Budget</label><p class="brief-value">${data.budget || '—'}</p></div>
      <div class="field full"><label>Additional Info</label><p class="brief-value">${data.extra || '—'}</p></div>
    </div>
  </div>

`;

function downloadPDF() {
  const doc = new jsPDF();
  const orange = [255, 63, 26];
  const black  = [27, 29, 27];
  const white  = [255, 255, 255];
  const gray   = [150, 150, 150];
  const lightgray = [240, 240, 240];

  let y = 0;

  // Header
  doc.setFillColor(...black);
  doc.rect(0, 0, 210, 45, 'F');
  doc.setTextColor(...white);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('BRAND DISCOVERY', 16, 20);
  doc.setTextColor(...orange);
  doc.setFontSize(22);
  doc.text('BRIEF.', 16, 34);
  doc.setTextColor(...gray);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Mohamed Ali Louati — Brand Identity Designer', 105, 20);
  doc.text(`Date: ${data.date || ''}`, 105, 30);

  y = 58;

  function addSection(title, icon) {
    if (y > 260) { doc.addPage(); y = 20; }
    doc.setFillColor(...orange);
    doc.rect(16, y - 4, 3, 8, 'F');
    doc.setTextColor(...orange);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(`${icon}  ${title.toUpperCase()}`, 22, y + 2);
    doc.setDrawColor(...lightgray);
    doc.line(16, y + 6, 194, y + 6);
    y += 14;
  }

  function addField(label, value) {
    if (y > 265) { doc.addPage(); y = 20; }
    doc.setTextColor(...gray);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(label.toUpperCase(), 16, y);
    y += 5;
    const lines = doc.splitTextToSize(value || '—', 162);
    const boxH = lines.length * 6 + 8;
    doc.setFillColor(...lightgray);
    doc.roundedRect(16, y, 178, boxH, 3, 3, 'F');
    doc.setTextColor(...black);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(lines, 22, y + 6);
    y += boxH + 10;
  }

  function addFieldHalf(label, value, x) {
    doc.setTextColor(...gray);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(label.toUpperCase(), x, y);
    const lines = doc.splitTextToSize(value || '—', 76);
    const boxH = lines.length * 6 + 8;
    doc.setFillColor(...lightgray);
    doc.roundedRect(x, y + 5, 84, boxH, 3, 3, 'F');
    doc.setTextColor(...black);
    doc.setFontSize(10);
    doc.text(lines, x + 6, y + 11);
    return boxH;
  }

  // Section 1
  addSection('Client Info', '👤');
  addField("Client's Name", data.name);
  addField('Company', data.company);
  const h1 = addFieldHalf('Phone', data.phone, 16);
  addFieldHalf('Email', data.email, 110);
  y += h1 + 14;
  addField('Website / Social Media', data.website);

  // Section 2
  addSection('Brand Identity', '✨');
  const h2 = addFieldHalf('Brand Name', data.brandName, 16);
  addFieldHalf('Tagline', data.tagline, 110);
  y += h2 + 14;
  addField('Story Behind the Name', data.brandStory);
  addField('Service or Product', data.service);
  addField('Brand Message', data.message);

  // Section 3
  addSection('Target Audience', '👥');
  addField('Age, Gender, Lifestyle', data.audience);
  addField('Problem & Solution', data.problem);

  // Section 4
  addSection('Brand Personality', '🎨');
  addField('Personality', data.personality);
  addField('Values', data.values);
  addField('What makes it different', data.different);

  // Section 5
  addSection('Competition & Vision', '🏆');
  addField('Top 3 Competitors', data.competitors);
  addField('Vision / Future Goal', data.vision);

  // Section 6
  addSection('Visual Preferences', '👁');
  const h3 = addFieldHalf('Has a Logo?', data.logo, 16);
  addFieldHalf('Logo Types', data.logoTypes, 110);
  y += h3 + 14;
  addField('Visual Preferences', data.visual);

  // Section 7
  addSection('Project Parameters', '📊');
  const h4 = addFieldHalf('Deadline', data.deadline, 16);
  addFieldHalf('Budget', data.budget, 110);
  y += h4 + 14;
  addField('Additional Info', data.extra);

  // Footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFillColor(...black);
    doc.rect(0, 285, 210, 12, 'F');
    doc.setTextColor(...white);
    doc.setFontSize(8);
    doc.text('Mohamed Ali Louati — Brand Identity Designer', 16, 292);
    doc.setTextColor(...orange);
    doc.text('@design_medali', 160, 292);
  }

  doc.save(`Brief_${data.name || 'Client'}.pdf`);
}
