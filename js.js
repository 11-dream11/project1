// Check if user is logged in when loading dashboard
if (window.location.pathname.includes('dashboard.html')) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
        window.location.href = 'index.html';
    } else {
        document.getElementById('user-info').innerHTML = `
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Email:</strong> ${user.email}</p>
        `;
    }
}

// Logout functionality
document.getElementById('logout-btn')?.addEventListener('click', function() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
});

// Handle registration form submission
document.getElementById('register')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    // Client-side validation
    if (password !== confirmPassword) {
        showMessage("Passwords don't match!", 'error');
        return;
    }
    
    // Get users from localStorage or initialize empty array
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if user already exists
    if (users.some(user => user.email === email)) {
        showMessage("User already exists with this email", 'error');
        return;
    }
    
    // Create new user (in a real app, you would hash the password)
    const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password // Note: In a real app, never store plain text passwords
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    showMessage("Registration successful! Redirecting to login...", 'success');
    
    // Redirect to login after 1.5 seconds
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
});

// Handle login form submission
document.getElementById('login')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Find user by email
    const user = users.find(user => user.email === email);
    
    if (!user) {
        showMessage("User not found", 'error');
        return;
    }
    
    // Check password (in a real app, compare hashed passwords)
    if (user.password !== password) {
        showMessage("Incorrect password", 'error');
        return;
    }
    
    // Store current user in localStorage
    localStorage.setItem('currentUser', JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email
    }));
    
    showMessage("Login successful! Redirecting to dashboard...", 'success');
    
    // Redirect to dashboard after 1 second
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1000);
});

// Helper function to show messages
function showMessage(text, type) {
    const messageEl = document.getElementById('message');
    if (messageEl) {
        messageEl.textContent = text;
        messageEl.className = 'message ' + type;
        
        // Clear message after 5 seconds
        setTimeout(() => {
            messageEl.textContent = '';
            messageEl.className = 'message';
        }, 5000);
    }
}