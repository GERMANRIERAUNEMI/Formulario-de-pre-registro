function Footer() {
  const anio = new Date().getFullYear();

  return (
    <footer id="contacto" className="bg-principal text-white pt-5 pb-4">
      <div className="container text-center">
        <div className="fw-bold fs-4">UNEMI</div>
        <p className="small text-white-75 mb-2">
          Universidad Estatal de Milagro. Cdla. Universitaria "Dr. Rómulo Minchala M.", Km. 1,5 vía
          Milagro – Virgen de Fátima.
        </p>
        <p className="small text-white-75 mb-0">
          Sitio web:{" "}
          <a className="link-light" href="https://www.unemi.edu.ec" target="_blank" rel="noreferrer">
            www.unemi.edu.ec
          </a>
        </p>
        <hr className="border-secondary my-4" />
        <p className="small text-white-75 mb-0">
          © {anio} Universidad Estatal de Milagro. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
