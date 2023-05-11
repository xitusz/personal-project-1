import React from "react";

const Footer = () => {
  return (
    <div className="mt-3 bg-light">
      <div className="mx-5">
        <div className="w-full mx-auto p-4">
          <div className="d-flex align-items-center justify-content-between">
            <a
              href="https://github.com/xitusz"
              target="_blank"
              rel="noreferrer"
              className="d-flex align-items-center text-decoration-none"
            >
              <img
                src="https://user-images.githubusercontent.com/25181517/192108374-8da61ba1-99ec-41d7-80b8-fb2f7c0a4948.png"
                alt="github"
                height={"64px"}
              />
              <p className="fs-3 fw-semibold text-nowrap">GitHub</p>
            </a>
            <div className="text-end">
              <button className="btn p-0" onClick={() => window.scrollTo(0, 0)}>
                <img
                  src="https://icons.veryicon.com/png/o/internet--web/truckhome/back-to-the-top-2.png"
                  alt="voltar ao topo"
                  height={"40px"}
                />
                <div className="text-nowrap">Voltar ao topo</div>
              </button>
            </div>
          </div>
          <div>
            <ul className="d-flex flex-wrap list-inline align-items-center justify-content-center">
              <li className="p-1">
                <a
                  href="https://www.linkedin.com/in/gabrielalves1/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"
                    alt="linkedIn"
                  />
                </a>
              </li>
              <li className="p-1">
                <a
                  href="mailto:2kgabrielalves@gmail.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white"
                    alt="gmail"
                  />
                </a>
              </li>
              <li className="p-1">
                <a
                  href="https://xitusz.github.io/my-portfolio/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="https://camo.githubusercontent.com/33bc5b729c9fb7f279528ca182bb84d42b9b6fb40233e494afa02fad1599bcb7/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f706f7274666f6c696f2d3030303030303f7374796c653d666f722d7468652d6261646765266c6f676f3d41626f75742e6d65266c6f676f436f6c6f723d7768697465"
                    alt="portfolio"
                  />
                </a>
              </li>
            </ul>
          </div>
          <hr className="my-4 mx-auto" />
          <div>
            <p className="text-center">
              © 2023{" "}
              <a
                href="https://github.com/xitusz"
                target="_blank"
                rel="noreferrer"
                className="text-decoration-none"
              >
                Gabriel Alves
              </a>
              . All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
