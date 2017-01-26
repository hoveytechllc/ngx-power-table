import { IDataPipeService } from "./IDataPipeService.interface";
import { ITableState } from "./../TableState/ITableState.interface";
import { IConfiguration } from "./../Configuration/IConfiguration.interface";
export declare class DefaultDataPipeService<TTableState extends ITableState, TConfiguration extends IConfiguration> implements IDataPipeService {
    pipe(data: Array<any>, tableState: TTableState, configuration: TConfiguration): Promise<Array<any>>;
    sort(data: Array<any>, tableState: TTableState, configuration: TConfiguration): Array<any>;
    filter(data: Array<any>, tableState: TTableState, configuration: TConfiguration): Array<any>;
    page(data: Array<any>, tableState: TTableState, configuration: TConfiguration): Array<any>;
}
