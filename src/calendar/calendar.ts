// enum TaskStatus {
//   TODO = "TODO",
//   IN_PROGRESS = "IN_PROGRESS",
//   DONE = "DONE",
// }

// interface CalendarEvent {
//   id: string;
//   text: string;
//   date: Date;
//   status: TaskStatus;
//   tags: string[];
// }

// interface CalendarStorage {
//   saveEvent(event: CalendarEvent): Promise<void>;
//   getEvent(id: string): Promise<CalendarEvent | null>;
//   updateEvent(id: string, event: CalendarEvent): Promise<void>;
//   deleteEvent(id: string): Promise<void>;
//   getAllEvents(): Promise<CalendarEvent[]>;
// }

// class LocalStorageCalendar implements CalendarStorage {
//   async saveEvent(event: CalendarEvent): Promise<void> {
//     // Реализация сохранения в localStorage
//   }

//   async getEvent(id: string): Promise<CalendarEvent | null> {
//     // Реализация чтения из localStorage
//   }

//   async updateEvent(id: string, event: CalendarEvent): Promise<void> {
//     // Реализация обновления в localStorage
//   }

//   async deleteEvent(id: string): Promise<void> {
//     // Реализация удаления из localStorage
//   }

//   async getAllEvents(): Promise<CalendarEvent[]> {
//     // Реализация получения всех событий из localStorage
//     return [];
//   }
// }

// export { CalendarEvent, CalendarStorage, LocalStorageCalendar };
