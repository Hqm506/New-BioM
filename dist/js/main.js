(function () {
  "use strict";

  var products = {
    serum: {
      title: "Sérum Nutritivo",
      category: "Ritual de nutrición",
      description:
        "Una textura ligera para sumar suavidad y luminosidad a tu rutina diaria.",
      detail:
        "Ideal para aplicar sobre la piel limpia antes de tu crema habitual. Elaborado artesanalmente en pequeños lotes.",
      price: "S/ 180.00",
      image: "dist/productos/serum.png",
      alt: "Frasco gotero de sérum natural con aceite dorado"
    },
    crema: {
      title: "Crema Regeneradora",
      category: "Ritual de hidratación",
      description:
        "Nutrición reconfortante para acompañar la piel mañana y noche.",
      detail:
        "Su textura cremosa ayuda a dejar la piel con una sensación suave y confortable. Elaborada artesanalmente.",
      price: "S/ 204.50",
      image: "dist/productos/crema.png",
      alt: "Tarro de crema regeneradora de textura suave"
    },
    balsamo: {
      title: "Bálsamo BIO",
      category: "Ritual de cuidado diario",
      description:
        "Un bálsamo versátil con una textura reconfortante para sumar suavidad al cuidado diario.",
      detail:
        "Aplicar una pequeña cantidad sobre la piel limpia y extender suavemente. Elaborado artesanalmente.",
      price: "S/ 85.00",
      image: "dist/productos/balsamo.png",
      alt: "Bálsamo BIO de textura cremosa en un recipiente claro"
    },
    exfoliante: {
      title: "Exfoliante Natural",
      category: "Ritual de renovación",
      description:
        "Una textura granulada para complementar tu rutina de cuidado facial.",
      detail:
        "Usar con suavidad sobre la piel húmeda y enjuagar. Evitar el contorno de ojos.",
      price: "S/ 120.00",
      image: "dist/productos/exfoliante.png",
      alt: "Tarro de exfoliante natural con aloe vera"
    },
    mascarilla: {
      title: "Mascarilla Facial",
      category: "Ritual de pausa",
      description:
        "Una mascarilla cremosa para regalarte un momento de cuidado y calma.",
      detail:
        "Aplicar sobre la piel limpia, dejar actuar y retirar con agua. Seguir las indicaciones del envase.",
      price: "S/ 90.00",
      image: "dist/productos/mascarilla.png",
      alt: "Tarro de mascarilla facial natural con textura cremosa"
    },
    kit: {
      title: "Kit Completo",
      category: "Ritual completo",
      description:
        "Una selección de esenciales botánicos para regalar o regalarte.",
      detail:
        "Combina productos de cuidado facial BIO-Membrana en un solo ritual, pensado para disfrutar cada paso.",
      price: "S/ 350.00",
      image: "dist/productos/kit.png",
      alt: "Set de productos de cuidado facial BIO-Membrana"
    }
  };

  var modalElement = document.getElementById("modalProducto");

  document.querySelectorAll(".js-product-detail").forEach(function (button) {
    button.addEventListener("click", function () {
      var product = products[button.getAttribute("data-product")];

      if (!product || !modalElement || typeof bootstrap === "undefined") {
        console.error("No se pudo abrir la ficha del producto.");
        return;
      }

      document.getElementById("modalProductoTitulo").textContent = product.title;
      document.getElementById("modalCategoria").textContent = product.category;
      document.getElementById("modalDescripcion").textContent = product.description;
      document.getElementById("modalDetalle").textContent = product.detail;
      document.getElementById("modalPrecio").textContent = product.price;

      var isSubpage = window.location.pathname.toLowerCase().indexOf("/page/") !== -1;
      var image = document.getElementById("modalImagen");
      image.src = (isSubpage ? "../" : "") + product.image;
      image.alt = product.alt;

      var contactLink = document.getElementById("modalContacto");
      if (contactLink) {
        contactLink.href = (isSubpage ? "" : "page/") + "contacto.html";
      }

      bootstrap.Modal.getOrCreateInstance(modalElement).show();
    });
  });

  var productCards = document.querySelectorAll(".product-card");
  var contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var status = document.getElementById("contactFormStatus");

      contactForm.classList.add("was-validated");

      if (!contactForm.checkValidity()) {
        if (status) {
          status.textContent = "Revisa los campos marcados antes de continuar.";
          status.classList.remove("d-none");
        }
        return;
      }

      if (status) {
        status.textContent =
          "Los datos son válidos, pero este sitio aún no está conectado a un servicio de envío.";
        status.classList.remove("d-none");
      }
    });
  }

  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    productCards.forEach(function (card) {
      card.classList.add("is-reveal-target");
      revealObserver.observe(card);
    });
  }
})();
