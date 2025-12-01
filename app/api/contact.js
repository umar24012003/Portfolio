import connectToDB from "../../lib/mongodb";
import Contact from "../../models/Contact";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await connectToDB();
      const { name, email, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: "All fields are required" });
      }

      const newContact = new Contact({ name, email, message });
      await newContact.save();

      return res.status(201).json({ success: true, message: "Message saved successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ success: false, message: `Method ${req.method} not allowed` });
  }
}
