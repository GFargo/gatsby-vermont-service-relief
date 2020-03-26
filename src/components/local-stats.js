import React, { useState } from "react";
import Popover from 'react-tiny-popover'
import axios from "axios";
import { useQuery } from "react-query";
import Loader from 'react-loader-spinner'

const getStats = async () => {
  const { data } = await axios.get(
    "https://spreadsheets.google.com/feeds/cells/1xSZHv2emLxkBFViORfG42SYpWtwM-ZbwrQ7CfHX5WXQ/1/public/values?alt=json"
  );
  return data;
};

const LocalStats = () => {
  const { status, data, error } = useQuery("stats", getStats);

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
  
  let rows = [];

  const { entry } = data ? data.feed : {};

  if(entry !== undefined) {   
    // Increment for loop by two to jump to next row on sheet.
    for (let index = 2; index < entry.length; index+=2) {
      rows = [
        ...rows,
        {
          label: swapLabel(entry[index].content["$t"]),
          value: entry[index + 1].content["$t"],
        }
      ]
    }
  }

  return (
      <Popover
        isOpen={isOpen}
        position={['top', 'left',  'bottom']} 
        padding={6}
        onClickOutside={() => setState(false)}
        content={({ position, nudgedLeft, nudgedTop, targetRect, popoverRect }) => (
          <div className="bg-black text-white rounded p-6" style={{backgroundColor: '#205027'}}>
            {status === "loading" ? (
              <div className="w-16 mx-auto py-3 text-center">
                <Loader
                  type="Bars"
                  color="#Fbb034"
                  height={64}
                  width={64}
                />
             </div>
            ) : status === "error" ? (
              <span>Error: {error.message}</span>
            ) : (
              <>
                <ul className="flex flex-col mb-3">
                  {rows.map((row, index) => (
                    <li 
                      key={index.toString()}
                      className={`flex flex-row justify-between py-1 ${rows.length > index + 1 ? 'border-b' : ''} border-dotted`}
                    >
                      <span className="mr-3 font-semibold">{swapLabel(row.label)}:</span>
                      <span>{row.value}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

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
