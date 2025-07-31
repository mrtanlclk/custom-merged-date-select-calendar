
Import the library into a module:

```typescript
import { MergedMonthsCalendar } from 'merged-months-calendar';

...

@NgModule({
  declarations: [ ...  ],
  imports: [
    ...
    MergedMonthsCalendar
  ],
  ...
})
```

Use it in HTML files:
```typescript
<merged-months-calendar
  (dateChange)="onDateChange($event)" 
  [currentSelectedDate]="currentDate"
  [months]="months"
></merged-months-calendar>
```

Use it in Ts files:
```typescript
months = [
      { label: 'Jan', value: 0 },
      { label: 'Feb', value: 1 },
      { label: 'Mar', value: 2 },
      { label: 'Apr', value: 3 },
      { label: 'May', value: 4 },
      { label: 'June', value: 5 },
      { label: 'July-Aug', value: [6, 7] }, // Same value for July and August
      { label: 'Sep', value: 8 },
      { label: 'Oct', value: 9 },
      { label: 'Nov', value: 10 },
      { label: 'Dec', value: 11 },
    ];

  onDateChange(date: Date) {
    console.log(date) // Get The Selected Date
  }
```