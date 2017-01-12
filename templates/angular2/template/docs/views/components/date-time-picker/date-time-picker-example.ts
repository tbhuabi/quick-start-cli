import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'date-time-picker-example',
    templateUrl: 'date-time-picker-example.html'
})
export class DateTimePickerExampleComponent {
    value = '';
    constructor(public activatedRoute: ActivatedRoute) {
    }

    onSelected($event) {
        this.value = $event;
    }
}