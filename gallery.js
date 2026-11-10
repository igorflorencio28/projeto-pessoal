const gallery = document.querySelector("#aventuras");
const captures = [...gallery.querySelectorAll(".capture")];
const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox.querySelector(".lightbox-image");
const originalLink = lightbox.querySelector(".lightbox-original");
const caption = lightbox.querySelector(".lightbox-caption");
const counter = lightbox.querySelector(".lightbox-count");

let currentCapture = 0;
let galleryTrigger;

function showCapture(index) {
  currentCapture = (index + captures.length) % captures.length;
  const capture = captures[currentCapture];
  lightboxImage.src = capture.href;
  originalLink.href = capture.href;
  lightboxImage.alt = `Captura de ${capture.dataset.title}`;
  caption.textContent = capture.dataset.title;
  counter.textContent = `${currentCapture + 1} / ${captures.length}`;
}

gallery.addEventListener("click", (event) => {
  const capture = event.target.closest(".capture");
  if (
    !capture ||
    event.ctrlKey ||
    event.metaKey ||
    event.shiftKey ||
    event.altKey ||
    typeof lightbox.showModal !== "function"
  )
    return;

  event.preventDefault();
  galleryTrigger = capture;
  showCapture(captures.indexOf(capture));
  lightbox.showModal();
});

lightbox
  .querySelector(".previous")
  .addEventListener("click", () => showCapture(currentCapture - 1));
lightbox
  .querySelector(".next")
  .addEventListener("click", () => showCapture(currentCapture + 1));

lightbox.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
    showCapture(currentCapture + (event.key === "ArrowLeft" ? -1 : 1));
  }
});

lightbox.addEventListener("click", (event) => {
  if (event.target !== lightbox) return;
  const bounds = lightbox.getBoundingClientRect();
  if (
    event.clientX < bounds.left ||
    event.clientX > bounds.right ||
    event.clientY < bounds.top ||
    event.clientY > bounds.bottom
  ) {
    lightbox.close();
  }
});

lightbox.addEventListener("close", () => {
  lightboxImage.removeAttribute("src");
  galleryTrigger?.focus();
});
