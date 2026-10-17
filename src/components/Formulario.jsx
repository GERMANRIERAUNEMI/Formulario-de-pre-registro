import { useState } from "react";
import {
  CARRERAS,
  MODALIDADES,
  MAX_COMENTARIOS,
  hoyISO,
  validarCampo,
  validarFormulario,
  fuerzaPassword,
} from "../utils/validaciones.js";

const DATOS_INICIALES = {
  nombre: "",
  correo: "",
  password: "",
  confirmar: "",
  edad: "",
  telefono: "",
  carrera: "",
  fecha: "",
  modalidad: "",
  comentarios: "",
  terminos: false,
};

// Campos que dependen de otro: si cambia la clave, se revalidan los de la lista
const DEPENDENCIAS = {
  password: ["confirmar"],
  edad: ["fecha"],
  fecha: ["edad"],
};

const ORDEN_CAMPOS = Object.keys(DATOS_INICIALES);

const COLORES_FUERZA = ["bg-danger", "bg-danger", "bg-warning", "bg-info", "bg-success"];
const TEXTOS_FUERZA = ["", "Débil", "Regular", "Buena", "Fuerte"];

// Mensaje de error o de éxito debajo de cada campo
function Mensaje({ error, tocado, textoOk = "✔ Correcto" }) {
  if (!tocado) return null;
  return (
    <div className={`small mt-1 ${error ? "text-danger" : "text-success"}`}>
      {error || textoOk}
    </div>
  );
}

function Formulario() {
  const [datos, setDatos] = useState(DATOS_INICIALES);
  const [errores, setErrores] = useState({});
  const [tocados, setTocados] = useState({});
  const [verPassword, setVerPassword] = useState({ password: false, confirmar: false });
  const [alerta, setAlerta] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [registro, setRegistro] = useState(null);

  // Revalida un campo y sus dependientes que el usuario ya haya tocado
  const revalidar = (nombre, nuevosDatos, tocadosActuales) => {
    const cambios = {};
    if (tocadosActuales[nombre]) cambios[nombre] = validarCampo(nombre, nuevosDatos);
    (DEPENDENCIAS[nombre] || []).forEach((dep) => {
      if (tocadosActuales[dep]) cambios[dep] = validarCampo(dep, nuevosDatos);
    });
    setErrores((prev) => ({ ...prev, ...cambios }));
  };

  // Evento onChange: actualiza el estado del formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let valor = type === "checkbox" ? checked : value;

    // El teléfono solo acepta dígitos (máx. 10)
    if (name === "telefono") valor = valor.replace(/\D/g, "").slice(0, 10);

    const nuevosDatos = { ...datos, [name]: valor };
    setDatos(nuevosDatos);

    // Selects, radios, checkbox y fecha se validan apenas cambian
    const validarYa = ["checkbox", "radio", "select-one", "date"].includes(type);
    const nuevosTocados = validarYa ? { ...tocados, [name]: true } : tocados;
    if (validarYa) setTocados(nuevosTocados);

    revalidar(name, nuevosDatos, nuevosTocados);
    if (alerta?.tipo === "danger") setAlerta(null);
  };

  // Evento onBlur: valida el campo al salir de él
  const handleBlur = (e) => {
    const { name } = e.target;
    const nuevosTocados = { ...tocados, [name]: true };
    setTocados(nuevosTocados);
    setErrores((prev) => ({ ...prev, [name]: validarCampo(name, datos) }));
  };

  // Evento onSubmit: valida todo antes de enviar
  const handleSubmit = (e) => {
    e.preventDefault();
    const todosErrores = validarFormulario(datos);
    setErrores(todosErrores);
    setTocados(Object.fromEntries(ORDEN_CAMPOS.map((c) => [c, true])));

    const camposConError = ORDEN_CAMPOS.filter((c) => todosErrores[c]);

    if (camposConError.length > 0) {
      setRegistro(null);
      setAlerta({
        tipo: "danger",
        texto: `No se pudo enviar: hay ${camposConError.length} campo(s) con errores. Revisa los mensajes en rojo.`,
      });
      const primero = camposConError[0];
      const elemento =
        document.getElementById(primero) ||
        document.querySelector(`[name="${primero}"]`);
      elemento?.focus();
      return;
    }

    // Simulación de envío al servidor
    setEnviando(true);
    setAlerta(null);
    setTimeout(() => {
      const { password, confirmar, ...datosPublicos } = datos;
      datosPublicos.nombre = datosPublicos.nombre.trim().replace(/\s+/g, " ");
      datosPublicos.correo = datosPublicos.correo.trim().toLowerCase();
      console.log("Datos enviados:", datosPublicos);

      setRegistro(datosPublicos);
      setAlerta({
        tipo: "success",
        texto: `¡Pre-registro exitoso! Bienvenido/a, ${datosPublicos.nombre}.`,
      });
      limpiar(false);
      setEnviando(false);
    }, 1200);
  };

  const limpiar = (borrarAlerta = true) => {
    setDatos(DATOS_INICIALES);
    setErrores({});
    setTocados({});
    setVerPassword({ password: false, confirmar: false });
    if (borrarAlerta) {
      setAlerta(null);
      setRegistro(null);
    }
  };

  const clase = (campo) => {
    if (!tocados[campo]) return "";
    return errores[campo] ? "is-invalid" : "is-valid";
  };

  const fuerza = fuerzaPassword(datos.password);
  const carreraElegida = (valor) => CARRERAS.find((c) => c.valor === valor)?.nombre;
  const modalidadElegida = (valor) => MODALIDADES.find((m) => m.valor === valor)?.nombre;

  return (
    <section id="registro" className="py-5 bg-crema">
      <div className="container py-lg-3">
        <div className="text-center mb-4">
          <h2 className="fw-bold text-principal">Formulario de pre-registro</h2>
          <p className="text-secondary mb-0">
            Completa todos los campos obligatorios (<span className="text-danger">*</span>).
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-9">
            <div className="card border-0 shadow rounded-4">
              <div className="card-body p-4 p-md-5">
                <form onSubmit={handleSubmit} onReset={() => limpiar()} noValidate>
                  <div className="row g-3">
                    {/* Nombre */}
                    <div className="col-12 col-md-6">
                      <label htmlFor="nombre" className="form-label fw-semibold">
                        Nombre completo <span className="text-danger">*</span>
                      </label>
                      <input
                        id="nombre"
                        name="nombre"
                        type="text"
                        className={`form-control ${clase("nombre")}`}
                        placeholder="Ej: Juan Pérez"
                        maxLength={60}
                        autoComplete="name"
                        value={datos.nombre}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <Mensaje error={errores.nombre} tocado={tocados.nombre} />
                    </div>

                    {/* Correo */}
                    <div className="col-12 col-md-6">
                      <label htmlFor="correo" className="form-label fw-semibold">
                        Correo electrónico <span className="text-danger">*</span>
                      </label>
                      <input
                        id="correo"
                        name="correo"
                        type="email"
                        className={`form-control ${clase("correo")}`}
                        placeholder="usuario@unemi.edu.ec"
                        autoComplete="email"
                        value={datos.correo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <Mensaje error={errores.correo} tocado={tocados.correo} />
                    </div>

                    {/* Contraseña */}
                    <div className="col-12 col-md-6">
                      <label htmlFor="password" className="form-label fw-semibold">
                        Contraseña <span className="text-danger">*</span>
                      </label>
                      <div className="input-group has-validation">
                        <input
                          id="password"
                          name="password"
                          type={verPassword.password ? "text" : "password"}
                          className={`form-control ${clase("password")}`}
                          placeholder="Mínimo 8 caracteres"
                          autoComplete="new-password"
                          value={datos.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() =>
                            setVerPassword((p) => ({ ...p, password: !p.password }))
                          }
                          aria-label={verPassword.password ? "Ocultar contraseña" : "Mostrar contraseña"}
                        >
                          {verPassword.password ? "Ocultar" : "Ver"}
                        </button>
                      </div>
                      <div className="d-flex align-items-center gap-2 mt-2">
                        <div className="progress flex-grow-1" style={{ height: 6 }}>
                          <div
                            className={`progress-bar ${COLORES_FUERZA[fuerza]}`}
                            style={{ width: `${(fuerza / 4) * 100}%` }}
                          />
                        </div>
                        <small className="text-secondary" style={{ minWidth: 52 }}>
                          {datos.password && TEXTOS_FUERZA[fuerza]}
                        </small>
                      </div>
                      <Mensaje error={errores.password} tocado={tocados.password} />
                    </div>

                    {/* Confirmar */}
                    <div className="col-12 col-md-6">
                      <label htmlFor="confirmar" className="form-label fw-semibold">
                        Confirmar contraseña <span className="text-danger">*</span>
                      </label>
                      <div className="input-group has-validation">
                        <input
                          id="confirmar"
                          name="confirmar"
                          type={verPassword.confirmar ? "text" : "password"}
                          className={`form-control ${clase("confirmar")}`}
                          placeholder="Repite la contraseña"
                          autoComplete="new-password"
                          value={datos.confirmar}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() =>
                            setVerPassword((p) => ({ ...p, confirmar: !p.confirmar }))
                          }
                          aria-label={verPassword.confirmar ? "Ocultar contraseña" : "Mostrar contraseña"}
                        >
                          {verPassword.confirmar ? "Ocultar" : "Ver"}
                        </button>
                      </div>
                      <Mensaje error={errores.confirmar} tocado={tocados.confirmar} />
                    </div>

                    {/* Edad */}
                    <div className="col-12 col-md-6">
                      <label htmlFor="edad" className="form-label fw-semibold">
                        Edad <span className="text-danger">*</span>
                      </label>
                      <input
                        id="edad"
                        name="edad"
                        type="number"
                        min={16}
                        max={99}
                        step={1}
                        className={`form-control ${clase("edad")}`}
                        placeholder="Entre 16 y 99"
                        value={datos.edad}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <Mensaje error={errores.edad} tocado={tocados.edad} />
                    </div>

                    {/* Teléfono */}
                    <div className="col-12 col-md-6">
                      <label htmlFor="telefono" className="form-label fw-semibold">
                        Teléfono celular <span className="text-danger">*</span>
                      </label>
                      <input
                        id="telefono"
                        name="telefono"
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        className={`form-control ${clase("telefono")}`}
                        placeholder="0991234567"
                        autoComplete="tel"
                        value={datos.telefono}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <Mensaje error={errores.telefono} tocado={tocados.telefono} />
                    </div>

                    {/* Carrera */}
                    <div className="col-12 col-md-6">
                      <label htmlFor="carrera" className="form-label fw-semibold">
                        Carrera <span className="text-danger">*</span>
                      </label>
                      <select
                        id="carrera"
                        name="carrera"
                        className={`form-select ${clase("carrera")}`}
                        value={datos.carrera}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="">-- Selecciona una carrera --</option>
                        {CARRERAS.map((c) => (
                          <option key={c.valor} value={c.valor}>
                            {c.nombre}
                          </option>
                        ))}
                      </select>
                      <Mensaje error={errores.carrera} tocado={tocados.carrera} />
                    </div>

                    {/* Fecha de nacimiento */}
                    <div className="col-12 col-md-6">
                      <label htmlFor="fecha" className="form-label fw-semibold">
                        Fecha de nacimiento <span className="text-danger">*</span>
                      </label>
                      <input
                        id="fecha"
                        name="fecha"
                        type="date"
                        min="1927-01-01"
                        max={hoyISO()}
                        className={`form-control ${clase("fecha")}`}
                        value={datos.fecha}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <Mensaje error={errores.fecha} tocado={tocados.fecha} />
                    </div>

                    {/* Modalidad */}
                    <fieldset className="col-12">
                      <legend className="form-label fw-semibold fs-6 mb-2">
                        Modalidad de estudio <span className="text-danger">*</span>
                      </legend>
                      <div className="d-flex flex-wrap gap-3">
                        {MODALIDADES.map((m) => (
                          <div className="form-check" key={m.valor}>
                            <input
                              className={`form-check-input ${tocados.modalidad && errores.modalidad ? "is-invalid" : ""}`}
                              type="radio"
                              name="modalidad"
                              id={`modalidad-${m.valor}`}
                              value={m.valor}
                              checked={datos.modalidad === m.valor}
                              onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor={`modalidad-${m.valor}`}>
                              {m.nombre}
                            </label>
                          </div>
                        ))}
                      </div>
                      <Mensaje error={errores.modalidad} tocado={tocados.modalidad} textoOk="" />
                    </fieldset>

                    {/* Comentarios */}
                    <div className="col-12">
                      <label htmlFor="comentarios" className="form-label fw-semibold">
                        Comentarios (opcional)
                      </label>
                      <textarea
                        id="comentarios"
                        name="comentarios"
                        rows={3}
                        maxLength={MAX_COMENTARIOS}
                        className={`form-control ${tocados.comentarios && errores.comentarios ? "is-invalid" : ""}`}
                        placeholder="Escribe algo sobre ti..."
                        value={datos.comentarios}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <div className="d-flex justify-content-end">
                        <small
                          className={
                            datos.comentarios.length >= MAX_COMENTARIOS * 0.9
                              ? "text-warning-emphasis"
                              : "text-secondary"
                          }
                        >
                          {datos.comentarios.length}/{MAX_COMENTARIOS}
                        </small>
                      </div>
                    </div>

                    {/* Términos */}
                    <div className="col-12">
                      <div className="form-check">
                        <input
                          className={`form-check-input ${tocados.terminos && errores.terminos ? "is-invalid" : ""}`}
                          type="checkbox"
                          id="terminos"
                          name="terminos"
                          checked={datos.terminos}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="terminos">
                          Acepto los términos y condiciones <span className="text-danger">*</span>
                        </label>
                      </div>
                      <Mensaje error={errores.terminos} tocado={tocados.terminos} textoOk="" />
                    </div>

                    {/* Botones */}
                    <div className="col-12 d-flex flex-column flex-sm-row justify-content-end gap-2 pt-2">
                      <button type="reset" className="btn btn-outline-secondary px-4" disabled={enviando}>
                        Limpiar
                      </button>
                      <button type="submit" className="btn btn-acento px-4" disabled={enviando}>
                        {enviando ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />
                            Enviando...
                          </>
                        ) : (
                          "Registrar"
                        )}
                      </button>
                    </div>

                    {/* Mensaje dinámico de error o éxito */}
                    {alerta && (
                      <div className="col-12">
                        <div
                          className={`alert alert-${alerta.tipo} alert-dismissible fade show mb-0`}
                          role="alert"
                        >
                          {alerta.texto}
                          <button
                            type="button"
                            className="btn-close"
                            aria-label="Cerrar"
                            onClick={() => setAlerta(null)}
                          />
                        </div>
                      </div>
                    )}

                    {/* Resumen del registro enviado */}
                    {registro && alerta?.tipo === "success" && (
                      <div className="col-12">
                        <div className="border rounded-3 p-3 bg-white">
                          <h3 className="h6 fw-bold text-principal mb-3">Resumen de tu pre-registro</h3>
                          <dl className="row small mb-0">
                            <dt className="col-sm-4">Nombre</dt>
                            <dd className="col-sm-8">{registro.nombre}</dd>
                            <dt className="col-sm-4">Correo</dt>
                            <dd className="col-sm-8">{registro.correo}</dd>
                            <dt className="col-sm-4">Teléfono</dt>
                            <dd className="col-sm-8">{registro.telefono}</dd>
                            <dt className="col-sm-4">Carrera</dt>
                            <dd className="col-sm-8">{carreraElegida(registro.carrera)}</dd>
                            <dt className="col-sm-4">Modalidad</dt>
                            <dd className="col-sm-8 mb-0">{modalidadElegida(registro.modalidad)}</dd>
                          </dl>
                        </div>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Formulario;
