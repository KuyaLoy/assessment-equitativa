$(document).ready(function () {
  const progressBar = $(".progress-bar");
  const verificationForm = $("#verification-form");
  const secondForm = $("#second-form");
  const checkEmailBtn = $("#check-email-btn");
  const nextBtn = $("#next-btn");
  const prevBtn = $("#prev-btn");
  const successMessage = $("#success-message");
  const emailExistsMessage = $("#email-exists-message");
  const jobPositionsDiv = $("#job-positions");
  const emailInput = $("#email");

  let currentStep = 1;

  checkEmailBtn.on("click", function (e) {
    e.preventDefault();

    const userEmail = emailInput.val();

    // Read the JSON file with sample email addresses
    $.getJSON("assets/js/json/email.json", function (data) {
      const sampleEmails = data.sample_emails;

      if (sampleEmails.includes(userEmail)) {
        // Email exists in the sample_emails array
        verificationForm.hide();
        hideEmailExistsMessage();
        showSecondForm();
        loadJobPositions();
      } else {
        // Email does not exist in the sample_emails array
        showEmailExistsMessage();
      }
    });
  });

  nextBtn.on("click", function (e) {
    e.preventDefault();
    showStep(currentStep + 1);
  });

  prevBtn.on("click", function (e) {
    e.preventDefault();
    showStep(currentStep - 1);
  });

  function showStep(step) {
    if (step === 1) {
      verificationForm.show();
      hideEmailExistsMessage();
      secondForm.hide();
    } else if (step === 2) {
      verificationForm.hide();
      secondForm.show();
    } else {
      // Handle submission of the second form and show the success message
      secondForm.hide();
      successMessage.show();
    }

    currentStep = step;
    updateProgressBar();
  }

  function updateProgressBar() {
    const totalSteps = 2; // Update this if you have more steps
    const progress = (currentStep / totalSteps) * 100;
    progressBar.css("width", progress + "%");
  }

  function showEmailExistsMessage() {
    emailExistsMessage.show();
  }

  function hideEmailExistsMessage() {
    emailExistsMessage.hide();
  }

  function showSecondForm() {
    secondForm.show();
  }

  // Function to load job positions from the JSON file and create radio buttons
  function loadJobPositions() {
    $.getJSON("assets/js/json/positions.json", function (data) {
      const jobPositions = data.job_positions;

      if (jobPositions && jobPositions.length > 0) {
        jobPositionsDiv.empty();
        jobPositions.forEach(function (position, index) {
          const radioBtn = $(
            '<div class="form-check"><input class="form-check-input" type="radio" name="job-position" id="position-' +
              index +
              '" value="' +
              position.title +
              '"><label class="form-check-label" for="position-' +
              index +
              '">' +
              position.title +
              " (Expires on " +
              position.expire_date +
              ")</label></div>"
          );
          jobPositionsDiv.append(radioBtn);
        });
      } else {
        jobPositionsDiv.html("<p>No job positions available.</p>");
      }
    });
  }
});
