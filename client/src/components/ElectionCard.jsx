import React, { useEffect, useState } from "react";

const ElectionCard = ({ state, info }) => {
  const date = new Date().toLocaleString();
  const [startTime, setStartTime] = useState(date);
  const [endTime, setEndTime] = useState(date);
  const [pollEnded, setPollEnded] = useState();
  const [endTimeInUnix, setUnixTime] = useState();
  const [status, setStatus] = useState();

  const getTime = async () => {
    try {
      const _startTime = Number(await state.contract.startTime());
      const _endTime = Number(await state.contract.endTime());
      setUnixTime(_endTime);

      setStartTime(new Date(_startTime * 1000).toLocaleString());
      setEndTime(new Date(_endTime * 1000).toLocaleString());
    } catch (error) {
      console.log(error);
    }
  };

  const compare = () => {
    const now = Math.floor(new Date().getTime() / 1000);
    if (endTimeInUnix > now) {
      setStatus("🟢 Voting in Progress");
      setPollEnded(false);
    } else {
      setStatus("🔴 Voting has Ended");
      setPollEnded(true);
    }
  };

  useEffect(() => {
    getTime();
  }, []);

  useEffect(() => {
    if (!endTime) return;
    const interval = setInterval(compare, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  return (
    <div className="flex flex-col gap-6 items-center">
      
      {/* Header Section */}
      <div className="flex items-center justify-between w-full max-w-xl">
        <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-200">
          Election Status
        </h1>
        <div className="w-16 h-16 relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full"
          >
            <circle cx="50" cy="50" r="22" fill="#999" opacity="0.3" />
            <circle cx="50" cy="50" r="20" fill={pollEnded ? "#FF3131" : "#2ABB94"}>
              <animate
                attributeName="r"
                values="20;15;20"
                dur="4s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>
      </div>

      {/* Card Box */}
      <div className="w-[95%] max-w-2xl p-[2px] rounded-3xl bg-gradient-to-r from-pink-400 to-blue-400 dark:from-purple-700 dark:to-indigo-700 hover:shadow-lg transition duration-500">
        <div className="rounded-[calc(1.5rem-2px)] bg-white dark:bg-gray-900 p-6 backdrop-blur-xl">
          <div className="flex flex-col items-center gap-4 text-center">
            
            <p className="text-lg font-medium text-gray-800 dark:text-gray-200">{status}</p>

            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="font-light">📅 Current Time:</span>
              <span className="font-semibold text-gray-800 dark:text-white">{date}</span>

              <span className="font-light">🕒 Poll Start:</span>
              <span className="font-semibold text-green-600">{startTime}</span>

              <span className="font-light">⌛ Poll End:</span>
              <span className="font-semibold text-pink-500">{endTime}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectionCard;
