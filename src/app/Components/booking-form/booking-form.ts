import { Component, inject, input, signal } from '@angular/core';
import { BookingService } from '../../Services/booking-service';
import { BookingRequest } from '../../Model/booking-request';
import { form, FormField, FormRoot, max, maxLength, min, required } from '@angular/forms/signals';
import { RoomResponse } from '../../Model/room-response';

const EMPTY_BOOKING: BookingRequest = {
  bookingId: 0,
  roomId: 0,
  staffId: 0,
  bookingDate: '',
  bookingTime: '',
  meetingHours: 0,
  title: '',
  noAttendees: 0,
  status: '',
  createdTime: '',
};
@Component({
  imports: [FormField, FormRoot],
  selector: 'app-booking-form',
  styleUrl: './booking-form.css',
  templateUrl: './booking-form.html',
})
export class BookingForm {
  private bookingService = inject(BookingService);

  room = input<RoomResponse | null>(null);

  confirmation = signal('');
  errorMessage = signal('');


  bookingModel = signal<BookingRequest>({ ...EMPTY_BOOKING });

  bookingForm = form(
    this.bookingModel,
    (f) => {
      maxLength(f.title, 50, { message: 'Title can be up to 50 characters' });
      required(f.bookingDate, { message: 'Please pick a date' });
      required(f.bookingTime, { message: 'Please pick a time' });
      min(f.meetingHours, 1, { message: 'At least 1 hour' });
      min(f.noAttendees, 1, { message: 'At least 1 person' });
      max(f.noAttendees, () => this.room()?.capacity ?? 1, {
        message: 'Too many people for this room',
      });
    },
    {
      // Runs only when every field is valid
      submission: {
        action: async () => this.createBooking(),
      },
    },
  );

  createBooking() {
    const room = this.room();
    if (!room) {
      this.errorMessage.set('Please select a room first.');
      return;
    }

    const formValue = this.bookingModel();

    // Turn the form values into what the API expects
    const request: BookingRequest = {
      roomId: room.id, // the room clicked in the table
      staffId: 1, // TODO: the logged-in user's id
      bookingDate: formValue.bookingDate,
      bookingTime: formValue.bookingTime + ':00', // "10:00" -> "10:00:00"
      meetingHours: formValue.meetingHours,
      title: formValue.title,
      noAttendees: formValue.noAttendees,
      bookingId: 0,
      status: 'Confirmed',
      createdTime: new Date().toISOString(),
    };

    this.errorMessage.set('');

    this.bookingService.createBooking(request).subscribe({
      next: () => {
        this.confirmation.set(`Room ${room.name} booked!`);
        this.bookingForm().reset({ ...EMPTY_BOOKING });
      },
      error: () => {
        this.errorMessage.set('Could not save the booking. Please try again.');
      },
    });
  }
}
