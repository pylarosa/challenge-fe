import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Address } from '../dto/address';

@Component({
  selector: 'app-address-details-dialog',
  templateUrl: './address-details-dialog.component.html',
  styleUrls: ['./address-details-dialog.component.css'],
})
export class AddressDetailsDialogComponent implements OnInit {
  @Input() address?: Address;
  
  constructor(public activeModal: NgbModal) {}
  ngOnInit(): void {
    console.log(this.address);
  }

  closeModal(): void {
    this.activeModal.dismissAll();
  }
}
