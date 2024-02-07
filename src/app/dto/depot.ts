import { Address } from "./address";

export class DepotDTO {
    depotId?: string;
    name?: string;
    address: Address = new Address;
}