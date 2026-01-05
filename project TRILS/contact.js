// ====== EmailJS Integration ======
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const statusMsg = document.getElementById('statusMsg');

  // Basic validation
  if (!name || !email || !message) {
    showStatus('Please fill in all fields.', 'error');
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    showStatus('Please enter a valid email address.', 'error');
    return;
  }

  showStatus('Sending message...', ''); // Neutral message

  // Send email using EmailJS
  emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
      from_name: name,
      from_email: email,
      message: message
  })
  .then(function(response) {
      console.log('SUCCESS!', response.status, response.text);
      showStatus('✅ Message sent successfully!', 'success');
      document.getElementById('contactForm').reset();
  }, function(error) {
      console.error('FAILED...', error);
      showStatus('❌ Failed to send. Please try again later.', 'error');
  });
});

function showStatus(msg, type) {
  const el = document.getElementById('statusMsg');
  el.textContent = msg;
  el.className = type;
}
