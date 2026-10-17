import { CARRERAS } from "../utils/validaciones.js";

const beneficios = [
  {
    titulo: "Modalidad presencial",
    texto: "Clases en el campus con laboratorios equipados y acompañamiento docente directo.",
  },
  {
    titulo: "Modalidad en línea",
    texto: "Estudia desde cualquier lugar con aulas virtuales y tutorías programadas.",
  },
  {
    titulo: "Modalidad híbrida",
    texto: "Combina sesiones presenciales y virtuales para organizar mejor tu tiempo.",
  },
  {
    titulo: "Becas y ayudas",
    texto: "Accede a becas por méritos académicos y programas de apoyo estudiantil.",
  },
];

// Tarjeta reutilizable: recibe la información por props
function TarjetaCarrera({ nombre, descripcion }) {
  return (
    <div className="card h-100 border-0 shadow-sm tarjeta-hover">
      <div className="card-body">
        <h3 className="h6 fw-bold text-principal mb-2">{nombre}</h3>
        <p className="card-text small text-secondary mb-3">{descripcion}</p>
        <a href="#registro" className="link-acento small fw-semibold">
          Postular →
        </a>
      </div>
    </div>
  );
}

function Servicios() {
  return (
    <>
      <section id="carreras" className="py-5 bg-crema">
        <div className="container py-lg-3">
          <div className="text-center mb-5">
            <h2 className="fw-bold text-principal">Carreras disponibles</h2>
            <p className="text-secondary mb-0">Elige el programa que se ajusta a tus metas.</p>
          </div>
          <div className="row g-4">
            {CARRERAS.map((c) => (
              <div className="col-12 col-sm-6 col-lg-4" key={c.valor}>
                <TarjetaCarrera nombre={c.nombre} descripcion={c.descripcion} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="beneficios" className="py-5">
        <div className="container py-lg-3">
          <div className="text-center mb-5">
            <h2 className="fw-bold text-principal">¿Por qué estudiar en UNEMI?</h2>
            <p className="text-secondary mb-0">Opciones flexibles para cada estudiante.</p>
          </div>
          <div className="row g-4">
            {beneficios.map((b, i) => (
              <div className="col-12 col-md-6 col-lg-3" key={b.titulo}>
                <div className="p-4 h-100 border beneficio">
                  <div className="beneficio-num mb-2">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="h6 fw-bold">{b.titulo}</h3>
                  <p className="small text-secondary mb-0">{b.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Servicios;
