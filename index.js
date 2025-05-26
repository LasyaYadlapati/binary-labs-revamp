const ARE_WE_HOME = document.documentElement.classList.contains("home");

const pages = [
  { url: "#home", title: "HOME" },
  { url: "#our-apps", title: "OUR APPS" },
  { url: "#faq", title: "FAQ" },
  { url: "#contact", title: "CONTACT US" },
];

const nav = document.createElement("nav");
nav.classList.add("main-nav");

const navLeft = document.createElement("div");
navLeft.classList.add("nav-left");

const logo = document.createElement("img");
logo.src = "assets/logo.svg";
logo.alt = "Binary Labs Logo";
logo.classList.add("logo");

const brand = document.createElement("span");
brand.classList.add("brand-name");

navLeft.append(logo, brand);

const navRight = document.createElement("div");
navRight.classList.add("nav-right");

for (let p of pages) {
  const a = document.createElement("a");
  a.href = p.url;
  a.textContent = p.title;
  navRight.appendChild(a);
}

nav.append(navLeft, navRight);
document.body.prepend(nav);

let lastScrollY = window.scrollY;
window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY) {
    nav.classList.add("nav-hidden");
  } else {
    nav.classList.remove("nav-hidden");
  }

  lastScrollY = currentScrollY;
});

document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const nameInput = document.querySelector("input[name='name']");
    const emailInput = document.querySelector("input[name='email']");
    const message = document.getElementById("form-message");

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    if (!name || !email) {
      message.textContent = "Please fill out both fields.";
      message.style.color = "white";
      return;
    }

    message.textContent = `Thank you, ${name}! We'll contact you at ${email}.`;
    message.style.color = "#dff0d8";

    nameInput.value = "";
    emailInput.value = "";
  });
