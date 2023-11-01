var mySwiper = new Swiper(".swiper-container", {
  loop: true,
  autoplay: {
    delay: 3000, // Autoplay delay in milliseconds
  },
  noSwiping: true, // Disable swiping by default
  noSwipingClass: "no-swipe", // Apply swiping to elements with this class
});

$(document).ready(function () {
  const stepNumberElement = $("#stepNumber");
  const progressBar = $("#progressBar");
  const jobList = $("#jobList");
  const emailInput = $("#email");
  const nextButton = $("#nextButton");
  const alreadyAppliedMessage = $("#alreadyAppliedMessage");

  // Function to fetch job positions from an external JSON file
  function fetchJobPositions() {
    $.getJSON("assets/js/json/jobPositions.json", function (data) {
      data.forEach(function (job) {
        const jobItem = $(`
              <label class="job-item col-6 col-md-4 col-lg-3">
                <input type="radio" name="jobOpening" class="form-check-input" value="${job.title}">
                <h3>${job.title}</h3>
                <p>${job.expiration}</p>
              </label>
            `);
        jobList.append(jobItem);
      });
    });
  }

  // Attach the click event handler to job items using event delegation
  jobList.on("click", ".job-item", function () {
    $(".job-item").removeClass("active");
    $(this).addClass("active");
    $("input[type='radio']", this).prop("checked", true);
    $("#nextButton2").prop("disabled", false);
  });

  // Enable the "Next" button when a valid email is entered
  emailInput.on("input", function () {
    if (emailInput[0].checkValidity()) {
      nextButton.prop("disabled", false);
    } else {
      nextButton.prop("disabled", true);
    }
  });

  // Next Button Click Event (Step 1 to Step 2)
  nextButton.click(function () {
    if (stepNumberElement.text() === "1") {
      const enteredEmail = emailInput.val();

      // Check if the email exists in the JSON file
      $.getJSON("assets/js/json/applicants.json", function (applicants) {
        if (applicants.includes(enteredEmail)) {
          // Email exists, show the message
          alreadyAppliedMessage.show();
        } else {
          // Email doesn't exist, proceed to Step 2
          stepNumberElement.text("2");
          progressBar.css("width", "33%");
          $("#step1").hide();
          $("#step2").show();
        }
      });
    }
  });

  // Previous Button Click Event (Step 2 to Step 1)
  $("#prevButton2").click(function () {
    if (stepNumberElement.text() === "2") {
      stepNumberElement.text("1");
      progressBar.css("width", "0%");
      $("#step2").hide();
      $("#step1").show();
    }
  });

  // Next Button Click Event (Step 2 to Step 3)
  $("#nextButton2").click(function () {
    if (stepNumberElement.text() === "2") {
      stepNumberElement.text("3");
      progressBar.css("width", "66%");
      $("#step2").hide();
      $("#step3").show();
    }
  });

  // Previous Button Click Event (Step 3 to Step 2)
  $("#prevButton3").click(function () {
    if (stepNumberElement.text() === "3") {
      stepNumberElement.text("2");
      progressBar.css("width", "33%");
      $("#step3").hide();
      $("#step2").show();
    }
  });

  // Next Button Click Event (Step 3 to Step 4)
  $("#nextButton3").click(function () {
    if (stepNumberElement.text() === "3") {
      stepNumberElement.text("4");
      progressBar.css("width", "100%");
      $("#step3").hide();
      $("#step4").show();
    }
  });

  // Previous Button Click Event (Step 4 to Step 3)
  $("#prevButton4").click(function () {
    if (stepNumberElement.text() === "4") {
      stepNumberElement.text("3");
      progressBar.css("width", "66%");
      $("#step4").hide();
      $("#step3").show();
    }
  });

  // Prevent form submission
  $("#jobApplicationForm").submit(function (event) {
    event.preventDefault();
  });

  // Fetch and display job positions
  fetchJobPositions();
});
