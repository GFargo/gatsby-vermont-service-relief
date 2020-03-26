import React from "react";
import { useStaticQuery, graphql } from "gatsby";

// https://github.com/mathdroid/covid-19-api

const LocalStats = () => {
  const data = useStaticQuery(graphql`
    query LocalCovidStatsQuery {
      covid19ProvinceStateDetail(provinceState: {eq: "Vermont"}) {
        provinceState
        lastUpdate(fromNow: true)
        deaths
        confirmed
        recovered
        countryRegion
        active
      }
    }
  `);

  console.log("LocalStats", data.covid19ProvinceStateDetail);

  const {
    active,
    confirmed,
    deaths,
    recovered,
    lastUpdate,
    provinceState,
  } = data.covid19ProvinceStateDetail;

  return (
    <>
        <ul className="flex flex-col mb-3">
        <li>Active: <span>{active}</span></li> 
        <li>Confirmed: <span>{confirmed}</span></li> 
        <li>Deaths: <span>{deaths}</span></li> 
        <li>Recovered: <span>{recovered}</span></li> 
        </ul>
        <p className="mt-3 mb-2 text-xs">Stats for {provinceState} from <a className="underline" href="https://github.com/mathdroid/covid-19-api">Covid-19 API</a>.</p>
        <p className="flex flex-col text-xs">
            <span>Last updated:</span>
            <span>{lastUpdate}</span>
        </p>
    </>
  );
};

export default LocalStats;
