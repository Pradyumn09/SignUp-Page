
async function redirectLogin() {
    // Retrieve form values
    let user_name = document.getElementById('name').value;
    let phoneNumber = document.getElementById('phoneNumber').value;
    let email = document.getElementById('email').value;
    let newUsername = document.getElementById('newUsername').value;
    let newPassword = document.getElementById('newPassword').value;
  
    // Basic form validation
    if (!user_name || !phoneNumber || !email || !newUsername || !newPassword) {
      console.error('Please fill in all fields.');
      return;
    }
  console.log(user_name)
    // Data to be sent in the request
    const userData = {
      name: user_name,
      phoneNumber: phoneNumber,
      email: email,
      newUsername: newUsername,
      newPassword: newPassword,
    };
  
    try {
      // Make the API call
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (response.ok) {
        // Handle success
        console.log('User signed up successfully!');
        // Redirect to login page
        window.location.href = "login.html";
      } else {
        // Handle error
        console.error('Sign-up failed.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    window.location.href = "login.html"; // Change to the actual login page URL
  }
  
  function redirectToLogin() {
    window.location.href = "login.html";
  }
  
  function showLoginForm() {
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
  }
  
  function showSignupForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
  }
  
