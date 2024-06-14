document.getElementById('loginForm').addEventListener('submit', function(event) {
    // No CSRF protection
    // No SSL/TLS enforcement
    alert('Login form submitted with username: ' + document.getElementById('username').value);
});

document.getElementById('commentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var comment = document.getElementById('comment').value;
    // Vulnerable to XSS
    document.getElementById('commentsSection').innerHTML += "<p>" + comment + "</p>";
});
