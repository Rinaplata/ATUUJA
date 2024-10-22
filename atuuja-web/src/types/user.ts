export type User = {
  Id:string,
  Email: string;
  Username: string;
  Password: string | null;
  IsAdmin: boolean;
  Edad: string;
  Cuidad: string;
  TipoDocumento: TipoDocumento;
  NumeroDocumento: string;
};


export enum TipoDocumento {
  Cedula = 0,
  Pasaporte = 1 
}