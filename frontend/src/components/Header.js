import React from "react";

const Header = () => {
  return (
    <div>
      <h1 className="fw-bolder display-1 text-center textShadow mt-4">Recipe Finder</h1>
      <h6 className="text-center link-secondary fw-lighter textShadow">
        <i className="bi bi-c-circle copy"></i>
        <a className="hoverColor link-secondary text-decoration-none fst-italic" href="http://margotticode.com" target="_blank" rel="noreferrer">
          {" "}
          MargottiCode{" "}
        </a>
        {new Date().getFullYear()}
      </h6>
    </div>
  );
};

export default Header;
