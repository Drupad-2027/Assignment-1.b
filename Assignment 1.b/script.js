document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registrationForm");
    const userList = document.getElementById("userList");

    // Handle Form Submission
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            // Get User Input
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            // Create User Object
            const userData = { name, email, password };

            // Save Data to Local Storage
            let users = JSON.parse(localStorage.getItem("users")) || [];
            users.push(userData);
            localStorage.setItem("users", JSON.stringify(users));

            // Send Data via AJAX POST
            fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            })
            .then(response => response.json())
            .then(data => console.log("Server Response:", data))
            .catch(error => console.error("Error:", error));

            alert("Registration Successful!");
            form.reset();
        });
    }

    // Display Users on `users.html`
    if (userList) {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users.forEach(user => {
            let li = document.createElement("li");
            li.textContent = `Name: ${user.name}, Email: ${user.email}`;
            userList.appendChild(li);
        });
    }
});
