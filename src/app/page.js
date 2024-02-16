// import Svgboard from './components/svgboard/svgboard';
import Svgboard from "./components/whiteboard/whiteboard";

export default function Home() {
  return (
    <>
      <header className="navbar sticky-top bg-dark flex-md-nowrap p-3 shadow rounded">
        <a
          className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white"
        >
          SVG - MS Paint - Art Work
        </a>

        <ul className="navbar-nav flex-row d-md-none">
          <li className="nav-item text-nowrap">
            <button className="nav-link px-3 text-white" type="button"></button>
          </li>
          <li className="nav-item text-nowrap">
            <button className="nav-link px-3 text-white" type="button"></button>
          </li>
        </ul>
      </header>
      <div className="container-fluid">
  <div className="row">
    <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
      <div className="offcanvas-md offcanvas-end bg-body-tertiary">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="sidebarMenuLabel">Company name</h5>
          <button type="button" className="btn-close"></button>
        </div>
        <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
          <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
            <span>SHAPES</span>
          </h6>
          <hr className="my-3"/>
          <ul className="nav flex-column mb-auto">
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="#">
                Pencil
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="#">
                Rectangle
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="#">
                Ellipse
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="#">
                Circle
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="#">
                Line
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="#">
                Arrow Line
              </a>
            </li>
          </ul>
        </div>
        <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
          <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
            <span>TOOLS</span>
          </h6>
          <hr className="my-3"/>
          <ul className="nav flex-column mb-auto">
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="#">
                Color
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="#">
                Stroke
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Dashboard</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <button type="button" className="btn btn-sm btn-outline-secondary">Clear Board</button>
            <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
          </div>
        </div>
      </div>

      <div className="container">
        <Svgboard/>
      </div>
    </main>
  </div>
</div>
    </>
  );
}
