export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405 };
  }

  const { name, email, message, page, timestamp } = JSON.parse(event.body);

  // Basic validation
  if (!name || !email || !message) {
    return { statusCode: 400 };
  }

  const BOT_TOKEN = process.env.BOT_TOKEN;
  const CHAT_ID = process.env.CHAT_ID;

  const text = `
📩 <b>New Form Submission</b>

👤 <b>Name:</b> ${name}
📧 <b>Email:</b> ${email}

📝 <b>Message:</b>
${message}

🌍 <b>Page:</b> ${page}
⏱ <b>Time:</b> ${timestamp}
`;

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true
    })
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
}
