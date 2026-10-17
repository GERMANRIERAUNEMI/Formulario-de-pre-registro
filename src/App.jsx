import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Servicios from "./components/Servicios.jsx";
import Formulario from "./components/Formulario.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Servicios />
        <Formulario />
      </main>
      <Footer />
    </>
  );
}

export default App;
