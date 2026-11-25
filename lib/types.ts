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
  diasAbierto: number[]; // 0 = domingo ... 6 = sábado
  apertura: string; // "HH:MM" en formato 24 h
  cierre: string;
  capacidadMaxima: number; // personas por reserva
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