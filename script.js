document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var username = document.getElementById('username').value;
    // Display the user input without sanitization
    document.getElementById('output').innerHTML = "Hello, " + username;
});