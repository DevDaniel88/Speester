document.addEventListener("DOMContentLoaded", function () {
  var burgerIcon = document.getElementById("burger-icon");
  var navigation = document.querySelector(".main-navigation");

  burgerIcon.addEventListener("click", function () {
    navigation.classList.toggle("active");
  });
});
