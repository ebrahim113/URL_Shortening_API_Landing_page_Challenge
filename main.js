const bars = document.querySelector("header .container i");

const nav = document.querySelector("header .container nav");

let isOpen = false;

const urlInput = document.querySelector(".url");

const shortenBtn = document.querySelector(".short-it button");

const errorP = document.querySelector(".short-it p");

const result = document.querySelector(".result");

console.log(result);

const shortenUrl = async (longUrl) => {
  const response = await fetch(
    "https://cors-anywhere.herokuapp.com/https://cleanuri.com/api/v1/shorten",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        url: longUrl,
      }),
    }
  );

  const data = await response.json();

  result.innerHTML = `
      <div class="link">
      <p>${longUrl}</p>
      <span>${data.result_url}</span>
      </div>
      <button>Copy</button>
      `;
};

onresize = (_) => {
  if (screen.width > 767) nav.style.display = "flex";
};

bars.addEventListener("click", (_) => {
  if (!isOpen) {
    nav.style.display = "flex";
    isOpen = true;
  } else {
    nav.style.display = "none";
    isOpen = false;
  }
});

shortenBtn.addEventListener("click", (_) => {
  if (!urlInput.value) {
    errorP.style.display = "block";
    urlInput.className = "error";
  } else {
    shortenUrl(urlInput.value);
    errorP.style.display = "none";
    urlInput.classList.remove("error");
  }
});

document.addEventListener("click", (e) => {
  if (e.target.textContent === "Copy") {
    e.target.textContent = "Copied!";
    e.target.style.backgroundColor = "var(--purple-950)";
    e.target.style.cursor = "disabled";
    navigator.clipboard.writeText(
      document.querySelector(".result span").textContent
    );
  }
});
