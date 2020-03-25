import React from "react";

const Description = ({ county, state }) => (
  <p className="text-lg mb-8">
    A directory of fundraisers for {county ? `${county} county` : state} bars, venues, restaurants, and service
    businesses that can use our help to support their staff during the
    state-mandated shutdown. A work-in-progress.
  </p>
);

export default Description;
