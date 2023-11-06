var mySwiper = new Swiper(".swiper-container", {
  loop: true,
  autoplay: {
    delay: 3000, // Autoplay delay in milliseconds
  },
  noSwiping: true, // Disable swiping by default
  noSwipingClass: "no-swipe", // Apply swiping to elements with this class
});

function isValidEmail(email) {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
}

$(document).ready(function () {
  $('input[type="radio"][name="position-available"]').click(function () {
    // Check if any radio button in the group has been selected
    if (
      $('input[type="radio"][name="position-available"]:checked').length > 0
    ) {
      // Remove the "disabled" attribute from a button with a specific ID
      $(".next").removeAttr("disabled");
      $("#progressbar li:nth-child(1)").addClass("active");
    }
  });

  let nextCount = 1;

  $(".next").click(function () {
    switch (nextCount) {
      case 1:
        nextCount++;
        $(".prev").addClass("active");
        $(".steps").removeClass("active");
        $("#step-" + nextCount + "").addClass("active");
        $("#progressbar li:nth-child(" + nextCount + ")").addClass("active");

        break;
      case 2:
        const requiredFields = {
          title: "Title",
          FirstName: "First name",
          LastName: "Last name",
          Phone: "Mobile phone",
          Email: "Email Address",
          Country: "Nationalities",
          Salary: "Salary",
          SalaryCurency: "Currency",
        };

        const emptyFields = [];
        const emailField = $('[name="Email"]').val();

        const titleChecked = $('[name="title"]:checked').length > 0;

        if (!titleChecked) {
          emptyFields.push("Title");
        }

        for (const fieldName in requiredFields) {
          const fieldValue = $(`[name="${fieldName}"]`).val();

          if (fieldName === "Country") {
            const selectedCountry = $(
              `[name="${fieldName}"] option:selected`
            ).val();
            if (!selectedCountry) {
              emptyFields.push(requiredFields[fieldName]);
            }
          } else if (fieldName === "Email") {
            if (!isValidEmail(emailField)) {
              emptyFields.push(requiredFields[fieldName]);
            }
          } else if (!fieldValue) {
            emptyFields.push(requiredFields[fieldName]);
          }
        }

        if (emptyFields.length > 0) {
          $(".alert.step2s")
            .show()
            .text(
              "The following fields are empty or invalid: " +
                emptyFields.join(", ")
            );

          // Hide the alert after 3 seconds
          setTimeout(function () {
            $(".alert.step2s").hide();
          }, 3000);
        } else {
          nextCount++;
          $(".steps").removeClass("active");
          $("#step-" + nextCount + "").addClass("active");
          $("#progressbar li:nth-child(" + nextCount + ")").addClass("active");
        }

        break;
      case 3:
        const requiredFields2 = {
          "CV/Resume": '[name="Attachment"]', // Updated the name for the Attachment field
        };

        const emptyFields2 = [];

        for (const fieldName in requiredFields2) {
          const fieldValue = $(requiredFields2[fieldName]).val();
          if (!fieldValue) {
            emptyFields2.push(fieldName);
          }
        }

        if (emptyFields2.length > 0) {
          $(".alert.step3s")
            .show()
            .text("The following fields are empty: " + emptyFields2.join(", "));

          // Hide the alert after 3 seconds
          setTimeout(function () {
            $(".alert.step3s").hide();
          }, 3000);
        } else {
          nextCount++;
          $(".steps").removeClass("active");
          $("#step-" + nextCount + "").addClass("active");
          $("#progressbar li:nth-child(" + nextCount + ")").addClass("active");
        }
        break;
      case 4:
        nextCount++;
        $(".steps").removeClass("active");
        $("#step-" + nextCount + "").addClass("active");
        $("#progressbar li:nth-child(" + nextCount + ")").addClass("active");

        $(".next").addClass("hide");
        $(".send-application").addClass("active");
        displayFormData();
        break;

      default:
        break;
    }

    // if (nextCount < 5) {
    //   nextCount++;

    //   $(".steps").removeClass("active");
    //   $("#step-" + nextCount + "").addClass("active");

    //   if (nextCount == 2) {
    //     $(".prev").addClass("active");
    //   }
    //   if (nextCount == 5) {
    //     $(".next").addClass("hide");
    //     $(".send-application").addClass("active");
    //   }
    //   $("#progressbar li:nth-child(" + nextCount + ")").addClass("active");
    // }
    console.log(nextCount);
  });
  $(".prev").click(function () {
    $("#progressbar li:nth-child(" + nextCount + ")").removeClass("active");
    if (nextCount > 1) {
      nextCount--;
      $(".steps").removeClass("active");
      $("#step-" + nextCount + "").addClass("active");

      if (nextCount == 1) {
        $(this).removeClass("active");
        // $(".next").attr("disabled", true);
      }
      if (nextCount == 4) {
        $(".next").removeClass("hide");
        $(".send-application").removeClass("active");
        resetContent();
      }
    }

    console.log(nextCount);
  });
});

// -----------

let telInput = $("#MobilePhone");

telInput.intlTelInput({
  defaultCountry: "ae", // Set the default country to "ae"
  preferredCountries: ["ae", "gb", "us"],
  autoPlaceholder: "aggressive",
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});

$(".countrypicker").countrypicker();

var imageStyle = "";
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $("#imagePreview").css(
        "background-image",
        "url(" + e.target.result + ")"
      );
      $("#imagePreview").hide();
      $("#imagePreview").fadeIn(650);

      imageStyle = e.target.result;
      // alert(imageStyle);
    };
    reader.readAsDataURL(input.files[0]);
  }
}
$("#imageUpload").change(function () {
  readURL(this);
});

const fileUploadContainer = document.querySelector(".file-upload-container");
const fileUploadInput = document.getElementById("file-upload");
const fileList = document.getElementById("file-list");

fileUploadContainer.addEventListener("dragover", (e) => {
  e.preventDefault();
  fileUploadContainer.classList.add("drag-over");
});

fileUploadContainer.addEventListener("dragleave", () => {
  fileUploadContainer.classList.remove("drag-over");
});

fileUploadContainer.addEventListener("drop", (e) => {
  e.preventDefault();
  fileUploadContainer.classList.remove("drag-over");

  const files = e.dataTransfer.files;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const listItem = `
                <li class="file-list-item">
                    <span>${file.name}</span>
                    <button class="btn btn-sm btn-danger delete-file">X</button>
                </li>
            `;
    fileList.innerHTML = listItem; // Replace the file list with the new file
  }
});

fileUploadInput.addEventListener("change", (e) => {
  const file = e.target.files[0]; // Get the first selected file

  const listItem = `
            <li class="file-list-item">
                <span>${file.name}</span>
                <button class="btn btn-sm btn-danger delete-file"><i class="fa fa-times" aria-hidden="true"></i></button>
            </li>
        `;
  fileList.innerHTML = listItem; // Replace the file list with the new file
});

$("body").on("click", ".delete-file", function () {
  fileUploadInput.value = ""; // Clear the file input
  fileList.innerHTML = ""; // Clear the file list
});

function displayFormData() {
  var profilePic = $('input[name="profilePic"]').val();
  var aboutMe = $('textarea[name="AboutMe"]').val();

  if (profilePic) {
    $("#profilePic-view").attr("src", imageStyle);
    $("#profilePic-view").show();
  } else {
    $("#profilePic-view").hide();
  }

  if (aboutMe) {
    $("#aboutMe-view").text(aboutMe);
    $(".aboutMe-row").show();
  } else {
    $(".aboutMe-row").hide();
  }

  // Populate other fields
  var title = $('input[name="title"]:checked').val();
  var position = $('input[name="position-available"]:checked').val();
  var firstName = $('input[name="FirstName"]').val();
  var lastName = $('input[name="LastName"]').val();
  var phone = $('input[name="Phone"]').val();
  var email = $('input[name="Email"]').val();
  var country = $('select[name="Country"]').val();
  var salary = $('input[name="Salary"]').val();
  var salaryCurrency = $('select[name="SalaryCurency"]').val();
  var attachment = "CV/Resume Attached";

  $("#positionAvailable-view").text(position);
  $("#fullname-view").text(title + " " + firstName + " " + lastName);
  $("#phone-view").text(phone);
  $("#email-view").text(email);
  $("#salary-view").text("SALARY: " + salary + " " + salaryCurrency);
  $("#country-view").text(country);

  if (attachment) {
    $("#attachment-view")
      .empty()
      .append('<i class="fas fa-paperclip"></i> ' + attachment);
  } else {
    $("#attachment-view").empty();
  }
}

// Store the initial HTML content in variables
var initialProfilePic = $("#profilePic-view").html();
var initialPositionAvailable = $("#positionAvailable-view").html();
var initialFullName = $("#fullname-view").html();
var initialPhone = $("#phone-view").html();
var initialEmail = $("#email-view").html();
var initialSalary = $("#salary-view").html();
var initialCountry = $("#country-view").html();
var initialAttachment = $("#attachment-view").html();
var initialAboutMe = $("#aboutMe-view").html();

// Function to reset the HTML content
function resetContent() {
  $("#profilePic-view").html(initialProfilePic);
  $("#positionAvailable-view").html(initialPositionAvailable);
  $("#fullname-view").html(initialFullName);
  $("#phone-view").html(initialPhone);
  $("#email-view").html(initialEmail);
  $("#salary-view").html(initialSalary);
  $("#country-view").html(initialCountry);
  $("#attachment-view").html(initialAttachment);
  $("#aboutMe-view").html(initialAboutMe);
  $(".aboutMe-row").show(); // Show the AboutMe row
}

const submitButton = document.querySelector(".send-application");
const checkbox = document.getElementById("id1e");

checkbox.addEventListener("change", function () {
  if (checkbox.checked) {
    submitButton.removeAttribute("disabled");
  } else {
    submitButton.setAttribute("disabled", "disabled");
  }
});

$(document).ready(function () {
  $("#CareerForm").submit(function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Display the message modal
    $("#messageModal").modal("show");

    // Here, you can trigger your backend process (not covered in this code)
    // You may want to use AJAX or other methods to send a request to your backend.

    // For demonstration, let's close the message modal after a delay
    setTimeout(function () {
      $("#messageModal").modal("hide");
    }, 2000); // Close the modal after 2 seconds
  });
});
