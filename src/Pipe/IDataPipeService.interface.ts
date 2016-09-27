
import { ITableState } from "./../TableState/ITableState.interface";
import { IConfiguration } from "./../Configuration/IConfiguration.interface";
import { SortOrder } from "./../Sort/SortOrder.enum";

export interface IDataPipeService {

    pipe(data: Array<any>, tableState: ITableState, configuration: IConfiguration): Array<any>;

}