// routes/eventRoutes.js

const express = require('express');
const { google } = require('googleapis');

const router = express.Router();

// POST /api/createEvent
router.post('/createEvent', async (req, res) => {
  const { event, accessToken } = req.body;

  if (!event || !accessToken) {
    console.error('Missing event or accessToken:', { event, accessToken });
    return res.status(400).json({ error: 'Missing event or accessToken in request body.' });
  }

  try {
    // Configure Google Calendar API
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    // Create an event in Google Calendar
    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
    });

    res.status(201).json({ message: 'Event created successfully!', event: response.data });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Failed to create event. Please try again later.' });
  }
});

// POST /api/sendEmail
router.post('/sendEmail', async (req, res) => {
  const { accessToken, doctorEmail, eventTitle, description, location } = req.body;

  if (!accessToken || !doctorEmail || !eventTitle || !description || !location) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  try {
    // Configure OAuth2 client with access token
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });

    // Configure Gmail API
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    // Create email content
    const emailContent = `To: ${doctorEmail}
Subject: ${eventTitle}

Details:
${description}

Location: ${location}`;

    const encodedMessage = Buffer.from(emailContent)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    // Send the email
    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    });

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email. Please try again later.' });
  }
});

module.exports = router;
