import React, { useEffect, useState } from "react";

const Card = ({ state }) => {
  const [register, setRegister] = useState(false);
  const [voted, setVoted] = useState(false);
  const [voterId, setVoterId] = useState("N/A");

  const voterRegisteredCheck = async () => {
    try {
      const isRegistered = await state.contract.checkVoterRegistered();
      setRegister(isRegistered);
    } catch (error) {
      console.error("Error checking registration:", error);
    }
  };

  const votedOrNot = async () => {
    try {
      const hasVoted = await state.contract.checkVotedOrNot();
      setVoted(hasVoted);
    } catch (error) {
      console.error("Error checking vote status:", error);
    }
  };

  const checkVoterId = async () => {
    try {
      const id = Number(await state.contract.checkVoterID());
      setVoterId(id);
    } catch (error) {
      console.error("Error fetching voter ID:", error);
    }
  };

  useEffect(() => {
    const fetchVoterData = async () => {
      await voterRegisteredCheck();
      await votedOrNot();

      if (register) {
        await checkVoterId();
      } else {
        setVoterId("N/A");
      }
    };

    fetchVoterData();
  }, [state]);

  return (
    <div className="w-[90%] rounded-3xl p-px bg-gradient-to-b from-blue-300 to-pink-300 dark:from-blue-800 dark:to-purple-800 transition-all duration-700 hover:shadow-[0_3px_10px_rgba(0,0,0,0.2)] dark:hover:shadow-cyan-500/50">
      <div className="rounded-[calc(1.5rem-1px)] p-6 w-full bg-white dark:bg-gray-900">
        <div className="grid grid-cols-1 gap-4 text-sm md:text-base">
          <h2 className="text-center font-semibold text-gray-700 dark:text-white">
            🧾 User Status
          </h2>

          <div className="flex items-center gap-2">
            <h3 className="font-medium text-gray-700 dark:text-gray-400">
              Registered:
            </h3>
            <span
              className={`font-light tracking-wide ${
                register ? "text-[#2ABB94]" : "text-[#F784AD]"
              }`}
            >
              {register ? "Voter Registered" : "Voter Not Registered"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <h3 className="font-medium text-gray-700 dark:text-gray-400">
              Voter ID:
            </h3>
            <span
              className={`font-light tracking-wide ${
                register ? "text-[#2ABB94]" : "text-[#F784AD]"
              }`}
            >
              {voterId}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <h3 className="font-medium text-gray-700 dark:text-gray-400">
              Voted:
            </h3>
            <span
              className={`font-light tracking-wide ${
                voted ? "text-[#2ABB94]" : "text-[#F784AD]"
              }`}
            >
              {voted ? "Voted" : "Not Voted"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
