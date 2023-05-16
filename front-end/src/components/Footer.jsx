import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { BsArrowUp } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="mt-3 bg-light">
      <div className="mx-5">
        <div className="w-full mx-auto p-4">
          <div className="d-flex align-items-center justify-content-between">
            <div className="text-end">
              <BsArrowUp
                size={45}
                data-testid="arrow-icon"
                onClick={() => window.scrollTo(0, 0)}
              />
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
                  <FaLinkedin size={26} data-testid="linkedin-icon" />
                </a>
              </li>
              <li className="p-1">
                <a
                  href="mailto:2kgabrielalves@gmail.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FiMail size={30} data-testid="gmail-icon" />
                </a>
              </li>
              <li className="p-1">
                <a
                  href="https://github.com/xitusz"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaGithub size={26} data-testid="github-icon" />
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
