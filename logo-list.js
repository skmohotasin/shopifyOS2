document.addEventListener("DOMContentLoaded", function () {
  const slide = document.querySelector("#splide-track");
  const splide = new Splide(".splide", {
    type: "loop",
    drag: "free",
    focus: "center",
    lazyload: "loaded",
    arrows: false,
    pagination: false,
    autoWidth: true,
    rewind: slide.dataset.rewind,
    pauseOnHover: slide.dataset.pauseOnHover,
    pauseOnFocus: slide.dataset.pauseOnFocus,
    autoStart: slide.dataset.autoStart,
    autoScroll: {
      speed: slide.dataset.speed,
    },
  });

  splide.mount(window.splide.Extensions);
});
