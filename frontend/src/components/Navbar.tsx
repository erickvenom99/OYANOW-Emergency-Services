function Navbar() {
  const items = [
    "Electrical",
    "Mechanical",
    "Plumbering",
    "Fireservice",
    "Services",
  ];
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg"
              alt="Bootstrap"
              width="30"
              height="24"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {items.map((item) => (
                <li className="nav-item" key={item}>
                  <a className="nav-link active" aria-current="page" href="#">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            <div className="d-flex">
              <a href="#" className="btn btn-outline-light me-2">
                Sign-in
              </a>
              <a href="#" className="btn btn-light">
                Sign-up
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
