const ARE_WE_HOME = document.documentElement.classList.contains("home");

const pages = [
  { url: "/#home", title: "HOME" },
  { url: "/#our-apps", title: "OUR APPS" },
  { url: "/troubleshooting/index.html", title: "QUESTIONS?" },
  { url: "/#contact-us", title: "CONTACT US" },
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

    const name = document.querySelector("input[name='name']").value.trim();
    const email = document.querySelector("input[name='email']").value.trim();
    const userMessage = document
      .querySelector("textarea[name='message']")
      .value.trim();
    const message = document.getElementById("form-message");

    message.textContent = "";

    fetch("https://sheetdb.io/api/v1/a8ql2hbdbwaph", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          name: name,
          email: email,
          message: userMessage, // <-- Added this line
        },
      }),
    })
      .then((res) => {
        if (res.ok) {
          message.style.color = "#dff0d8";
          message.textContent = "Thank you! Your info has been received.";
          document.getElementById("contact-form").reset();
        } else {
          throw new Error("Form submission failed.");
        }
      })
      .catch(() => {
        message.style.color = "red";
        message.textContent = "Oops! Something went wrong.";
      });
  });
