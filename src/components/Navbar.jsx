const enlaces = [
  { href: "#inicio", texto: "Inicio" },
  { href: "#carreras", texto: "Carreras" },
  { href: "#beneficios", texto: "Beneficios" },
  { href: "#contacto", texto: "Contacto" },
];

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-principal sticky-top shadow-sm">
      <div className="container">
        <a className="navbar-brand d-flex flex-column lh-1" href="#inicio">
          <span className="fw-bold fs-4 letter-spacing">UNEMI</span>
          <small className="marca-sub">Admisiones 2027</small>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menuPrincipal"
          aria-controls="menuPrincipal"
          aria-expanded="false"
          aria-label="Abrir menú"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="menuPrincipal">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            {enlaces.map((enlace) => (
              <li className="nav-item" key={enlace.href}>
                <a className="nav-link" href={enlace.href}>
                  {enlace.texto}
                </a>
              </li>
            ))}
            <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
              <a className="btn btn-acento btn-sm px-3" href="#registro">
                Pre-regístrate
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
