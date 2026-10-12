import { Routes } from '@angular/router';
import { BookingForm } from './Components/booking-form/booking-form';
import { RoomDetails } from './Components/room-details/room-details';
import { App } from './app';
import { BookingManagement } from './Pages/booking-management/booking-management';

export const routes: Routes = [
    { path: '', redirectTo: '/bookingManagement', pathMatch: 'full'},
    { path: 'bookingManagement', component:BookingManagement},
    { path: 'bookingForm', component:BookingForm},
    { path: 'roomDetails', component:RoomDetails},
    { path: '**', redirectTo: '/bookingManagement'}
];
