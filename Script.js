function sendBrief() {

  const inputs = document.querySelectorAll('.field input[type="text"], .field input[type="email"]');
  const textareas = document.querySelectorAll('.field textarea');
  const logo = document.querySelector('input[name="logo"]:checked');

  const data = {
  date:        new Date().toLocaleDateString(),
  name:        document.getElementById('clientName').value,
  company:     document.getElementById('company').value,
  phone:       document.getElementById('phone').value,
  email:       document.getElementById('email').value,
  website:     document.getElementById('website').value,
  logo:        document.querySelector('input[name="logo"]:checked')?.value || '—',
  tagline:     document.getElementById('tagline').value,
  guide:       document.getElementById('guide').value,
  appear:      document.getElementById('appear').value,
  cues:        document.getElementById('cues').value,
  competition: document.getElementById('competition').value,
  goal:        document.getElementById('goal').value,
  audience:    document.getElementById('audience').value,
  deadline:    document.getElementById('deadline').value,
  budget:      document.getElementById('budget').value,
};

  // تحويل البيانات لـ URL
  const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(data))));
const baseURL = window.location.href.replace('index.html', '');
const thankURL = `${baseURL}thankyou.html?d=${encoded}`;
  
  // WhatsApp
  const text = `Hello Med Ali! I just filled out your Brand Discovery Brief.\nView it here: ${thankURL}\n— ${data.name || 'Client'}`;
  window.open(`https://wa.me/21692131604?text=${encodeURIComponent(text)}`, '_blank');

  // تحويل للـ thank you page
  setTimeout(() => {
    window.location.href = thankURL;
  }, 1000);
}

let isArabic = false;

const translations = {
  en: {
    title1: 'BRAND DISCOVERY',
    title2: 'BRIEF.',
    btn: 'AR',

    // Section titles
    s1: 'Client Details',
    s2: 'Project Details',
    s3: 'Project Parameters',

    // Labels
    clientName: "Client's Name",
    company: 'Company Name',
    phone: 'Phone',
    email: 'Email',
    website: 'Website',
    logo: 'Do you have a logo?',
    logoYes: 'Yes',
    logoNo: 'No',
    tagline: 'Is there a tagline or call to action?',
    guide: 'Is there a brand style-guide?',
    appear: 'Where will the graphics appear?',
    cues: 'Are there visual cues or motifs?',
    competition: 'What competition are you benchmarking against?',
    goal: 'Objective / Goal of the Project',
    audience: 'Target Audience',
    deadline: 'Deadlines / Timeline',
    budget: 'Budget',
    sendBtn: 'Send Brief',
  },
  ar: {
    title1: 'استكشاف',
    title2: 'البراند.',
    btn: 'EN',

    // Section titles
    s1: 'بيانات العميل',
    s2: 'تفاصيل المشروع',
    s3: 'معايير المشروع',

    // Labels
    clientName: 'اسم العميل',
    company: 'اسم الشركة',
    phone: 'الهاتف',
    email: 'البريد الإلكتروني',
    website: 'الموقع الإلكتروني',
    logo: 'هل عندك لوغو؟',
    logoYes: 'نعم',
    logoNo: 'لا',
    tagline: 'هل عندك tagline أو call to action؟',
    guide: 'هل عندك brand style-guide؟',
    appear: 'وين بش تضهر التصاميم؟',
    cues: 'هل عندك عناصر بصرية أو motifs؟',
    competition: 'شنو المنافسين اللي تبي تتميز عنهم؟',
    goal: 'الهدف من المشروع',
    audience: 'الجمهور المستهدف',
    deadline: 'الموعد النهائي',
    budget: 'الميزانية',
    sendBtn: 'إرسال',
  }
};

function toggleLang() {
  isArabic = !isArabic;
  const t = isArabic ? translations.ar : translations.en;

  // Direction
  document.body.dir = isArabic ? 'rtl' : 'ltr';

  // Title
  document.querySelector('.header-left h1').innerHTML =
    `${t.title1}<br><span>${t.title2}</span>`;

  // Lang button
  document.querySelector('.lang-btn span').textContent = t.btn;

  // Section titles
  const sections = document.querySelectorAll('.brief-section h2');
  sections[0].innerHTML = `<ion-icon name="person-outline"></ion-icon> ${t.s1}`;
  sections[1].innerHTML = `<ion-icon name="briefcase-outline"></ion-icon> ${t.s2}`;
  sections[2].innerHTML = `<ion-icon name="stats-chart-outline"></ion-icon> ${t.s3}`;

  // Labels
  document.querySelector('label[for="clientName"]').textContent = t.clientName;
  document.querySelector('label[for="company"]').textContent = t.company;
  document.querySelector('label[for="phone"]').textContent = t.phone;
  document.querySelector('label[for="email"]').textContent = t.email;
  document.querySelector('label[for="website"]').textContent = t.website;
  document.querySelector('label[for="tagline"]').textContent = t.tagline;
  document.querySelector('label[for="guide"]').textContent = t.guide;
  document.querySelector('label[for="appear"]').textContent = t.appear;
  document.querySelector('label[for="cues"]').textContent = t.cues;
  document.querySelector('label[for="competition"]').textContent = t.competition;
  document.querySelector('label[for="goal"]').textContent = t.goal;
  document.querySelector('label[for="audience"]').textContent = t.audience;
  document.querySelector('label[for="deadline"]').textContent = t.deadline;
  document.querySelector('label[for="budget"]').textContent = t.budget;

  // Static label + radio
  document.querySelector('.static-label').textContent = t.logo;
  const radioLabels = document.querySelectorAll('.radio-group label');
  radioLabels[0].childNodes[1].textContent = ` ${t.logoYes}`;
  radioLabels[1].childNodes[1].textContent = ` ${t.logoNo}`;

  // Send button
  document.querySelector('.brief-submit button').innerHTML =
    `<ion-icon name="send-outline"></ion-icon> ${t.sendBtn}`;
}


function toggleLogoUpload(radio) {
  const upload = document.getElementById('logoUpload');
  if (radio.value === 'yes') {
    upload.classList.add('show');
  } else {
    upload.classList.remove('show');
    document.getElementById('logoPreview').style.display = 'none';
  }
}

function previewLogo(input) {
  const preview = document.getElementById('logoPreview');
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      preview.src = e.target.result;
      preview.style.display = 'block';
    };
    reader.readAsDataURL(input.files[0]);
  }
}
