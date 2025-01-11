document.addEventListener("DOMContentLoaded", function () {
  // Filtrage des images par catégorie
  const filterButtons = document.querySelectorAll(".filter-button");
  const images = document.querySelectorAll(".image");
  const searchInput = document.getElementById("search");

  // Filtrage par catégorie
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.getAttribute("data-filter");
      images.forEach((image) => {
        const category = image.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          image.style.display = "block";
        } else {
          image.style.display = "none";
        }
      });
    });
  });

  // Barre de recherche
  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    images.forEach((image) => {
      const altText = image.querySelector("img").getAttribute("alt").toLowerCase();
      if (altText.includes(searchTerm)) {
        image.style.display = "block";
      } else {
        image.style.display = "none";
      }
    });
  });

  // Lightbox
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxTitle = document.getElementById("lightbox-title");
  const closeBtn = document.querySelector(".close");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  let currentImageIndex = 0;
  const imagesArray = Array.from(document.querySelectorAll(".image img"));

  // Ouvrir la lightbox
  imagesArray.forEach((img, index) => {
    img.addEventListener("click", () => {
      console.log("Image cliquée :", img.src); // Log pour déboguer
      currentImageIndex = index;
      updateLightbox();
      lightbox.style.display = "block";
    });

    // Gestion des erreurs d'images
    img.onerror = () => {
      console.error("Image non trouvée :", img.src);
    };
  });

  // Fermer la lightbox
  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  // Navigation dans la lightbox
  prevBtn.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex - 1 + imagesArray.length) % imagesArray.length;
    updateLightbox();
  });

  nextBtn.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex + 1) % imagesArray.length;
    updateLightbox();
  });

  // Mettre à jour la lightbox
  function updateLightbox() {
    lightboxImg.src = imagesArray[currentImageIndex].src;
    lightboxTitle.textContent = imagesArray[currentImageIndex].alt;
  }

  // Navigation au clavier
  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "block") {
      if (e.key === "ArrowLeft") {
        currentImageIndex = (currentImageIndex - 1 + imagesArray.length) % imagesArray.length;
        updateLightbox();
      } else if (e.key === "ArrowRight") {
        currentImageIndex = (currentImageIndex + 1) % imagesArray.length;
        updateLightbox();
      } else if (e.key === "Escape") {
        lightbox.style.display = "none";
      }
    }
  });
});