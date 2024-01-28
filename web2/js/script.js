window.addEventListener("scroll", function () {
  var header = document.getElementById("header");
  header.classList.toggle("backgroundBlack", window.scrollY > 0);
});

const driveSales = document.getElementById("driveSales");
driveSales.addEventListener("click", () => {
  //boton
  const botonDriveSales = document.getElementById("driveSales");
  botonDriveSales.classList.add("hoverButton");
  const botonGenerateLeads = document.getElementById("generateLeads");
  botonGenerateLeads.classList.remove("hoverButton");
  const botonAttractCustomers = document.getElementById("attractCustomers");
  botonAttractCustomers.classList.remove("hoverButton");
  const botonBoostConversion = document.getElementById("boostConversion");
  botonBoostConversion.classList.remove("hoverButton");

  const generateLeads = document.querySelector(".generateLeads");
  generateLeads.classList.add("hidden");
  generateLeads.classList.remove("display");
  const turn = document.querySelector(".turn");
  turn.classList.add("hidden");
  turn.classList.remove("display");
  const attractCustomers = document.querySelector(".attractCustomers");
  attractCustomers.classList.add("hidden");
  attractCustomers.classList.remove("display");
  const meet = document.querySelector(".meet");
  meet.classList.add("hidden");
  meet.classList.remove("display");
  const boostConversion = document.querySelector(".boostConversion");
  boostConversion.classList.add("hidden");
  boostConversion.classList.remove("display");
  const attention = document.querySelector(".attention");
  attention.classList.add("hidden");
  attention.classList.remove("display");
  const driveSales = document.querySelector(".driveSales");
  driveSales.classList.add("display");
  const grow = document.querySelector(".grow");
  grow.classList.add("display");
});

const generateLeads = document.getElementById("generateLeads");
generateLeads.addEventListener("click", () => {
  //boton
  const botonDriveSales = document.getElementById("driveSales");
  botonDriveSales.classList.remove("hoverButton");
  const botonGenerateLeads = document.getElementById("generateLeads");
  botonGenerateLeads.classList.add("hoverButton");
  const botonAttractCustomers = document.getElementById("attractCustomers");
  botonAttractCustomers.classList.remove("hoverButton");
  const botonBoostConversion = document.getElementById("boostConversion");
  botonBoostConversion.classList.remove("hoverButton");

  const driveSales = document.querySelector(".driveSales");
  driveSales.classList.remove("display");
  driveSales.classList.add("hidden");
  const grow = document.querySelector(".grow");
  grow.classList.remove("display");
  grow.classList.add("hidden");

  const attractCustomers = document.querySelector(".attractCustomers");
  attractCustomers.classList.add("hidden");
  attractCustomers.classList.remove("display");
  const meet = document.querySelector(".meet");
  meet.classList.add("hidden");
  meet.classList.remove("display");

  const boostConversion = document.querySelector(".boostConversion");
  boostConversion.classList.add("hidden");
  boostConversion.classList.remove("display");
  const attention = document.querySelector(".attention");
  attention.classList.add("hidden");
  attention.classList.remove("display");

  const generateLeads = document.querySelector(".generateLeads");
  generateLeads.classList.add("display");
  const turn = document.querySelector(".turn");
  turn.classList.add("display");
});

const attractCustomers = document.getElementById("attractCustomers");
attractCustomers.addEventListener("click", () => {
  //boton
  const botonDriveSales = document.getElementById("driveSales");
  botonDriveSales.classList.remove("hoverButton");
  const botonGenerateLeads = document.getElementById("generateLeads");
  botonGenerateLeads.classList.remove("hoverButton");
  const botonAttractCustomers = document.getElementById("attractCustomers");
  botonAttractCustomers.classList.add("hoverButton");
  const botonBoostConversion = document.getElementById("boostConversion");
  botonBoostConversion.classList.remove("hoverButton");

  const driveSales = document.querySelector(".driveSales");
  driveSales.classList.add("hidden");
  driveSales.classList.remove("display");
  const grow = document.querySelector(".grow");
  grow.classList.remove("display");
  grow.classList.add("hidden");

  const generateLeads = document.querySelector(".generateLeads");
  generateLeads.classList.add("hidden");
  generateLeads.classList.remove("display");
  const turn = document.querySelector(".turn");
  turn.classList.remove("display");
  turn.classList.add("hidden");

  const boostConversion = document.querySelector(".boostConversion");
  boostConversion.classList.add("hidden");
  boostConversion.classList.remove("display");
  const attention = document.querySelector(".attention");
  attention.classList.add("hidden");
  attention.classList.remove("display");

  const attractCustomers = document.querySelector(".attractCustomers");
  attractCustomers.classList.add("display");
  const meet = document.querySelector(".meet");
  meet.classList.add("display");
});

const boostConversion = document.getElementById("boostConversion");
boostConversion.addEventListener("click", () => {
  //boton
  const botonDriveSales = document.getElementById("driveSales");
  botonDriveSales.classList.remove("hoverButton");
  const botonGenerateLeads = document.getElementById("generateLeads");
  botonGenerateLeads.classList.remove("hoverButton");
  const botonAttractCustomers = document.getElementById("attractCustomers");
  botonAttractCustomers.classList.remove("hoverButton");
  const botonBoostConversion = document.getElementById("boostConversion");
  botonBoostConversion.classList.add("hoverButton");

  const driveSales = document.querySelector(".driveSales");
  driveSales.classList.add("hidden");
  driveSales.classList.remove("display");
  const grow = document.querySelector(".grow");
  grow.classList.remove("display");
  grow.classList.add("hidden");

  const attractCustomers = document.querySelector(".attractCustomers");
  attractCustomers.classList.add("hidden");
  attractCustomers.classList.remove("display");
  const meet = document.querySelector(".meet");
  meet.classList.add("hidden");
  meet.classList.remove("display");

  const generateLeads = document.querySelector(".generateLeads");
  generateLeads.classList.add("hidden");
  generateLeads.classList.remove("display");
  const turn = document.querySelector(".turn");
  turn.classList.remove("display");
  turn.classList.add("hidden");

  const boostConversion = document.querySelector(".boostConversion");
  boostConversion.classList.add("display");
  const attention = document.querySelector(".attention");
  attention.classList.add("display");
});
