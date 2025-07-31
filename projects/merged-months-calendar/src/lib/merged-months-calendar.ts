import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output, ElementRef } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'merged-months-calendar',
  imports: [MatFormFieldModule, MatIconModule, CommonModule],
  templateUrl: './merged-months-calendar.html',
  styleUrl: './merged-months-calendar.css',

})
export class MergedMonthsCalendar {
  @Output() dateChange: EventEmitter<Date> = new EventEmitter<Date>();
  @Input() currentSelectedDate: Date = new Date();

  // !Months example only works when one label merged but can be used for multiple months: 
  @Input() months: { label: string; value: any }[] =[
      { label: 'Jan', value: 0 },
      { label: 'Feb', value: 1 },
      { label: 'Mar', value: 2 },
      { label: 'Apr', value: 3 },
      { label: 'May', value: 4 },
      { label: 'June', value: 5 },
      { label: 'July-Aug', value: [6, 7] }, // Same value for July and August
      { label: 'Nov', value: 8 },
      { label: 'Oct', value: 9 },
      { label: 'Nov', value: 10 },
      { label: 'Dec', value: 11 },
    ];

  displayMonth: string = 'Seç';
  displayYear: number = new Date().getFullYear();
  isMonthPickerOpen: boolean = false;
  currentSelectedMonth: { label: string; value: number | number[] } | null = null;

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isMonthPickerOpen = false;
    }
  }

  ngOnInit() {
    this.displayMonth = this.getDisplayMonth(this.currentSelectedDate)?.label || ''; // Show month
    this.displayYear = this.currentSelectedDate.getFullYear();
  }

  getDisplayMonth(date: Date) {
    return this.months.find(x => {
      if (Array.isArray(x.value)) {
        return x.value.includes(date.getMonth());
      }
      return x.value === date.getMonth();
    });
  }


  toggleMonthPicker() {
    this.isMonthPickerOpen = !this.isMonthPickerOpen;
  }

  changeMonth(type: any) {
    let date: Date;
    const currenSelectedDate = this.currentSelectedDate;
    const mergedMonthsIndex = this.months.findIndex(month => Array.isArray(month.value));  // Handling next and prev button clicked before or after merged months
    const currentMonthInMergedMonths = this.months[mergedMonthsIndex]?.value.findIndex((month: number) => month === this.currentSelectedDate.getMonth() - 1); // Find current month in merged months
    const mergedMonthsValueLength = Array.isArray(this.months[mergedMonthsIndex]?.value) ? this.months[mergedMonthsIndex]?.value.length : 0; // Get the length of merged months if exists

    if (type == 'next') {
      date = new Date(
        currenSelectedDate.getFullYear(),
        currenSelectedDate.getMonth() + (this.months[mergedMonthsIndex]?.value.includes(currenSelectedDate.getMonth()) ? mergedMonthsValueLength - currentMonthInMergedMonths - 1 : 1),
        currenSelectedDate.getDate()
      );
    } else {
      date = new Date(
        currenSelectedDate.getFullYear(),
        currenSelectedDate.getMonth() - (this.months[mergedMonthsIndex]?.value.includes(currenSelectedDate.getMonth()) ? currentMonthInMergedMonths + 2 : 1),
        currenSelectedDate.getDate()
      );

    }
    this.displayMonth = this.getDisplayMonth(date)?.label || '';
    this.displayYear = date.getFullYear();
    this.currentSelectedDate = date;
    this.dateChange.emit(date);
  }

  // Year selection now shows single year, changed with forward-backward buttons
  changeYear(direction: 'prev' | 'next') {
    if (direction === 'next') {
      this.displayYear++;
    } else {
      this.displayYear--;
    }

    // Update date when year changes
    const date = new Date();
    date.setFullYear(this.displayYear);

    if (this.currentSelectedMonth) {
      if (Array.isArray(this.currentSelectedMonth.value)) {
        date.setMonth(this.currentSelectedMonth.value[0]);
      } else {
        date.setMonth(this.currentSelectedMonth.value);
      }
    }
  }

  selectMonth(month: any) {
    this.currentSelectedMonth = month;
    this.displayMonth = month.label;
    this.isMonthPickerOpen = false;

    // Date operations - use both month and year
    const date = new Date();
    date.setFullYear(this.displayYear);

    if (Array.isArray(month.value)) {
      // Take July for Jul-Aug
      date.setMonth(month.value[0]);
    } else {
      date.setMonth(month.value);
    }

    this.currentSelectedDate = date;

    // Send selected date to parent component
    this.dateChange.emit(date);
  }
}
