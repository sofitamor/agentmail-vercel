export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://api.agentmail.to/v0/inboxes/agreeablepath10%40agentmail.to/messages/send",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AGENTMAIL_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: ["hello.aiatelier@gmail.com"],
          subject: "It works 🚀",
          text: "Your first email from Vercel + AgentMail",
        }),
      }
    );

    const data = await response.json();

    return res.status(response.ok ? 200 : response.status).json({
      ok: response.ok,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: String(error),
    });
  }
}
