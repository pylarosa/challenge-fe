import { Coordinates } from "./coordinate";

export class Address {
    country: string = "";
    city: string = "";
    province: string = "";
    cap: string = "";
    street: string = "";
    additionalInfo: string = "";
    recipient: string = "";
    coordinates: Coordinates = new Coordinates();
}