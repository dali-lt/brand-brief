function sendBrief() {

  const inputs = document.querySelectorAll('.field input[type="text"], .field input[type="email"]');
  const textareas = document.querySelectorAll('.field textarea');
  const logo = document.querySelector('input[name="logo"]:checked');

  const data = {
    date:        new Date().toLocaleDateString(),
    name:        inputs[0].value,
    company:     inputs[1].value,
    phone:       inputs[2].value,
    email:       inputs[3].value,
    website:     inputs[4].value,
    logo:        logo ? logo.value : '—',
    tagline:     textareas[0].value,
    guide:       textareas[1].value,
    appear:      textareas[2].value,
    cues:        textareas[3].value,
    competition: textareas[4].value,
    goal:        textareas[5].value,
    audience:    textareas[6].value,
    deadline:    inputs[5].value,
    budget:      inputs[6].value,
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