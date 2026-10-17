// Validaciones del formulario de registro (migradas de la Guía 1 y mejoradas).
// Cada validador recibe el valor del campo y el objeto completo de datos,
// y devuelve un mensaje de error ("" si el campo es válido).

export const CARRERAS = [
  {
    valor: "software",
    nombre: "Ingeniería de Software",
    descripcion: "Diseña, desarrolla y gestiona soluciones de software de calidad.",
  },
  {
    valor: "ti",
    nombre: "Tecnologías de la Información",
    descripcion: "Administra infraestructura, redes y servicios tecnológicos.",
  },
  {
    valor: "industrial",
    nombre: "Ingeniería Industrial",
    descripcion: "Optimiza procesos productivos y la gestión de operaciones.",
  },
  {
    valor: "administracion",
    nombre: "Administración de Empresas",
    descripcion: "Lidera organizaciones con visión estratégica y financiera.",
  },
  {
    valor: "educacion",
    nombre: "Educación",
    descripcion: "Fórmate como docente con herramientas pedagógicas actuales.",
  },
];

export const MODALIDADES = [
  { valor: "presencial", nombre: "Presencial" },
  { valor: "en-linea", nombre: "En línea" },
  { valor: "hibrida", nombre: "Híbrida" },
];

export const MAX_COMENTARIOS = 200;
const FECHA_MINIMA = "1927-01-01";

const regex = {
  nombre: /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/,
  correo: /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/,
  telefono: /^09\d{8}$/,
};

export function hoyISO() {
  const hoy = new Date();
  const m = String(hoy.getMonth() + 1).padStart(2, "0");
  const d = String(hoy.getDate()).padStart(2, "0");
  return `${hoy.getFullYear()}-${m}-${d}`;
}

export function calcularEdad(fechaISO) {
  const nacimiento = new Date(fechaISO + "T00:00:00");
  const hoy = new Date();
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const m = hoy.getMonth() - nacimiento.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) edad--;
  return edad;
}

export const validadores = {
  nombre(v) {
    const limpio = v.trim().replace(/\s+/g, " ");
    if (!limpio) return "El nombre es obligatorio.";
    if (limpio.length < 3) return "Debe tener al menos 3 caracteres.";
    if (!regex.nombre.test(limpio)) return "Solo se permiten letras y espacios.";
    // Mejora: se exige nombre y apellido
    if (limpio.split(" ").length < 2) return "Ingresa tu nombre y apellido.";
    if (limpio.length > 60) return "Máximo 60 caracteres.";
    return "";
  },

  correo(v) {
    const limpio = v.trim();
    if (!limpio) return "El correo es obligatorio.";
    if (!regex.correo.test(limpio)) return "Formato inválido (ej: usuario@dominio.com).";
    // Mejora: evita errores comunes de escritura
    if (limpio.includes("..")) return "El correo no puede tener dos puntos seguidos.";
    return "";
  },

  password(v) {
    if (!v) return "La contraseña es obligatoria.";
    if (/\s/.test(v)) return "La contraseña no puede contener espacios.";
    if (v.length < 8) return `Mínimo 8 caracteres (llevas ${v.length}).`;
    if (!/[A-Z]/.test(v)) return "Debe incluir al menos una letra mayúscula.";
    // Mejora: también se exige una minúscula
    if (!/[a-z]/.test(v)) return "Debe incluir al menos una letra minúscula.";
    if (!/[0-9]/.test(v)) return "Debe incluir al menos un número.";
    return "";
  },

  confirmar(v, datos) {
    if (!v) return "Confirma tu contraseña.";
    if (v !== datos.password) return "Las contraseñas no coinciden.";
    return "";
  },

  edad(v) {
    if (v === "") return "La edad es obligatoria.";
    const n = Number(v);
    if (!Number.isInteger(n)) return "La edad debe ser un número entero.";
    if (n < 16 || n > 99) return "La edad debe estar entre 16 y 99 años.";
    return "";
  },

  telefono(v) {
    if (!v) return "El teléfono es obligatorio.";
    if (!/^\d+$/.test(v)) return "Solo se permiten números.";
    if (!regex.telefono.test(v)) return "Debe tener 10 dígitos y empezar con 09.";
    return "";
  },

  carrera(v) {
    return v ? "" : "Selecciona una carrera.";
  },

  fecha(v, datos) {
    if (!v) return "La fecha de nacimiento es obligatoria.";
    if (v < FECHA_MINIMA) return "Ingresa una fecha válida.";
    if (v > hoyISO()) return "La fecha no puede ser futura.";
    const edadCalculada = calcularEdad(v);
    // Mejora: la fecha por sí sola debe cumplir la edad mínima
    if (edadCalculada < 16) return "Debes tener al menos 16 años.";
    if (datos.edad !== "" && edadCalculada !== Number(datos.edad)) {
      return `No coincide con la edad ingresada (según la fecha tendrías ${edadCalculada}).`;
    }
    return "";
  },

  modalidad(v) {
    return v ? "" : "Selecciona una modalidad.";
  },

  comentarios(v) {
    // Campo opcional; mejora: se controla el límite también desde la lógica
    if (v.length > MAX_COMENTARIOS) return `Máximo ${MAX_COMENTARIOS} caracteres.`;
    return "";
  },

  terminos(v) {
    return v ? "" : "Debes aceptar los términos y condiciones.";
  },
};

export function validarCampo(nombre, datos) {
  const validador = validadores[nombre];
  return validador ? validador(datos[nombre], datos) : "";
}

export function validarFormulario(datos) {
  const errores = {};
  Object.keys(validadores).forEach((campo) => {
    errores[campo] = validarCampo(campo, datos);
  });
  return errores;
}

// Devuelve un puntaje de 0 a 4 para la barra de fuerza de la contraseña
export function fuerzaPassword(v) {
  let puntos = 0;
  if (v.length >= 8) puntos++;
  if (/[A-Z]/.test(v) && /[a-z]/.test(v)) puntos++;
  if (/[0-9]/.test(v)) puntos++;
  if (/[^A-Za-z0-9]/.test(v)) puntos++;
  return puntos;
}
