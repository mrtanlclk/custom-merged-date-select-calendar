
Import the library into a module:

```typescript
import { CustomMergedDateSelectLib } from 'custom-merged-date-select-lib';

...

@NgModule({
  declarations: [ ...  ],
  imports: [
    ...
    CustomMergedDateSelectLib
  ],
  ...
})
```

Use it in HTML files:
```typescript
<custom-merged-date-select-lib 
  (dateChange)="onDateChange($event)" 
  [currentSelectedDate]="currentDate"
  [months]="months"
  ></custom-merged-date-select-lib>
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