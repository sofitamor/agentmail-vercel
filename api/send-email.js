export default async function handler(req, res) {
  try {
    const subject =
      req.method === "POST" && req.body?.subject
        ? req.body.subject
        : "New notification from OpenClaw";

    const text =
      req.method === "POST" && req.body?.message
        ? req.body.message
        : "OpenClaw finished a task.";

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
          subject,
          text,
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
