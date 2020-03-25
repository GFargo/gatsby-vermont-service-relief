import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import Img from "gatsby-image"

const Header = ({ siteTitle, siteCommunity, siteLogo }) => (
  <header className="flex flex-col lg:flex-row lg:justify-start text-center lg:text-left items-center py-16">
    <div className="w-32 lg:-ml-40 lg:mr-8 mb-6 lg:mb-0">
      <Img fluid={siteLogo.childImageSharp.fluid} />
    </div>
    <h1 className="font-heading text-5xl leading-none">
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
