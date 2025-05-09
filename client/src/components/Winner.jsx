import React, { useEffect, useState } from "react";

const Winner = ({ state }) => {
  const [pollEnded, setPollEnded] = useState();
  const [endTimeInUnix, setUnixTime] = useState();
  const [winnerInfo, setWinnerInfo] = useState({
    candidateId: null,
    name: null,
    party: null,
  });

  const getTime = async () => {
    try {
      const _endTime = Number(await state.contract.endTime());
      setUnixTime(_endTime);
    } catch (error) {
      // console.log(error);
    }
  };

  const compare = async () => {
    await getTime();

    let dte = new Date().getTime();
    dte = Math.floor(dte / 1000);
    if (endTimeInUnix > dte) {
      setPollEnded(false);
    } else {
      try {
        const val = await state.contract.EcPollInfo();
        const id = Number(val[0]);
        const name = val[1];
        const party = val[2];
        setWinnerInfo({ id, name, party });
      } catch (error) {
        console.log(error);
      }
      setPollEnded(true);
    }
  };

  useEffect(() => {
    compare();
  }, []);

  return (
    <>
      <div className="w-full max-w-lg mx-auto rounded-3xl p-px bg-gradient-to-b from-blue-500 to-purple-600 dark:from-blue-800 dark:to-indigo-900 transition-all duration-700 hover:shadow-xl dark:hover:shadow-lg">
        <div className="rounded-[calc(1.5rem-1px)] p-8 w-full bg-white dark:bg-gray-800 shadow-lg dark:shadow-xl">
          <div className="flex gap-6 items-center justify-between">
            {/* Party and Name Section */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                {winnerInfo.name}
              </h3>
              <p className="text-lg text-gray-500 dark:text-gray-300 mt-1">
                {winnerInfo.party}
              </p>
            </div>
            {/* Candidate ID Section */}
            <div className="text-right">
              <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400">
                Candidate ID
              </h3>
              <span className="text-xl text-gray-700 dark:text-gray-300 font-bold">
                {winnerInfo.candidateId}
              </span>
            </div>
          </div>

          {/* Poll Status (for Poll Ended) */}
          {pollEnded && (
            <div className="mt-4 text-center text-lg text-green-600 dark:text-green-400 font-medium">
              <p>Poll has ended. Winner announced!</p>
            </div>
          )}

          {/* Loading or Poll Ongoing */}
          {!pollEnded && (
            <div className="mt-4 text-center text-lg text-yellow-500 dark:text-yellow-400 font-medium">
              <p>The poll is still ongoing. Please wait...</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Winner;
