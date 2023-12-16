// import { LocalStorageCalendar, CalendarEvent } from '../src/calendar';

// describe('LocalStorageCalendar', () => {
//   let localStorageCalendar: LocalStorageCalendar;

//   beforeEach(() => {
//     localStorageCalendar = new LocalStorageCalendar();
//   });

//   test('should save and retrieve an event', async () => {
//     const event: CalendarEvent = {
//       id: '1',
//       text: 'Sample Event',
//       date: new Date(),
//       status: 'TODO', // Assuming a string status for simplicity
//       tags: ['meeting'],
//     };

//     await localStorageCalendar.saveEvent(event);

//     const retrievedEvent = await localStorageCalendar.getEvent('1');
//     expect(retrievedEvent).toEqual(event);
//   });

//   test('should update an event', async () => {
//     const event: CalendarEvent = {
//       id: '1',
//       text: 'Sample Event',
//       date: new Date(),
//       status: 'TODO', // Assuming a string status for simplicity
//       tags: ['meeting'],
//     };

//     await localStorageCalendar.saveEvent(event);

//     const updatedEvent: CalendarEvent = {
//       ...event,
//       text: 'Updated Event',
//       status: 'DONE', // Assuming a string status for simplicity
//     };

//     await localStorageCalendar.updateEvent('1', updatedEvent);

//     const retrievedEvent = await localStorageCalendar.getEvent('1');
//     expect(retrievedEvent).toEqual(updatedEvent);
//   });

//   test('should delete an event', async () => {
//     const event: CalendarEvent = {
//       id: '1',
//       text: 'Sample Event',
//       date: new Date(),
//       status: 'TODO', // Assuming a string status for simplicity
//       tags: ['meeting'],
//     };

//     await localStorageCalendar.saveEvent(event);
//     await localStorageCalendar.deleteEvent('1');

//     const retrievedEvent = await localStorageCalendar.getEvent('1');
//     expect(retrievedEvent).toBeNull();
//   });

//   test('should get all events', async () => {
//     const events: CalendarEvent[] = [
//       { id: '1', text: 'Event 1', date: new Date(), status: 'TODO', tags: ['meeting'] },
//       { id: '2', text: 'Event 2', date: new Date(), status: 'IN_PROGRESS', tags: ['workshop'] },
//     ];

//     for (const event of events) {
//       await localStorageCalendar.saveEvent(event);
//     }

//     const allEvents = await localStorageCalendar.getAllEvents();
//     expect(allEvents).toEqual(events);
//   });
// });
