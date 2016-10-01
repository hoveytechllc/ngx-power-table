import { ITableState } from './../../src/TableState/ITableState.interface';
import { IConfiguration } from './../../src/Configuration/IConfiguration.interface';
import { IDataPipeService } from './../../src/Pipe/IDataPipeService.interface';
export declare class TestDataPipeService implements IDataPipeService {
    pipe(array: Array<any>, state: ITableState, config: IConfiguration): {
        name: string;
    }[];
}
