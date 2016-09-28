
import { ITableState } from "./../TableState/ITableState.interface";
import { IConfiguration } from "./../Configuration/IConfiguration.interface";

export interface IDataPipeService {

    pipe(data: Array<any>, tableState: ITableState, configuration: IConfiguration): Array<any>;

}