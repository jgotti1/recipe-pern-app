import React from "react";

const Header = () => {
  return (
    <div>
      <h1 className="font-weight-bold display-1 text-center">Recipe Finder</h1>
      <h6 className="text-center link-secondary fw-lighter">
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
