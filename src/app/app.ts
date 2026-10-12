import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookingManagement } from './Pages/booking-management/booking-management';

@Component({
  imports: [RouterOutlet, BookingManagement],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('BookingManagement');
}
