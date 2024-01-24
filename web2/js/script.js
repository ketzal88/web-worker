window.addEventListener("scroll", function () {
  var header = document.getElementById("header");
  header.classList.toggle("backgroundBlack", window.scrollY > 0);
});
