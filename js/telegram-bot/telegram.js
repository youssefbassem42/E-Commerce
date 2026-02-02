/* Telegram Bot script */


const form = document.getElementById("contactForm");
const status = document.getElementById("status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  // Anti-spam check (honeypot)
  if (formData.get("company")) return;

  const payload = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    page: window.location.href,
    timestamp: new Date().toISOString()
  };

  try {
    const res = await fetch("/.netlify/functions/telegram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      status.textContent = "✅ Message sent successfully";
      form.reset();
    } else {
      throw new Error();
    }
  } catch {
    status.textContent = "❌ Failed to send message";
  }
});

