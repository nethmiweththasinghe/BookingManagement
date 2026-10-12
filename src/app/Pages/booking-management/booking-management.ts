import { Component, signal } from '@angular/core';
import { RoomDetails } from '../../Components/room-details/room-details';
import { RoomResponse } from '../../Model/room-response';
import { BookingForm } from '../../Components/booking-form/booking-form';

@Component({
  imports: [RoomDetails, BookingForm],
  selector: 'app-booking-management',
  styleUrl: './booking-management.css',
  templateUrl: './booking-management.html',
})
export class BookingManagement {
  selectedRoom = signal<RoomResponse | null>(null);  
}
