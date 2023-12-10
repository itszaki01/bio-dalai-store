import { TWilayaName } from "./Wilaya.type";

export type TOrderREQ = {
    name: string;
    wilaya?: TWilayaName | string;
    adress: string;
    phone: string;
    realship?: number;
    quantity?: number;
    netprice?: number;
    price?: number;
    shipcost: number;
    shortname?: string;
    total?: number;
    date?: string;
    timecode?: string;
};
