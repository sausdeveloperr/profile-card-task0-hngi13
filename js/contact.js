// Form elements
const form = document.getElementById('contactForm');
const submitButton = document.getElementById('submitButton');
const successMessage = document.getElementById('successMessage');
const messageTextarea = document.getElementById('message');
const messageCounter = document.getElementById('messageCounter');

// Form fields
const fields = {
    fullName: {
        element: document.getElementById('fullName'),
        error: document.getElementById('nameError'),
        validate: (value) => {
            if (!value.trim()) {
                return 'Full name is required';
            }
            if (value.trim().length < 2) {
                return 'Full name must be at least 2 characters';
            }
            return null;
        }
    },
    email: {
        element: document.getElementById('email'),
        error: document.getElementById('emailError'),
        validate: (value) => {
            if (!value.trim()) {
                return 'Email address is required';
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                return 'Please enter a valid email address';
            }
            return null;
        }
    },
    subject: {
        element: document.getElementById('subject'),
        error: document.getElementById('subjectError'),
        validate: (value) => {
            if (!value.trim()) {
                return 'Subject is required';
            }
            if (value.trim().length < 3) {
                return 'Subject must be at least 3 characters';
            }
            return null;
        }
    },
    message: {
        element: document.getElementById('message'),
        error: document.getElementById('messageError'),
        validate: (value) => {
            if (!value.trim()) {
                return 'Message is required';
            }
            if (value.trim().length < 10) {
                return 'Message must be at least 10 characters';
            }
            return null;
        }
    }
};

// char counter for message
messageTextarea.addEventListener('input', function() {
    const length = this.value.length;
    messageCounter.textContent = `${length} characters ${length < 10 ? '(minimum 10 required)' : ''}`;
    
    if (length < 10) {
        messageCounter.className = 'char-counter error';
    } else if (length < 20) {
        messageCounter.className = 'char-counter warning';
    } else {
        messageCounter.className = 'char-counter';
    }
});

// real-time validation
Object.keys(fields).forEach(fieldName => {
    const field = fields[fieldName];
    
    field.element.addEventListener('blur', () => validateField(fieldName));
    field.element.addEventListener('input', () => {
        if (field.element.classList.contains('error')) {
            validateField(fieldName);
        }
    });
});

// validate individual field
function validateField(fieldName) {
    const field = fields[fieldName];
    const value = field.element.value;
    const error = field.validate(value);

    if (error) {
        showFieldError(field, error);
        return false;
    } else {
        clearFieldError(field);
        return true;
    }
}

// show field error
function showFieldError(field, message) {
    field.element.classList.add('error');
    field.element.classList.remove('success');
    field.error.textContent = message;
    field.error.classList.add('show');
}

// clear field error
function clearFieldError(field) {
    field.element.classList.remove('error');
    field.element.classList.add('success');
    field.error.textContent = '';
    field.error.classList.remove('show');
}

// validate entire form
function validateForm() {
    let isValid = true;
    
    Object.keys(fields).forEach(fieldName => {
        if (!validateField(fieldName)) {
            isValid = false;
        }
    });

    return isValid;
}

// handle form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // hide success message if visible
    successMessage.classList.remove('show');
    
    // halidate form
    if (!validateForm()) {
        // Shake the form to indicate err
        form.classList.add('shake');
        setTimeout(() => form.classList.remove('shake'), 500);
        
        // focus first err field
        const firstErrorField = Object.values(fields).find(field => 
            field.element.classList.contains('error')
        );
        if (firstErrorField) {
            firstErrorField.element.focus();
        }
        return;
    }

    // show loading state
    submitButton.classList.add('loading');
    submitButton.disabled = true;

    // simulate form submission 
    setTimeout(() => {
        // Hide loading state
        submitButton.classList.remove('loading');
        submitButton.disabled = false;

        // show success message
        successMessage.classList.add('show');
        
        // reset form
        form.reset();
        messageCounter.textContent = '0 characters (minimum 10 required)';
        messageCounter.className = 'char-counter error';
        
        // clear all field states
        Object.values(fields).forEach(field => {
            field.element.classList.remove('error', 'success');
            field.error.classList.remove('show');
        });

        // scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // focus success message for screen readers
        successMessage.setAttribute('tabindex', '-1');
        successMessage.focus();
        
    }, 2000); 
});

// keyboard navigation enhancements
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && successMessage.classList.contains('show')) {
        successMessage.classList.remove('show');
    }
});

// initialize character counter
messageTextarea.dispatchEvent(new Event('input'));