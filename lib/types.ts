export type PlatoMenu = {
  nombre: string;
  descripcion: string;
  precio: number;
};

export type Restaurante = {
  id: number;
  nombre: string;
  tipoComida: string;
  zona: string;
  rangoPrecio: "$" | "$$" | "$$$";
  descripcion: string;
  direccion: string;
  horario: string;
  vestimenta: string;
  whatsapp: string;
  menu: PlatoMenu[];
};