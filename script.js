// Menú móvil
const toggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", open);
  toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
});

nav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  })
);

// Filtro de sedes
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((t) => t.classList.remove("is-active"));
    tab.classList.add("is-active");
    const city = tab.dataset.city;
    document.querySelectorAll(".location").forEach((loc) => {
      loc.classList.toggle("is-hidden", city !== "all" && loc.dataset.city !== city);
    });
  });
});

// Consulta de resultados (demo)
document.getElementById("resultsForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const code = document.getElementById("orderCode").value.trim().toUpperCase();
  const msg = document.getElementById("resultsMsg");
  msg.textContent = /^BLC-\d{6}$/.test(code)
    ? `Orden ${code}: tus resultados están listos. Revisa tu correo para descargarlos.`
    : "Código no válido. Usa el formato BLC-123456.";
});

// Formulario de cita
const dateInput = document.getElementById("date");
dateInput.min = new Date().toISOString().split("T")[0];

document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;
  const msg = document.getElementById("contactMsg");
  let valid = true;

  form.querySelectorAll("[required]").forEach((field) => {
    const ok = field.value.trim() !== "";
    field.classList.toggle("invalid", !ok);
    if (!ok) valid = false;
  });

  if (!valid) {
    msg.className = "form-msg err";
    msg.textContent = "Por favor completa todos los campos.";
    return;
  }

  msg.className = "form-msg ok";
  msg.textContent = `¡Gracias, ${form.name.value.split(" ")[0]}! Te contactaremos para confirmar tu cita.`;
  form.reset();
});
