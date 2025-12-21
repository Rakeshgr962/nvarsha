console.log('🚀 Contact script loading...');

// =========================
// API CONFIG
// =========================
const API_BASE_URL = 'https://nvarsha-xm91.vercel.app';

// =========================
// INIT
// =========================
document.addEventListener('DOMContentLoaded', () => {
  console.log('🔧 Initializing contact form...');

  const contactForm = document.getElementById('contactForm');
  const successMessage = document.getElementById('successMessage');
  const messageInput = document.getElementById('message');
  const charCount = document.getElementById('charCount');

  if (!contactForm) {
    console.error('❌ contactForm not found');
    return;
  }

  console.log('✅ Contact form initialized');

  // =========================
  // CHARACTER COUNTER
  // =========================
  messageInput.addEventListener('input', () => {
    charCount.textContent = messageInput.value.length;
  });

  // =========================
  // SUBMIT HANDLER
  // =========================
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('🔥 Submit event triggered');

    // Hide all errors
    document.querySelectorAll('.error-message')
      .forEach(el => el.style.display = 'none');

    let isValid = true;

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) {
      document.getElementById('nameError').style.display = 'block';
      isValid = false;
    }

    if (!emailRegex.test(email)) {
      document.getElementById('emailError').style.display = 'block';
      isValid = false;
    }

    if (!subject) {
      document.getElementById('subjectError').style.display = 'block';
      isValid = false;
    }

    if (!message) {
      document.getElementById('messageError').style.display = 'block';
      isValid = false;
    }

    if (!isValid) {
      console.warn('❌ Validation failed');
      return;
    }

    const payload = { name, email, subject, message };
    console.log('📦 Sending payload:', payload);

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      console.log('📡 Network request sent');

      const result = await response.json();
      console.log('📨 Backend response:', result);

      if (!response.ok) {
        throw new Error('Server error');
      }

      successMessage.style.display = 'block';
      contactForm.reset();
      charCount.textContent = '0';

      setTimeout(() => {
        successMessage.style.display = 'none';
      }, 4000);

    } catch (error) {
      console.error('❌ Submission failed:', error);
      alert('Failed to send message');
    }
  });

  console.log('✅ Contact script fully loaded');
});
