import { EventEmitter } from "@angular/core";

export interface IConfiguration {
     changed: EventEmitter<void>;

     ascendingCssClass : string;
     descendingCssClass: string;
     pipeServiceType : any;
     tableStateType: any;
}