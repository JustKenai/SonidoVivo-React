import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer-border p-5 bg-dark mt-auto">
      <ul className="list-unstyled m-0">
        <li className="mb-3">
          <p className="text-white mb-1">Encuéntranos aquí:</p>
          <a
            className="text-white text-decoration-none"
            href="https://maps.app.goo.gl/gZx5wtMMATmcMQdz8"
            target="_blank"
            rel="noopener noreferrer"
          >
            📍 2354 Álvarez Viña del Mar, Valparaíso
          </a>
        </li>

        <li className="mb-3">
          <Link className="text-white text-decoration-none" to="/contacto">
            📬 Contáctanos
          </Link>
        </li>

        <li>
          <p className="text-white m-0">
            &copy; Sonido vivo | Todos los derechos reservados
          </p>
        </li>
      </ul>
    </footer>
  )
}