import { TableDirective } from './../Table/Table.directive';
export declare class PaginationComponent {
    table: TableDirective;
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
    ngOnInit(): void;
    ngOnDestroy(): void;
    private unsubscribeToPagination();
    private rebuildPagination();
    goToFirstPage(): void;
    goToPreviousPage(): void;
    goToNextPage(): void;
    goToLastPage(): void;
    selectPage(page: number): void;
    private triggerPaging(start);
    private getPaginationState();
    private onTableStateChanged(tableState);
}
