import React from "react";
import Navigation from "./Navigation";
import { toast } from 'sonner';

const Voter = ({ state, handleCase }) => {

  const handleVoterInfo = async (event) => {
    event.preventDefault();
    const voterInfo = {
      name: handleCase(document.querySelector("#nameV").value),
      age: handleCase(document.querySelector("#ageV").value),
      gender: handleCase(document.querySelector("#genderV").value),
    };

    try {
      await state.contract.voterRegister.send(voterInfo.name, voterInfo.age, voterInfo.gender);
      toast.success(`Voter ${voterInfo.name} registered successfully`);
    } catch (error) {
      toast.error(error.reason || error.message);
    }
  };

  const handleVoting = async (event) => {
    event.preventDefault();
    const voterId = document.querySelector("#voterId").value;
    const candidateId = document.querySelector("#candidateId").value;

    try {
      await state.contract.vote.send(voterId, candidateId);
      toast.success("User voted successfully");
    } catch (error) {
      toast.error(error.reason || error.message);
    }
  };

  return (
    <>
      <div className="flex h-full space-x-32 px-8 py-10">
        <Navigation />
        <div className="w-[60%] h-[70%] flex flex-col space-y-20">
          
          {/* Voter Registration Section */}
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-10">Voter Registration</h1>

            {/* Voter Registration Form */}
            <form onSubmit={handleVoterInfo} className="w-full grid grid-rows-3 gap-6">
              <div className="w-full">
                <input
                  className="w-full p-4 rounded-xl bg-gradient-to-r from-blue-300 to-purple-300 text-gray-800 dark:bg-gradient-to-r dark:from-blue-800 dark:to-purple-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 shadow-md"
                  placeholder="Enter Name"
                  id="nameV"
                  required
                />
              </div>
              <div className="w-full">
                <input
                  className="w-full p-4 rounded-xl bg-gradient-to-r from-blue-300 to-purple-300 text-gray-800 dark:bg-gradient-to-r dark:from-blue-800 dark:to-purple-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 shadow-md"
                  placeholder="Enter Age"
                  id="ageV"
                  type="number"
                  required
                />
              </div>
              <div className="w-full">
                <input
                  className="w-full p-4 rounded-xl bg-gradient-to-r from-blue-300 to-purple-300 text-gray-800 dark:bg-gradient-to-r dark:from-blue-800 dark:to-purple-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 shadow-md"
                  placeholder="Enter Gender"
                  id="genderV"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="w-full flex justify-center mt-6">
                <button
                  type="submit"
                  className="relative inline-flex items-center justify-center p-0.5 rounded-full overflow-hidden text-sm font-medium text-white group bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 transition-all duration-200 shadow-xl"
                >
                  <span className="relative px-6 py-3 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0 transition-all duration-700">
                    Register
                  </span>
                </button>
              </div>
            </form>
          </div>

          {/* Voting Section */}
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-10">Vote</h1>

            {/* Voting Form */}
            <form onSubmit={handleVoting} className="w-full grid grid-rows-2 gap-6">
              <div className="w-full">
                <input
                  className="w-full p-4 rounded-xl bg-gradient-to-r from-blue-300 to-purple-300 text-gray-800 dark:bg-gradient-to-r dark:from-blue-800 dark:to-purple-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 shadow-md"
                  placeholder="Enter Voter ID"
                  id="voterId"
                  type="number"
                  required
                />
              </div>
              <div className="w-full">
                <input
                  className="w-full p-4 rounded-xl bg-gradient-to-r from-blue-300 to-purple-300 text-gray-800 dark:bg-gradient-to-r dark:from-blue-800 dark:to-purple-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 shadow-md"
                  placeholder="Enter Candidate ID"
                  id="candidateId"
                  type="number"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="w-full flex justify-center mt-6">
                <button
                  type="submit"
                  className="relative inline-flex items-center justify-center p-0.5 rounded-full overflow-hidden text-sm font-medium text-white group bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 transition-all duration-200 shadow-xl"
                >
                  <span className="relative px-6 py-3 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0 transition-all duration-700">
                    Vote
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Voter;
