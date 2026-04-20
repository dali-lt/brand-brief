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