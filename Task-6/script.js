document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const resetBtn = document.getElementById('resetBtn');
    const charCount = document.getElementById('charCount');
    const messageInput = document.getElementById('message');
    const honeypot = document.getElementById('honeypot');

    // Inputs configuration
    const inputs = {
        name: {
            el: document.getElementById('name'),
            validate: (val) => val.trim().length >= 2
        },
        email: {
            el: document.getElementById('email'),
            validate: (val) => {
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return regex.test(val);
            }
        },
        phone: {
            el: document.getElementById('phone'),
            validate: (val) => {
                // If empty, it's valid (optional) - or adjust if required
                if (val.trim() === "") return true;
                const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
                return regex.test(val);
            }
        },
        subject: {
            el: document.getElementById('subject'),
            validate: (val) => val !== "" && val !== null
        },
        message: {
            el: messageInput,
            validate: (val) => val.trim().length >= 10
        }
    };

    const validateField = (fieldName) => {
        const field = inputs[fieldName];
        const isValid = field.validate(field.el.value);

        if (isValid) {
            field.el.parentElement.classList.remove('invalid');
        } else {
            field.el.parentElement.classList.add('invalid');
        }
        return isValid;
    };

    // Update character count
    messageInput.addEventListener('input', () => {
        const length = messageInput.value.length;
        charCount.textContent = `${length}/500`;

        if (length >= 450) {
            charCount.style.color = '#ef4444';
        } else {
            charCount.style.color = '#94a3b8';
        }
    });

    // Event listeners for inputs
    Object.keys(inputs).forEach(key => {
        const events = key === 'subject' ? ['change', 'blur'] : ['input', 'blur'];

        events.forEach(eventType => {
            inputs[key].el.addEventListener(eventType, () => {
                // If it's a 'blur' or if it was already marked as invalid, validate
                if (eventType === 'blur' || inputs[key].el.parentElement.classList.contains('invalid')) {
                    validateField(key);
                }
            });
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Anti-spam check
        if (honeypot.value !== "") {
            console.log("Bot detected");
            return;
        }

        let isFormValid = true;

        // Validate all fields
        Object.keys(inputs).forEach(key => {
            const isValid = validateField(key);
            if (!isValid) isFormValid = false;
        });

        if (isFormValid) {
            const submitBtn = document.getElementById('submitBtn');
            const btnText = submitBtn.querySelector('.btn-text');

            submitBtn.disabled = true;
            btnText.innerText = 'Sending...';

            // Simulate server delay
            setTimeout(() => {
                form.style.display = 'none';
                successMessage.style.display = 'block';
                submitBtn.disabled = false;
                btnText.innerText = 'Send Message';
            }, 1200);
        }
    });

    resetBtn.addEventListener('click', () => {
        form.reset();
        charCount.textContent = '0/500';
        form.style.display = 'block';
        successMessage.style.display = 'none';

        // Reset validation states
        Object.keys(inputs).forEach(key => {
            inputs[key].el.parentElement.classList.remove('invalid');
        });
    });
});
