const Tools = ({ setDiagramType }) => {
  return (
    <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
      <div className="offcanvas-md offcanvas-end bg-body-tertiary">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="sidebarMenuLabel">
            Company name
          </h5>
          <button type="button" className="btn-close"></button>
        </div>
        <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
          <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
            <span>SHAPES</span>
          </h6>
          <hr className="my-3" />
          <ul className="nav flex-column mb-auto">
            <li className="nav-item">
              <a
                className="nav-link d-flex align-items-center gap-2"
                href="#"
                onClick={() => setDiagramType("pencil")}
              >
                Pencil
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link d-flex align-items-center gap-2"
                href="#"
                onClick={() => setDiagramType("rectangle")}
              >
                Rectangle
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link d-flex align-items-center gap-2"
                href="#"
                onClick={() => setDiagramType("ellipse")}
              >
                Ellipse
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link d-flex align-items-center gap-2"
                href="#"
                onClick={() => setDiagramType("circle")}
              >
                Circle
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link d-flex align-items-center gap-2"
                href="#"
                onClick={() => setDiagramType("line")}
              >
                Line
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link d-flex align-items-center gap-2"
                href="#"
                onClick={() => setDiagramType("arrow-line")}
              >
                Arrow Line
              </a>
            </li>
          </ul>
        </div>
        <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
          <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
            <span>TOOLS</span>
          </h6>
          <hr className="my-3" />
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
  );
};
export default Tools;
