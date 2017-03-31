## version 0.4.0

- Significant refactoring of ITableState. Includes simplifying base interface to only include change tracking.
- Fixes to Table directive that caused pipe to be called multiple times during initialization.

## version 0.3.0

- Added event binding `ptDataPipe` in order to support component handling server side pagination
- Renamed attribute `tableState` to `ptTableState`

## version 0.2.2

- [Bug fix](https://github.com/hoveytech/ng2-power-table/issues/4) for ptPagination and *ngIf

## version 0.2.1

Fix for ng2-power-table.min.js not included last changes.
Thanks to StdVectorBool!

## version 0.2.0

Implemented async pipe.
Thanks to StdVectorBool!

## version 0.1.11

Removed module.id usage from PaginationComponent

## version 0.1.10

Bug fixes for initializing tableState from consuming component.
https://github.com/hoveytech/ng2-power-table/issues/1

## version 0.1.0

Initial version

