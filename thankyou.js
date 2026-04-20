window.jsPDF = window.jspdf.jsPDF;

// قراءة البيانات من URL
const encoded = new URLSearchParams(window.location.search).get('d');
const data = encoded 
  ? JSON.parse(decodeURIComponent(escape(atob(encoded))))
  : {};

// عرض البيانات
document.getElementById('brief-display').innerHTML = `
  <div class="brief-section">
    <h2>01 — Client Details</h2>
    <div class="fields-grid">
      <div class="field"><label>Client's Name</label><p class="brief-value">${data.name}</p></div>
      <div class="field"><label>Company</label><p class="brief-value">${data.company}</p></div>
      <div class="field"><label>Phone</label><p class="brief-value">${data.phone}</p></div>
      <div class="field"><label>Email</label><p class="brief-value">${data.email}</p></div>
      <div class="field full"><label>Website</label><p class="brief-value">${data.website}</p></div>
    </div>
  </div>

  <div class="brief-section">
    <h2>02 — Project Details</h2>
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
    <h2>03 — Project Parameters</h2>
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
  const gray   = [150, 150, 150];

  doc.setFillColor(...orange);
  doc.rect(0, 0, 210, 40, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('BRAND DISCOVERY BRIEF', 20, 25);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Date: ${data.date}`, 150, 25);

  let y = 55;

  function addSection(title) {
    doc.setFillColor(...orange);
    doc.rect(0, y - 5, 210, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(title, 20, y + 1);
    y += 14;
  }

  function addField(label, value) {
    doc.setTextColor(...gray);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(label.toUpperCase(), 20, y);
    y += 6;
    doc.setTextColor(...black);
    doc.setFontSize(11);
    const lines = doc.splitTextToSize(value || '—', 170);
    doc.text(lines, 20, y);
    y += lines.length * 7 + 6;
    doc.setDrawColor(...gray);
    doc.line(20, y - 3, 190, y - 3);
    y += 4;
    if (y > 270) { doc.addPage(); y = 20; }
  }

  addSection('01 — CLIENT DETAILS');
  addField("Client's Name", data.name);
  addField('Company Name', data.company);
  addField('Phone', data.phone);
  addField('Email', data.email);
  addField('Website', data.website);

  addSection('02 — PROJECT DETAILS');
  addField('Has a logo?', data.logo);
  addField('Tagline / CTA', data.tagline);
  addField('Style Guide', data.guide);
  addField('Where graphics appear', data.appear);
  addField('Visual cues', data.cues);
  addField('Competition', data.competition);

  addSection('03 — PROJECT PARAMETERS');
  addField('Goal', data.goal);
  addField('Target Audience', data.audience);
  addField('Deadline', data.deadline);
  addField('Budget', data.budget);

  doc.setFillColor(...black);
  doc.rect(0, 282, 210, 15, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.text('Mohamed Ali Louati — Brand Identity Designer', 20, 291);
  doc.text('design_medali', 170, 291);

  doc.save(`Brief_${data.name}.pdf`);
}