import { Address } from "./address";
import { ProductDTO } from "./product";

export class OrderDTO {
    orderId: string = "";
    productsDto: ProductDTO[] = new Array;
    status: Status | undefined;
    orderDate: Date = new Date();
    updateDate: string = "";
    address: Address = new Address();
    customer: string = "";
    updated: boolean = false;
    total?: number
}

export class OrderPatchDTO {
    orderId?: string;
    address?: Address;
    updated?: boolean;
    status?: Status;
}

export class OrderFilterDTO {
    status?: string;
    customer?: string;
    dateBy?: Date;
    dateTo?: Date;
  }


export enum Status {
    PRESO_IN_CARICO = "PRESO IN CARICO",
    IN_CONSEGNA = "IN CONSEGNA",
    CONSEGNATO = "CONSEGNATO",
    DESTINATARIO_NON_TROVATO = "DESTINATARIO NON TROVATO",
    DESTINAZIONE_SCONOSCIUTA = "DESTINAZIONE SCONOSCIUTA",
    RISPEDITO_AL_MITTENTE = "RISPEDITO AL MITTENTE"
}