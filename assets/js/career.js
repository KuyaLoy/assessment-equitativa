var mySwiper = new Swiper(".swiper-container", {
  loop: true,
  autoplay: {
    delay: 3000, // Autoplay delay in milliseconds
  },
  noSwiping: true, // Disable swiping by default
  noSwipingClass: "no-swipe", // Apply swiping to elements with this class
});
