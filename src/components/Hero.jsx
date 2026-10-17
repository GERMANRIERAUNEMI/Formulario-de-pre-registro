const cifras = [
  { valor: "5", etiqueta: "Carreras disponibles" },
  { valor: "3", etiqueta: "Modalidades de estudio" },
  { valor: "100%", etiqueta: "Registro en línea" },
];

function Hero() {
  return (
    <header id="inicio" className="hero text-white">
      <div className="container py-5">
        <div className="row align-items-center g-5 py-lg-4">
          <div className="col-lg-7">
            <span className="badge rounded-pill bg-acento mb-3 px-3 py-2">
              Inscripciones abiertas
            </span>
            <h1 className="display-5 fw-bold mb-3">
              Tu futuro profesional <span className="text-acento">comienza aquí</span>
            </h1>
            <p className="lead mb-4 text-white-75">
              Realiza tu pre-registro en la Universidad Estatal de Milagro, elige tu carrera y la
              modalidad que mejor se adapte a ti. Todo el proceso es en línea y toma menos de 5 minutos.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3">
              <a href="#registro" className="btn btn-acento btn-lg px-4">
                Empezar pre-registro
              </a>
              <a href="#carreras" className="btn btn-outline-light btn-lg px-4">
                Ver carreras
              </a>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="row g-3">
              {cifras.map((c) => (
                <div className="col-4 col-lg-12" key={c.etiqueta}>
                  <div className="cifra py-2">
                    <div className="fs-2 fw-bold text-acento">{c.valor}</div>
                    <div className="small">{c.etiqueta}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Hero;
