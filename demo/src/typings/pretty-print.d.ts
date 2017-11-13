

declare namespace prettyPrint{

    export interface IPrettyPrint{
        (value: any, element: any) : void;
    }

}

declare var prettyPrint :  prettyPrint.IPrettyPrint; 
