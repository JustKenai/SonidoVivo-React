import Navbar from '../componentes/Navbar.jsx'
import Footer from '../componentes/Footer.jsx'
import '../componentes/Estilos.css'

function Inicio() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="container-fluid px-5 flex-grow-1">
        <br />
        <br />
        <section className="hero-section p-5 mb-5">
          <div className="row align-items-center h-100">
            <div className="col-md-6 pe-md-5 mb-4 mb-md-0">
              <h1 className="display-5 text-uppercase mb-4 text-dark">Quienes somos</h1>
              <p className="mb-5 text-dark" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                Sonido Vivo es una tienda especializada en instrumentos musicales, equipos de sonido y
                accesorios para músicos, ubicada en Viña del Mar, Región de Valparaíso. Tiene 11 años de funcionamiento
                y es atendida por el dueño y dos vendedores.
              </p>
              <p className="mb-5 text-dark" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                El catálogo incluye guitarras, bajos, baterías, teclados, amplificadores, micrófonos,
                pedales de efectos y accesorios. También ofrece reparación de instrumentos de cuerda. El catálogo
                actual tiene 340 referencias distintas.
              </p>
            </div>
            <div className="col-md-6 h-100">
              <img
                src="https://images.unsplash.com/photo-1556379118-7034d926d258?auto=format&fit=crop&w=800&q=80"
                className="img-fluid w-100 h-100 object-fit-cover border border-secondary"
                style={{ minHeight: '350px' }}
                alt="Banner de tienda"
              />
            </div>
          </div>
        </section>

        <section className="bg-light py-5">
          <div className="container">
            <h2 className="text-center mb-4">
              Productos destacados 🔥
            </h2>

            <section className="mb-5">
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                <div className="col">
                  <div className="card product-card p-3 h-100 rounded-0">
                    <img
                      src="https://cdnx.jumpseller.com/audiomarket-pro/image/66514656/resize/2157/2157?1755227257"
                      className="product-img w-100 mb-3"
                      alt="Guitarra Acústica Folk"
                    />
                    <div className="card-body p-0 d-flex flex-column">
                      <h6 className="card-title text-custom-blue text-center mb-4">Guitarra Acústica Folk</h6>
                      <div className="d-flex justify-content-between align-items-end mt-auto">
                        <small className="text-dark">Guitarras Acústicas</small>
                        <span className="fw-bold text-dark">$15.000</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col">
                  <div className="card product-card p-3 h-100 rounded-0">
                    <img
                      src="https://cdnx.jumpseller.com/musicchile/image/57535582/da4f7c82-8574-495f-a90b-2df420b2b6d2-open-uri20220519-17493-1urol6t.jpeg?1758909550"
                      className="product-img w-100 mb-3"
                      alt="Guitarra Eléctrica Stratocaster"
                    />
                    <div className="card-body p-0 d-flex flex-column">
                      <h6 className="card-title text-custom-blue text-center mb-4">Guitarra Eléctrica Stratocaster</h6>
                      <div className="d-flex justify-content-between align-items-end mt-auto">
                        <small className="text-dark">Guitarras Eléctricas</small>
                        <span className="fw-bold text-dark">$249.990</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col">
                  <div className="card product-card p-3 h-100 rounded-0">
                    <img
                      src="https://cdnx.jumpseller.com/musicchile/image/70379728/thumb/960/540?1764865562"
                      className="product-img w-100 mb-3"
                      alt="Sintetizador 49 teclas"
                    />
                    <div className="card-body p-0 d-flex flex-column">
                      <h6 className="card-title text-custom-blue text-center mb-4">Sintetizador 49 teclas</h6>
                      <div className="d-flex justify-content-between align-items-end mt-auto">
                        <small className="text-dark">Teclados y Pianos</small>
                        <span className="fw-bold text-dark">$129.990</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col">
                  <div className="card product-card p-3 h-100 rounded-0">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu58qPvP8iiKb1t2xPnX9wQo6tOMCohIfxWmKrhqnnSOCUqRr0lDS9DUo&s=10"
                      className="product-img w-100 mb-3"
                      alt="Batería Acústica 5 piezas"
                    />
                    <div className="card-body p-0 d-flex flex-column">
                      <h6 className="card-title text-custom-blue text-center mb-4">Batería Acústica 5 piezas</h6>
                      <div className="d-flex justify-content-between align-items-end mt-auto">
                        <small className="text-dark">Baterías</small>
                        <span className="fw-bold text-dark">$599.990</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col">
                  <div className="card product-card p-3 h-100 rounded-0">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0Xsa_Jn0f2q2AEdeVaepkOA72r_fyrQ2AGMN-kfhGQUD844p_pRXairTT&s=10"
                      className="product-img w-100 mb-3"
                      alt="Pedal Distorsión"
                    />
                    <div className="card-body p-0 d-flex flex-column">
                      <h6 className="card-title text-custom-blue text-center mb-4">Pedal Distorsión</h6>
                      <div className="d-flex justify-content-between align-items-end mt-auto">
                        <small className="text-dark">Pedales de Efectos</small>
                        <span className="fw-bold text-dark">$79.990</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col">
                  <div className="card product-card p-3 h-100 rounded-0">
                    <img
                      src="https://armonicos.cl/9964-thickbox_default/pedalera-multiefectos-boss-me-90.jpg"
                      className="product-img w-100 mb-3"
                      alt="Pedal Multi-efectos"
                    />
                    <div className="card-body p-0 d-flex flex-column">
                      <h6 className="card-title text-custom-blue text-center mb-4">Pedal Multi-efectos</h6>
                      <div className="d-flex justify-content-between align-items-end mt-auto">
                        <small className="text-dark">Pedales de Efectos</small>
                        <span className="fw-bold text-dark">$349.990</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col">
                  <div className="card product-card p-3 h-100 rounded-0">
                    <img
                      src="https://http2.mlstatic.com/D_NQ_NP_957057-MLA111421917642_052026-O.webp"
                      className="product-img w-100 mb-3"
                      alt="Púas de Guitarra x10 (0.73mm)"
                    />
                    <div className="card-body p-0 d-flex flex-column">
                      <h6 className="card-title text-custom-blue text-center mb-4">Púas de Guitarra x10 (0.73mm)</h6>
                      <div className="d-flex justify-content-between align-items-end mt-auto">
                        <small className="text-dark">Accesorios</small>
                        <span className="fw-bold text-dark">$3.990</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col">
                  <div className="card product-card p-3 h-100 rounded-0">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGAr60otLfadi42IJVjA8d-hTrjTOyhb6HOGFHdXghillXLC_kgJ4IQW0&s=10"
                      className="product-img w-100 mb-3"
                      alt="Auriculares de Estudio Pro"
                    />
                    <div className="card-body p-0 d-flex flex-column">
                      <h6 className="card-title text-custom-blue text-center mb-4">Auriculares de Estudio Pro</h6>
                      <div className="d-flex justify-content-between align-items-end mt-auto">
                        <small className="text-dark">Estudio y Grabación</small>
                        <span className="fw-bold text-dark">$219.990</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Inicio