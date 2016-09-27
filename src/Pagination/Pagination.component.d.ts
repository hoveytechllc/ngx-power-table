import { TableDirective } from './../Table/Table.directive';
export declare class PaginationComponent {
    private table;
    private removeTableStateListener;
    private removePaginationListener;
    currentPage: number;
    pages: Array<number>;
    numPages: number;
    displayedPagesCount: number;
    /**
     *
     */
    constructor(table: TableDirective);
    ngOnDestroy(): void;
    private unsubscribeToPagination();
    private rebuildPagination();
    selectPage(page: number): void;
    private triggerPaging(start);
    private onTableStateChanged(tableState);
}
