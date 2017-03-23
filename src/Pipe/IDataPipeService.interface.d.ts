import { ITableState } from "./../TableState/ITableState.interface";
import { IConfiguration } from "./../Configuration/IConfiguration.interface";
export interface IDataPipeService {
    pipe(data: Array<any>, tableState: ITableState, configuration: IConfiguration): Promise<Array<any>>;
}
export interface IDataPipeFunction {
    (data: Array<any>, tableState: ITableState, configuration: IConfiguration): Promise<Array<any>>;
}
