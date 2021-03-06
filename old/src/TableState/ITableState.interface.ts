import { EventEmitter } from "@angular/core";

/**
 * Base interface to contain objects
 * and properties to track table state.
 */
export interface ITableState {
    /** If any properties are changed this eventEmitter should be triggered.
     * The ptTable directive will subscribe to this event and it emitted
     * it will refresh the table results.
     */
    changed: EventEmitter<void>;

    updateWithoutEmitting(action: () => void): void;
}