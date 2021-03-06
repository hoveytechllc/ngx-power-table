import { ITableState } from './ITableState.interface';
import { ISortState } from './../Sort/ISortState.interface';
import { IPaginationState } from './../Pagination/IPaginationState.interface';


export interface IDefaultTableStatePagination {
    pagination: IPaginationState;
}

export interface IDefaultTableStateSort {
    sort: ISortState;
}

/** 
 * This represents out-of-the-box implementation
 * of ITableState which includes simple sorting and pagination
 * properties
 */
export interface IDefaultTableState extends ITableState, 
                                            IDefaultTableStatePagination, 
                                            IDefaultTableStateSort {

}
