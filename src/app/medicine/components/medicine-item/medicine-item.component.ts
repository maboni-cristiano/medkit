import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Medicine } from '../models/medicine.model';

@Component({
  selector: 'app-medicine-item',
  templateUrl: './medicine-item.component.html',
  styleUrls: ['./medicine-item.component.scss'],
})
export class MedicineItemComponent {

@Input() medicine: Medicine;
@Output() update = new EventEmitter<Medicine>();
@Output() delete = new EventEmitter<Medicine>();
}
