import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

const Header = ({ siteCounty, siteState }) => (
  <header>
    {console.log(siteCounty)}
    <h1 className="font-heading text-5xl py-16 leading-none">
      <Link to="/">
        <span>{!!siteCounty.length ? `${siteCounty} County` : siteState}</span>
        <br />
        <span>Service</span>
        <br />
        <span>Relief</span>
      </Link>
    </h1>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
  siteCounty: PropTypes.string,
  siteState: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ``,
  siteCounty: ``,
  siteState: ``
};

export default Header;
