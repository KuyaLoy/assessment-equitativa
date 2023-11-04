var mySwiper = new Swiper(".swiper-container", {
  loop: true,
  autoplay: {
    delay: 3000, // Autoplay delay in milliseconds
  },
  noSwiping: true, // Disable swiping by default
  noSwipingClass: "no-swipe", // Apply swiping to elements with this class
});

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
    if (nextCount < 5) {
      nextCount++;

      $(".steps").removeClass("active");
      $("#step-" + nextCount + "").addClass("active");

      if (nextCount == 2) {
        $(".prev").addClass("active");
      }
      if (nextCount == 5) {
        $(".next").addClass("hide");
        $(".send-application").addClass("active");
      }
      $("#progressbar li:nth-child(" + nextCount + ")").addClass("active");
    }
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
      }
    }

    console.log(nextCount);
  });
});
