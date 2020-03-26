import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import Popover from 'react-tiny-popover'

const LocalStats = () => {
  const data = useStaticQuery(graphql`
    query LocalCovidStatsQuery {
      allGoogleSheetStatsRow {
        nodes {
          label
          value
        }
      }
    }
  `);

  const {
    nodes,
  } = data.allGoogleSheetStatsRow;

  const swapLabel = (label) => {
    if(label.includes('Positive test results')) {
      return "Tested Positive";
    }
    if(label.includes('Total tests conducted')) {
      return "Total Tested";
    }
    if(label.includes('Deaths+')) {
      return "Deaths";
    }
    if(label.includes('People being monitored')) {
      return "Being Monitored";
    }
    if(label.includes('People who have completed monitoring')) {
      return "Completed Monitoring";
    }
    return label;
  }

  const [isOpen, setState] = useState(false);
  
  return (
      <Popover
        isOpen={isOpen}
        position={['top', 'left',  'bottom']} 
        padding={6}
        onClickOutside={() => setState(false)}
        content={({ position, nudgedLeft, nudgedTop, targetRect, popoverRect }) => (
          <div className="bg-black text-white rounded p-6" style={{backgroundColor: '#205027'}}>
            <ul className="flex flex-col mb-3">
              {nodes.map((node, index) => (
                <li 
                  key={index.toString()}
                  className={`flex flex-row justify-between py-1 ${nodes.length > index + 1 ? 'border-b' : ''} border-dotted`}
                >
                  {console.log(nodes.length, index)}
                  <span className="mr-3 font-semibold">{swapLabel(node.label)}:</span>
                  <span>{node.value}</span>
                </li>
              ))}
            </ul>
            <div style={{color: '#Fbb034'}} className="font-bold">
              <p className="text-xs">Data from <a className="underline" href="https://www.healthvermont.gov/response/infectious-disease/2019-novel-coronavirus">VT Public Health</a></p>
              <p className="flex flex-col text-xs">Updated daily by 1:00 p.m</p>
            </div>
          </div>
        )}
      >
        <button 
          title="Current Activity"
          className="text-xl text-3xl text-gray-400 hover:text-gray-500"
          onClick={() => setState(!isOpen)}
        >
          &#9432;
        </button>
      </Popover>
  );
};



export default LocalStats;
