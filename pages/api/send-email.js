export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.agentmail.to/v1/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AGENTMAIL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "hello.aiatelier@gmail.com",
        subject: "It works 🚀",
        text: "Your first email from Vercel + AgentMail",
      }),
    });

    const data = await response.json();
    res.status(200).json({ ok: true, data });
  } catch (error) {
    res.status(500).json({ ok: false, error: String(error) });
  }
}
