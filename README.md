# Landing Page de Admisiones UNEMI — React + Bootstrap

Proyecto académico de la asignatura **Desarrollo Web** (Práctica N.º 2), Carrera de Ingeniería de Software, Universidad Estatal de Milagro (UNEMI).

## Descripción

Landing Page de pre-registro de estudiantes desarrollada con **React** y **Bootstrap**. La interfaz está organizada en componentes funcionales e integra el formulario de registro desarrollado en la Guía Práctica N.º 1, ahora migrado a React y gestionado con `useState`, eventos y validaciones en tiempo real.

## Tecnologías utilizadas

- **React 18**: componentes funcionales, JSX, hook `useState` y manejo de eventos.
- **Bootstrap 5**: sistema de grillas, navbar colapsable, tarjetas, formularios, alertas y utilidades responsivas.
- **Vite**: entorno de desarrollo y empaquetado.
- **JavaScript (ES6+)** y **CSS3** para estilos complementarios.

## Estructura del proyecto

```text
src/
├── main.jsx                 # Punto de entrada; importa Bootstrap
├── App.jsx                  # Componente raíz
├── index.css                # Estilos propios
├── components/
│   ├── Navbar.jsx           # Barra de navegación responsiva
│   ├── Hero.jsx             # Sección principal
│   ├── Servicios.jsx        # Carreras y beneficios (tarjetas con props)
│   ├── Formulario.jsx       # Formulario de pre-registro con estados
│   └── Footer.jsx           # Pie de página
└── utils/
    └── validaciones.js      # Reglas de validación del formulario
```

## Funcionalidades implementadas

**Landing Page**
- Navbar fijo con menú hamburguesa en móviles y navegación por secciones.
- Sección Hero con llamado a la acción.
- Sección de carreras y beneficios generada dinámicamente con `map()` y props.
- Diseño responsivo para escritorio, tablet y móvil.

**Formulario (estados y eventos)**
- Datos del formulario, errores, campos tocados, alertas y envío gestionados con `useState`.
- Eventos `onChange`, `onBlur`, `onSubmit`, `onReset` y `onClick`.
- Mensajes dinámicos de error y de éxito por campo y alerta general.
- Mostrar u ocultar contraseña, barra de fuerza de contraseña y contador de caracteres.
- Simulación de envío con indicador de carga y resumen del registro.

**Validaciones (Guía 1 mantenidas y mejoradas)**

| Campo | Validación |
| --- | --- |
| Nombre | Solo letras y espacios, 3 a 60 caracteres, **nombre y apellido obligatorios** |
| Correo | Formato `usuario@dominio.com`, **sin puntos consecutivos** |
| Contraseña | Mínimo 8 caracteres, mayúscula, **minúscula**, número y **sin espacios** |
| Confirmación | Debe coincidir con la contraseña (se revalida al cambiarla) |
| Edad | Entero entre 16 y 99 |
| Teléfono | 10 dígitos, inicia con 09; solo permite escribir números |
| Carrera y modalidad | Selección obligatoria |
| Fecha de nacimiento | No futura, **edad mínima de 16 años** y coherente con la edad ingresada |
| Comentarios | Opcional, máximo 200 caracteres |
| Términos | Aceptación obligatoria |

Al enviar con errores se bloquea el envío, se cuenta el número de campos inválidos y el cursor se coloca en el primer campo con error.

## Ejecución

Requisitos: Node.js 18 o superior.

```bash
git clone <URL-DEL-REPOSITORIO>
cd landing-admisiones-unemi
npm install
npm run dev
```

Abrir en el navegador la dirección que muestra la terminal (por defecto `http://localhost:5173`).

Para generar la versión de producción:

```bash
npm run build
```

## Autores

- Anthony Steven Pataron Naula
- German Steven Riera Rebolledo
- Héctor Guillermo Tenelema Iza
- Jordy Rodrigo Vergara Morales

**Docente:** Ing. Mariana Madeleine Almache Sanisaca
**Periodo:** agosto 2026 – diciembre 2026
