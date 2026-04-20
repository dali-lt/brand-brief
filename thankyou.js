window.jsPDF = window.jspdf.jsPDF;

const encoded = new URLSearchParams(window.location.search).get('d');
const data = encoded 
  ? JSON.parse(decodeURIComponent(escape(atob(encoded))))
  : {};

document.getElementById('brief-display').innerHTML = `
  <div class="brief-section">
    <h2><ion-icon name="person-outline"></ion-icon> Client Details</h2>
    <div class="fields-grid">
      <div class="field"><label>Client's Name</label><p class="brief-value">${data.name}</p></div>
      <div class="field"><label>Company</label><p class="brief-value">${data.company}</p></div>
      <div class="field"><label>Phone</label><p class="brief-value">${data.phone}</p></div>
      <div class="field"><label>Email</label><p class="brief-value">${data.email}</p></div>
      <div class="field full"><label>Website</label><p class="brief-value">${data.website}</p></div>
    </div>
  </div>

  <div class="brief-section">
    <h2><ion-icon name="briefcase-outline"></ion-icon> Project Details</h2>
    <div class="fields-grid">
      <div class="field full"><label>Has a logo?</label><p class="brief-value">${data.logo}</p></div>
      <div class="field full"><label>Tagline / CTA</label><p class="brief-value">${data.tagline}</p></div>
      <div class="field full"><label>Style Guide</label><p class="brief-value">${data.guide}</p></div>
      <div class="field full"><label>Where graphics appear</label><p class="brief-value">${data.appear}</p></div>
      <div class="field full"><label>Visual cues</label><p class="brief-value">${data.cues}</p></div>
      <div class="field full"><label>Competition</label><p class="brief-value">${data.competition}</p></div>
    </div>
  </div>

  <div class="brief-section">
    <h2><ion-icon name="stats-chart-outline"></ion-icon> Project Parameters</h2>
    <div class="fields-grid">
      <div class="field full"><label>Goal</label><p class="brief-value">${data.goal}</p></div>
      <div class="field full"><label>Target Audience</label><p class="brief-value">${data.audience}</p></div>
      <div class="field"><label>Deadline</label><p class="brief-value">${data.deadline}</p></div>
      <div class="field"><label>Budget</label><p class="brief-value">${data.budget}</p></div>
    </div>
  </div>
`;

// Download PDF
function downloadPDF() {
  const doc = new jsPDF();
  const orange = [255, 63, 26];
  const black  = [27, 29, 27];
  const white  = [255, 255, 255];
  const gray   = [150, 150, 150];
  const lightgray = [240, 240, 240];

  let y = 0;

  // ── Header Black ──
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
  doc.text(`Date: ${data.date}`, 105, 30);

  y = 58;

  // ── Section Function ──
  function addSection(title) {
    // Orange left border
    doc.setFillColor(...orange);
    doc.rect(16, y - 4, 3, 8, 'F');

    doc.setTextColor(...orange);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(title.toUpperCase(), 22, y + 2);

    // Line
    doc.setDrawColor(...lightgray);
    doc.line(16, y + 6, 194, y + 6);

    y += 14;
  }

  // ── Field Function ──
  function addField(label, value) {
    if (y > 265) { doc.addPage(); y = 20; }

    doc.setTextColor(...gray);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(label.toUpperCase(), 16, y);
    y += 5;

    // Value box
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

  // ── 2 fields side by side ──
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

  // ── Section 1 ──
  addSection('Client Details');
  addField("Client's Name", data.name);
  addField('Company Name', data.company);

  // Phone + Email side by side
  const h1 = addFieldHalf('Phone', data.phone, 16);
  addFieldHalf('Email', data.email, 110);
  y += h1 + 14;

  addField('Website', data.website);

  // ── Section 2 ──
  addSection('Project Details');
  addField('Has a logo?', data.logo);
  addField('Tagline / CTA', data.tagline);
  addField('Style Guide', data.guide);
  addField('Where graphics appear', data.appear);
  addField('Visual cues', data.cues);
  addField('Competition', data.competition);

  // ── Section 3 ──
  addSection('Project Parameters');
  addField('Goal', data.goal);
  addField('Target Audience', data.audience);

  // Deadline + Budget side by side
  const h2 = addFieldHalf('Deadline', data.deadline, 16);
  addFieldHalf('Budget', data.budget, 110);
  y += h2 + 14;

  // ── Footer ──
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
