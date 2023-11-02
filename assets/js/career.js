var mySwiper = new Swiper(".swiper-container", {
  loop: true,
  autoplay: {
    delay: 3000, // Autoplay delay in milliseconds
  },
  noSwiping: true, // Disable swiping by default
  noSwipingClass: "no-swipe", // Apply swiping to elements with this class
});

document.getElementById("verify-form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get the email input value
  const emailInput = document.querySelector(".email-text");
  const email = emailInput.value;

  // Replace this API URL with the actual endpoint for checking email existence
  const apiUrl = "assets/js/json/emails.json";

  // Make an API request to check if the email exists
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const existingEmails = data.emails;

      if (existingEmails.includes(email)) {
        // Email exists, show a message
        const verificationMessage = document.getElementById(
          "verification-message"
        );
        verificationMessage.textContent =
          "Your candidacy has already been received!";
        verificationMessage.style.display = "block";

        // Hide the form
        document.querySelector(".identify-wrapper").style.display = "none";
      } else {
        // Email doesn't exist, you can handle this case as needed
        // For now, show a success message in the console
        console.log(
          "Email doesn't exist. You can proceed with the next steps."
        );
      }
    })
    .catch((error) => {
      console.error("Error checking email existence:", error);
    });
});
