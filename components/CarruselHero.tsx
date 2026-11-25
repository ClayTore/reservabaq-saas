"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const fotos = [
  { src: "/img/hero-costena.jpg", tipo: "Costeña", alt: "Plato de mariscos y pescado frito" },
  { src: "/img/hero-japonesa.jpg", tipo: "Japonesa", alt: "Sushi y ramen servidos en la mesa" },
  { src: "/img/hero-parrilla.jpg", tipo: "Parrilla", alt: "Corte de carne a la parrilla" },
  { src: "/img/hero-italiana.jpg", tipo: "Italiana", alt: "Plato de pasta italiana" },
  { src: "/img/hero-vegetariana.jpg", tipo: "Vegetariana", alt: "Bowl vegetariano saludable" },
];

const SEGUNDOS = 4;

export default function CarruselHero() {
  const [actual, setActual] = useState(0);
  const [pausado, setPausado] = useState(false);

  useEffect(() => {
    if (pausado) return;
    const intervalo = window.setInterval(() => {
      setActual((i) => (i + 1) % fotos.length);
    }, SEGUNDOS * 1000);
    return () => window.clearInterval(intervalo);
  }, [pausado]);

  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] shadow-lg"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      aria-roledescription="carrusel"
      aria-label="Tipos de comida"
    >
      <div
        className="flex h-full transition-transform duration-700 ease-in-out motion-reduce:transition-none"
        style={{ transform: `translateX(-${actual * 100}%)` }}
      >
        {fotos.map((foto, i) => (
          <div key={foto.src} className="relative h-full w-full shrink-0" aria-hidden={i !== actual}>
            <Image
              src={foto.src}
              alt={foto.alt}
              fill
              priority={i === 0}
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      <span className="absolute bottom-5 left-5 rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-zinc-900">
        {fotos[actual].tipo}
      </span>

      <div className="absolute bottom-6 right-5 flex gap-2">
        {fotos.map((foto, i) => (
          <button
            key={foto.src}
            type="button"
            onClick={() => setActual(i)}
            aria-label={`Ver foto ${i + 1}: ${foto.tipo}`}
            aria-current={i === actual}
            className={`h-2 rounded-full transition-all ${
              i === actual ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}