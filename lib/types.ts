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
  diasAbierto: number[];
  apertura: string;
  cierre: string;
  capacidadMaxima: number;
  vestimenta: string;
  whatsapp: string;
  menu: PlatoMenu[];
};

export type Reserva = {
  id: number;
  restauranteId: number;
  restauranteNombre: string;
  nombre: string;
  telefono: string;
  fecha: string;
  hora: string;
  personas: number;
  creadaEn: string;
};