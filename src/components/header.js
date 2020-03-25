import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

const Header = ({ siteCommunity }) => (
  <header>
    <h1 className="font-heading text-5xl py-16 leading-none">
      <Link to="/">
        <span>{siteCommunity? siteCommunity : '{COMMUNITY}'}</span>
        <br />
        <span>Service</span>
        <br />
        <span>Relief</span>
      </Link>
    </h1>
  </header>
);

Header.propTypes = {
  siteCommunity: PropTypes.string,
};

Header.defaultProps = {
  siteCommunity: ``,
};

export default Header;
