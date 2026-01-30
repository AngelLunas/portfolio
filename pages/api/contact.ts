import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, message, subject } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Format message for sending
    const formattedSubject = (subject && typeof subject === 'string') ? subject.trim() : 'Contact from portfolio';
    const formattedMessage = `
        New contact message:

        Name: ${name.trim()}
        Email: ${email.trim()}
        Subject: ${formattedSubject}

        Message:
        ${message.trim()}
    `;

    try {
        // Here would go the email sending logic (SendGrid, Resend, etc.)
        console.log('Sending message:', formattedMessage);

        // Simulate sending delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        return res.status(200).json({
            success: true,
            message: 'Message sent! I will get back to you soon.'
        });
    } catch (error) {
        console.error('Error sending message:', error);
        return res.status(500).json({ error: 'Error sending message' });
    }
}