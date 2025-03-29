document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");

    // 🌙 Theme Toggle
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
        });

        if (localStorage.getItem("theme") === "dark") {
            document.body.classList.add("dark-mode");
        }
    }

    // ✅ Profile Picture Upload Fix
    const profilePic = document.getElementById("profilepic");
    const uploadInput = document.getElementById("upload-profile");

    if (profilePic && uploadInput) {
        // ✅ Load stored profile image
        if (localStorage.getItem("profileImage")) {
            profilePic.src = localStorage.getItem("profileImage");
        }

        // ✅ Handle profile picture change
        uploadInput.addEventListener("change", function () {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    profilePic.src = e.target.result; // Change the image
                    localStorage.setItem("profileImage", e.target.result); // Save to LocalStorage
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // 📌 Load and Check Reminders
    loadReminders();
    setInterval(checkReminders, 10000);

    const addReminderBtn = document.getElementById("add-reminder");
    if (addReminderBtn) {
        addReminderBtn.addEventListener("click", addReminder);
    }

    function addReminder() {
        let textInput = document.getElementById("reminder-text");
        let dateTimeInput = document.getElementById("reminder-datetime");

        if (!textInput || !dateTimeInput) return; // Ensure elements exist

        let text = textInput.value.trim();
        let dateTime = dateTimeInput.value;

        if (!text || !dateTime) {
            alert("⚠ Please enter both reminder text and date-time.");
            return;
        }

        let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
        reminders.push({ text, dateTime, notified: false });
        localStorage.setItem("reminders", JSON.stringify(reminders));

        textInput.value = "";
        dateTimeInput.value = "";

        loadReminders();
    }

    function loadReminders() {
        let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
        let list = document.getElementById("reminder-list");

        if (!list) return; // Prevent errors if the element doesn't exist

        list.innerHTML = "";
        reminders.forEach((reminder, index) => {
            let li = document.createElement("li");
            li.innerHTML = `📚 ${reminder.text} - <strong>${formatDateTime(reminder.dateTime)}</strong> 
                            <button class="delete-btn" data-index="${index}">❌</button>`;
            list.appendChild(li);
        });

        // Add event listener for delete buttons
        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", function () {
                deleteReminder(this.getAttribute("data-index"));
            });
        });
    }

    function deleteReminder(index) {
        let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
        reminders.splice(index, 1);
        localStorage.setItem("reminders", JSON.stringify(reminders));
        loadReminders();
    }

    function checkReminders() {
        let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
        let now = new Date().getTime();

        console.log("⏳ Checking reminders at:", new Date()); // ✅ Debug log

        reminders.forEach((reminder, index) => {
            let reminderTime = new Date(reminder.dateTime).getTime();
            console.log(`📌 Reminder Found: ${reminder.text} at ${reminder.dateTime}`);

            if (reminderTime <= now && !reminder.notified) {
                console.log("✅ Showing popup for:", reminder.text);
                showPopup(`📚 Time to Study: ${reminder.text}`);
                reminders[index].notified = true;
                localStorage.setItem("reminders", JSON.stringify(reminders));
            }
        });
    }

    function showPopup(message) {
        const popup = document.getElementById("popup");
        const popupText = document.getElementById("popup-text");

        if (popup && popupText) {
            popupText.innerHTML = message;
            popup.style.display = "block";

            setTimeout(() => {
                popup.style.display = "none";
            }, 5000);
        } else {
            console.log("❌ Popup element not found!");
        }
    }

    function formatDateTime(dateTime) {
        let date = new Date(dateTime);
        return date.toLocaleString();
    }
      document.addEventListener("DOMContentLoaded", () => {
    function submitQuiz() {
        let score = 0;
        let totalQuestions = 2;

        let answers = {
            q1: "Paris",
            q2: "4"
        };

        for (let key in answers) {
            let selectedOption = document.querySelector(`input[name="${key}"]:checked`);
            if (selectedOption && selectedOption.value === answers[key]) {
                score++;
            }
        }

        showPopup(`🎉 You got ${score} out of ${totalQuestions} correct!`);
    }

    function showPopup(message) {
        const popup = document.getElementById("popup");
        const popupText = document.getElementById("popup-text");

        popupText.innerHTML = message;
        popup.style.display = "block";
    }

    window.closePopup = function () {
        document.getElementById("popup").style.display = "none";
    };

    window.submitQuiz = submitQuiz;
});
});
