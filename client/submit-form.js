// Character counter
const messageInput = document.getElementById('message');
const charCount = document.getElementById('charCount');

if (messageInput && charCount) {
  messageInput.addEventListener('input', () => {
    charCount.textContent = messageInput.value.length;
  });
}

// API base (Vercel backend)
const API_BASE_URL = 'https://your-varsha-backend.vercel.app'; // replace with your Vercel URL

// Form submission to Vercel backend
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Reset error messages
    document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');

    let isValid = true;

    // Validate name
    const name = document.getElementById('name').value.trim();
    if (name === '') {
      document.getElementById('nameError').style.display = 'block';
      isValid = false;
    }

    // Validate email
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      document.getElementById('emailError').style.display = 'block';
      isValid = false;
    }

    // Validate subject
    const subject = document.getElementById('subject').value.trim();
    if (subject === '') {
      document.getElementById('subjectError').style.display = 'block';
      isValid = false;
    }

    // Validate message
    const message = document.getElementById('message').value.trim();
    if (message === '') {
      document.getElementById('messageError').style.display = 'block';
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = ' Sending...';
    submitBtn.disabled = true;

    try {
      const formData = { name, email, subject, message };

      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json().catch(() => ({}));
      console.log('Backend response:', response.status, result);

      if (response.ok && result.success !== false) {
        // Show success message
        if (successMessage) {
          successMessage.style.display = 'block';
          setTimeout(() => {
            successMessage.style.display = 'none';
          }, 5000);
        }

        contactForm.reset();
        if (charCount) charCount.textContent = '0';

        console.log('Form submitted successfully:', result);
      } else {
        throw new Error(result.error || 'Failed to submit form');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('There was an error sending your message. Please try again later.');
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
}
