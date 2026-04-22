function sendBrief() {
  const logoFile = document.getElementById('logoFile');

  if (logoFile && logoFile.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      buildAndSend(e.target.result);
    };
    reader.readAsDataURL(logoFile.files[0]);
  } else {
    buildAndSend(null);
  }
}

function buildAndSend(logoBase64) {
  const data = {
    date:        new Date().toLocaleDateString(),
    name:        document.getElementById('clientName').value,
    company:     document.getElementById('company').value,
    phone:       document.getElementById('phone').value,
    email:       document.getElementById('email').value,
    website:     document.getElementById('website').value,
    brandName:   document.getElementById('brandName').value,
    tagline:     document.getElementById('tagline').value,
    brandStory:  document.getElementById('brandStory').value,
    service:     document.getElementById('service').value,
    message:     document.getElementById('message').value,
    audience:    document.getElementById('audience').value,
    problem:     document.getElementById('problem').value,
    personality: document.getElementById('personality').value,
    values:      document.getElementById('values').value,
    different:   document.getElementById('different').value,
    competitors: document.getElementById('competitors').value,
    vision:      document.getElementById('vision').value,
    logo:        document.querySelector('input[name="logo"]:checked')?.value || '—',
    logoTypes:   [...document.querySelectorAll('input[name="logoType"]:checked')].map(i => i.value).join(', ') || '—',
    logoImage:   logoBase64,
    visual:      document.getElementById('visual').value,
    deadline:    document.getElementById('deadline').value,
    budget:      document.getElementById('budget').value,
    extra:       document.getElementById('extra').value,
  };

  if (logoBase64) {
    sessionStorage.setItem('briefLogoImage', logoBase64);
  }

  const dataWithoutImage = { ...data, logoImage: null };
  const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(dataWithoutImage))));
  const baseURL = window.location.href.replace('index.html', '');
  const thankURL = `${baseURL}thankyou.html?d=${encoded}`;

  const text = `Hello Med Ali! I just filled out your Brand Discovery Brief.\nView it here: ${thankURL}\n— ${data.name || 'Client'}`;
  window.open(`https://wa.me/21692131604?text=${encodeURIComponent(text)}`, '_blank');

  setTimeout(() => {
    window.location.replace(thankURL);
  }, 1000);
}

let isArabic = false;

const translations = {
  en: {
    title1: 'BRAND DISCOVERY', title2: 'BRIEF.', btn: 'AR',
    s1: 'Client Info', s2: 'Brand Identity', s3: 'Target Audience',
    s4: 'Brand Personality', s5: 'Competition & Vision',
    s6: 'Visual Preferences', s7: 'Project Parameters',
    clientName: "Client's Name", company: 'Company Name',
    phone: 'Phone', email: 'Email', website: 'Website / Social Media',
    brandName: 'Brand Name', tagline: 'Brand Tagline (if exists)',
    brandStory: 'Story Behind the Name', service: 'Brand Service or Product',
    message: 'What is your brand message to your audience?',
    audience: 'Target Audience: Age, Gender, Lifestyle...',
    problem: "What is the audience's problem? And what solution does your brand provide?",
    personality: 'Brand Personality — ex: Inspirational, classy, funny...',
    values: 'Brand Values — ex: sustainability, equality, respect...',
    different: 'What makes your brand different from competitors?',
    competitors: 'Top 3 Competitors', vision: 'Vision / Future Goal of the Brand',
    logoQuestion: 'Do you have a logo?', logoYes: 'Yes', logoNo: 'No',
    logoUpload: 'Upload your logo here', logoUploadSub: 'PNG, JPG, SVG accepted',
    logoTypeQuestion: 'What logo type do you prefer?',
    visual: 'Any visual preferences? Brands, colors, fonts, styles you like or dislike...',
    deadline: 'Deadline / Timeline', budget: 'Budget',
    extra: "Any information you'd like to add?", sendBtn: 'Send Brief',
    logoReminder: 'Send your logo on WhatsApp!',
    logoReminderSub: 'After submitting, please send your logo file directly in the chat.',
  },
  ar: {
    title1: 'استكشاف', title2: 'البراند.', btn: 'EN',
    s1: 'بيانات العميل', s2: 'هوية البراند', s3: 'الجمهور المستهدف',
    s4: 'شخصية البراند', s5: 'المنافسة والرؤية',
    s6: 'التفضيلات البصرية', s7: 'تفاصيل المشروع',
    clientName: 'اسمك', company: 'اسم الشركة أو النشاط',
    phone: 'رقم الهاتف', email: 'البريد الإلكتروني',
    website: 'الموقع أو حساباتك على وسائل التواصل',
    brandName: 'اسم العلامة التجارية', tagline: 'شعار العلامة — إذا كان موجوداً',
    brandStory: 'القصة وراء الاسم', service: 'ما الخدمة أو المنتج الذي تقدمه؟',
    message: 'ما هي رسالتك لجمهورك؟',
    audience: 'الجمهور المستهدف — العمر، الجنس، نمط الحياة...',
    problem: 'ما مشكلة جمهورك؟ وكيف يحلها براندك؟',
    personality: 'تخيل براندك شخصاً — كيف تصف شخصيته؟ مثال: ملهم، أنيق، مضحك...',
    values: 'ما القيم التي بنيت عليها براندك؟ مثال: الاحترام، الجودة، الإبداع...',
    different: 'ما الذي يميزك عن المنافسين؟',
    competitors: 'أذكر أهم 3 منافسين', vision: 'ما هو هدفك المستقبلي لهذا البراند؟',
    logoQuestion: 'هل عندك لوغو حالياً؟', logoYes: 'نعم', logoNo: 'لا',
    logoUpload: 'ارفع لوغوك هنا', logoUploadSub: 'PNG أو JPG أو SVG',
    logoTypeQuestion: 'ما نوع اللوغو الذي يناسبك؟',
    visual: 'هل عندك تفضيلات بصرية؟ شاركني ما يعجبك وما لا يعجبك — براندات، ألوان، خطوط، أستايلات...',
    deadline: 'متى تريد إنجاز المشروع؟', budget: 'ما هي ميزانيتك؟',
    extra: 'هل هناك أي معلومات إضافية تريد إضافتها؟', sendBtn: 'إرسال',
    logoReminder: '!أرسل لوغوك على واتساب',
    logoReminderSub: 'بعد الإرسال، من فضلك أرسل ملف اللوغو مباشرة في المحادثة.',
  }
};

function toggleLang() {
  isArabic = !isArabic;
  const t = isArabic ? translations.ar : translations.en;
  document.body.dir = isArabic ? 'rtl' : 'ltr';
  document.querySelector('.header-left h1').innerHTML = `${t.title1}<br><span>${t.title2}</span>`;
  document.querySelector('.lang-btn span').textContent = t.btn;
  const sections = document.querySelectorAll('.brief-section h2');
  sections[0].innerHTML = `<ion-icon name="person-outline"></ion-icon> ${t.s1}`;
  sections[1].innerHTML = `<ion-icon name="sparkles-outline"></ion-icon> ${t.s2}`;
  sections[2].innerHTML = `<ion-icon name="people-outline"></ion-icon> ${t.s3}`;
  sections[3].innerHTML = `<ion-icon name="color-palette-outline"></ion-icon> ${t.s4}`;
  sections[4].innerHTML = `<ion-icon name="podium-outline"></ion-icon> ${t.s5}`;
  sections[5].innerHTML = `<ion-icon name="eye-outline"></ion-icon> ${t.s6}`;
  sections[6].innerHTML = `<ion-icon name="stats-chart-outline"></ion-icon> ${t.s7}`;
  document.querySelector('label[for="clientName"]').textContent = t.clientName;
  document.querySelector('label[for="company"]').textContent = t.company;
  document.querySelector('label[for="phone"]').textContent = t.phone;
  document.querySelector('label[for="email"]').textContent = t.email;
  document.querySelector('label[for="website"]').textContent = t.website;
  document.querySelector('label[for="brandName"]').textContent = t.brandName;
  document.querySelector('label[for="tagline"]').textContent = t.tagline;
  document.querySelector('label[for="brandStory"]').textContent = t.brandStory;
  document.querySelector('label[for="service"]').textContent = t.service;
  document.querySelector('label[for="message"]').textContent = t.message;
  document.querySelector('label[for="audience"]').textContent = t.audience;
  document.querySelector('label[for="problem"]').textContent = t.problem;
  document.querySelector('label[for="personality"]').textContent = t.personality;
  document.querySelector('label[for="values"]').textContent = t.values;
  document.querySelector('label[for="different"]').textContent = t.different;
  document.querySelector('label[for="competitors"]').textContent = t.competitors;
  document.querySelector('label[for="vision"]').textContent = t.vision;
  document.querySelector('.static-label').textContent = t.logoQuestion;
  const radioLabels = document.querySelectorAll('.radio-group label');
  radioLabels[0].childNodes[1].textContent = ` ${t.logoYes}`;
  radioLabels[1].childNodes[1].textContent = ` ${t.logoNo}`;
  document.querySelector('.reminder-title').textContent = t.logoReminder;
  document.querySelector('.reminder-sub').textContent = t.logoReminderSub;
  document.querySelector('label[for="visual"]').textContent = t.visual;
  document.querySelector('label[for="deadline"]').textContent = t.deadline;
  document.querySelector('label[for="budget"]').textContent = t.budget;
  document.querySelector('label[for="extra"]').textContent = t.extra;
  document.querySelector('.brief-submit button').innerHTML =
    `<ion-icon name="send-outline"></ion-icon> ${t.sendBtn}`;
}

function toggleLogoUpload(radio) {
  const upload = document.getElementById('logoUpload');
  if (radio.value === 'yes') {
    upload.classList.add('show');
  } else {
    upload.classList.remove('show');
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
