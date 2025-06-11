// server/routes/bookAppointmentRoutes.js
const express = require('express');
const router = express.Router();
const { google } = require('googleapis');

router.post('/', async (req, res) => {
  const { name, email, phone, description, mode, timeSlot, doctor, date } = req.body;

  try {
    // OAuth2 setup (use your credentials and tokens)
    const oAuth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.REDIRECT_URI
    );

    oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

    const [startTime, endTime] = timeSlot.split('-').map(t => t.trim());

    const event = {
      summary: `Appointment with Dr. ${doctor.name}`,
      description: `${description}\nPatient: ${name}, Contact: ${phone}`,
      location: mode === 'offline' ? doctor['map location'] : '',
      start: {
        dateTime: `${date}T${startTime}:00+05:30`, // ✅ dynamic date
        timeZone: 'Asia/Kolkata',
      },
      end: {
        dateTime: `${date}T${endTime}:00+05:30`, // ✅ dynamic date
        timeZone: 'Asia/Kolkata',
      },
      attendees: [
        { email: email },
        { email: doctor['email id'] },
      ],
    };


    if (mode === 'online') {
      event.conferenceData = {
        createRequest: {
          requestId: `meet-${Date.now()}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      };
    }

    // console.log('Creating event for:', event.start.dateTime, 'to', event.end.dateTime);

    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
      sendUpdates: 'all',
      conferenceDataVersion: 1,
    });

    return res.status(200).json({ message: 'Event created', eventLink: response.data.htmlLink });
  } catch (err) {
    console.error('Error creating event:', err);
    return res.status(500).json({ error: 'Failed to create event' });
  }
});

module.exports = router;
