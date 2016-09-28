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
    selectPage(page: number): void;
    private triggerPaging(start);
    private onTableStateChanged(tableState);
}
