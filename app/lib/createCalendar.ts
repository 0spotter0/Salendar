"use server"

// google-calendar.ts
import { google, calendar_v3 } from 'googleapis';
const credentials = require('./dandyhacks-2023-656668fc2346.json');


// Replace with your own credentials
// const apiKey = process.env.GOOGLE_CALENDAR_API_KEY;
// const clientId = process.env.GOOGLE_CALENDAR_CLIENT_ID;
// const clientEmail = process.env.GOOGLE_CALENDAR_CLIENT_EMAIL;
// const privateKey = process.env.GOOGLE_CALENDAR_PRIVATE_KEY;

type Assignment = {
    title: string;
    due_day: number;
    due_month: number;
    due_year: number;
};


const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: 'https://www.googleapis.com/auth/calendar',
});

const calendar = google.calendar({ version: 'v3', auth });

// TODO: Create wrapper function that client calls
export async function createClassCalendar(syllabusText: string, userEmail: string): Promise<string | null> {

    try {
        const syllabusObject = await JSON.parse(syllabusText);
        
        const newCalendar: calendar_v3.Schema$Calendar | null = await createCalendar(syllabusObject.title)
        if (!newCalendar) {
            console.log("FUCK: Calendar is null!")
            return null;
        }
        
        const events: calendar_v3.Schema$Event[] = await createAssignments(syllabusObject.assignments)
        
        
        if (!newCalendar.id) {
            console.log("FUCK: ...id is null????")
            return null;
        }

        const calendarId: string = newCalendar.id
        
        events.forEach((event: calendar_v3.Schema$Event) => {
            addEventToCalendar(calendarId, event)
        })
        
        shareCalendar(newCalendar, userEmail);

        const calendarLink = `https://calendar.google.com/calendar/r?cid=${calendarId}`;
        console.log(calendarLink)
        return calendarLink;
    } catch (e) {
        console.log("Error: invalid json", e)
        return null
    }
}

// Parsing JSON-looking string into Assignment objects
async function createAssignments(assignments: Assignment[]): Promise<calendar_v3.Schema$Event[]> {
    console.log(JSON.stringify(assignments))

    try {
        const createdEvents: calendar_v3.Schema$Event[] = assignments.map((item: Assignment): calendar_v3.Schema$Event => {
            const dateString = `${item.due_year}-${item.due_month}-${item.due_day}`
            const event: calendar_v3.Schema$Event = {
                summary: item.title,
                // location: 'Location',
                // description: 'Assignment description',
                start: {
                    date: dateString,
                },
                end: {
                    date: dateString,
                },
            };
            return event;
        });

        return createdEvents;
    } catch (e) {
        console.log("Error: invalid json", e)
        return []
    }
}

// Function to create a new calendar
const createCalendar = async (title: string): Promise<calendar_v3.Schema$Calendar | null> => {
    const calendarData: calendar_v3.Schema$Calendar = {
        summary: title,
        timeZone: 'America/Los_Angeles', // Replace with your desired time zone
    };

    try {
        const response = await calendar.calendars.insert({
            requestBody: calendarData,
        });
        return response.data;
    } catch (error) {
        console.error('Error creating calendar:', error);
        return null;
    }
};

// Function to add an event to a calendar
const addEventToCalendar = async (calendarId: string, eventData: calendar_v3.Schema$Event): Promise<calendar_v3.Schema$Event | null> => {

    try {
        const response = await calendar.events.insert({
            calendarId,
            requestBody: eventData,
        });

        return response.data;
    } catch (error) {
        console.error('Error adding event to calendar:', error);
        return null;
    }
};

async function shareCalendar(newCalendar: calendar_v3.Schema$Calendar, email: string) {
    // Create an instance of the Calendar API
    // const calendar = google.calendar('v3');

    try {
        // Send the calendarId and the email to the API to share the calendar
        await calendar.acl.insert({
            calendarId: newCalendar.id!,
            requestBody: {
                role: 'reader',
                scope: {
                    type: 'user',
                    value: email,
                },
            },
        });

        console.log(`Calendar shared successfully with ${email}`);
    } catch (error) {
        console.error('Error sharing calendar:', error);
    }
}