import React from "react";
import {
  Link
} from "react-scroll";

function Header() {
  return (
    <header className="header">
      <div className="flex">
        <h1>Transactions Dashboard</h1>
      </div>
      <div className="abt">
        <Link
          activeClass="active"
          className="test6"
          to="anchor"
          spy={true}
          smooth={true}
          duration={500}
        >
          Charts/Statistics
        </Link>
      </div>
    </header>
  );
}

export default Header;
