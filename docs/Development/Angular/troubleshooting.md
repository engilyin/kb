# Angular Troubleshooting

## Cleanup
Could be useful if something stuck with libs cache.

```
npm cache clean --force
```

## Localize

New version of Angular 13 changed the Localize usage.
If you have some problems like the error about localize make sure your `polifill.ts` has this line:
```
import '@angular/localize/init';
```