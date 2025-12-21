// ============================================
// CONTACT FORM SCRIPT (SAFE VERSION)
// ============================================

console.log('🚀 Contact script loading...');

// ===== API CONFIG =====
const API_BASE_URL = 'https://nvarsha-xm91.vercel.app';

// ===== INITIALIZE APP =====
function initializeContactForm() {
    try {
        console.log('🔧 Initializing contact form...');

        // ===== ELEMENT REFERENCES =====
        const contactForm = document.getElementById('contactForm');
        const successMessage = document.getElementById('successMessage');
        const messageInput = document.getElementById('message');
        const charCount = document.getElementById('charCount');

        if (!contactForm) {
            console.warn('⚠️ Contact form not found');
            return;
        }

        // ===== CHARACTER COUNTER =====
        if (messageInput && charCount) {
            messageInput.addEventListener('input', () => {
                charCount.textContent = messageInput.value.length;
            });
        }

        // ===== FORM SUBMISSION =====
        contactForm.addEventListener('submit', async (e) => {
            console.log('🔥 Submit event triggered');
            e.preventDefault();

            document.querySelectorAll('.error-message')
                .forEach(el => el.style.display = 'none');

            let isValid = true;

            const name = document.getElementById('name')?.value.trim() || '';
            const email = document.getElementById('email')?.value.trim() || '';
            const subject = document.getElementById('subject')?.value.trim() || '';
            const message = messageInput?.value.trim() || '';

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (name === '') {
    const el = document.getElementById('nameError');
    if (el) el.style.display = 'block';
    isValid = false;
}

if (!emailRegex.test(email)) {
    const el = document.getElementById('emailError');
    if (el) el.style.display = 'block';
    isValid = false;
}

if (subject === '') {
    const el = document.getElementById('subjectError');
    if (el) el.style.display = 'block';
    isValid = false;
}

if (message === '') {
    const el = document.getElementById('messageError');
    if (el) el.style.display = 'block';
    isValid = false;
}


            if (!isValid) return;

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.innerHTML : '';

            if (submitBtn) {
                submitBtn.innerHTML = ' Sending...';
                submitBtn.disabled = true;
            }

            try {
                const payload = { name, email, subject, message };

                console.log('📦 Sending payload:', payload);

                const response = await fetch(`${API_BASE_URL}/api/contact`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                const result = await response.json().catch(() => ({}));
                console.log('📨 Backend response:', response.status, result);

                if (response.ok && result.success !== false) {
                    if (successMessage) {
                        successMessage.style.display = 'block';
                        setTimeout(() => successMessage.style.display = 'none', 5000);
                    }

                    contactForm.reset();
                    if (charCount) charCount.textContent = '0';
                } else {
                    throw new Error(result.error || 'Submission failed');
                }
            } catch (error) {
                console.error('❌ Submission error:', error);
                alert('There was an error sending your message.');
            } finally {
                if (submitBtn) {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
            }
        });

        console.log('✅ Contact form initialized');
    } catch (error) {
        console.error('❌ Contact form init error:', error);
    }
}

// ===== DOM READY CHECK =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeContactForm);
} else {
    initializeContactForm();
}

console.log('✅ Contact script fully loaded');


