import React from 'react';
import Navigation from "./Navigation";
import { toast } from 'sonner';

const Candidate = ({ state, handleCase }) => {
  const handleInfo = async (event) => {
    event.preventDefault();
    const candidatesInfo = {
      name: handleCase(document.querySelector("#name").value),
      party: (document.querySelector("#party").value).toUpperCase(),
      age: document.querySelector("#age").value,
      gender: handleCase(document.querySelector("#gender").value),
    };

    try {
      await state.contract.candidateRegister.send(
        candidatesInfo.name,
        candidatesInfo.party,
        candidatesInfo.age,
        candidatesInfo.gender
      );
      toast.success(`Candidate ${candidatesInfo.name} registered successfully`);
      // window.location.reload() // Uncomment if you want to refresh the page after registration
    } catch (error) {
      console.log(error);
      toast.error(error.reason);
    }
  };

  return (
    <div className="flex h-full space-x-32 bg-gray-50 dark:bg-gray-900">
      <Navigation />
      <div className="w-[60%] h-[70%]">
        <div className="flex flex-col justify-center items-center mt-10">
          <h1 className="mb-8 text-3xl font-semibold text-gray-800 dark:text-gray-100 tracking-wide">Candidate Registration</h1>

          {/* Form starts */}
          <form className="grid grid-cols-1 gap-8 w-full" onSubmit={handleInfo}>
            <div className="space-y-8">
              {/* Name Input */}
              <div className="w-full">
                <input
                  id="name"
                  className="w-full p-4 rounded-2xl text-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 shadow-lg transition-all duration-300 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 hover:shadow-2xl"
                  placeholder="Enter name"
                  required
                />
              </div>

              {/* Party Input */}
              <div className="w-full">
                <input
                  id="party"
                  className="w-full p-4 rounded-2xl text-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 shadow-lg transition-all duration-300 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 hover:shadow-2xl"
                  placeholder="Enter party"
                  required
                />
              </div>

              {/* Age Input */}
              <div className="w-full">
                <input
                  id="age"
                  className="w-full p-4 rounded-2xl text-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 shadow-lg transition-all duration-300 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 hover:shadow-2xl"
                  placeholder="Enter age"
                  type="number"
                  required
                />
              </div>

              {/* Gender Input */}
              <div className="w-full">
                <input
                  id="gender"
                  className="w-full p-4 rounded-2xl text-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 shadow-lg transition-all duration-300 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 hover:shadow-2xl"
                  placeholder="Enter gender"
                  required
                />
              </div>
            </div>

            {/* Register Button */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="inline-flex items-center justify-center p-3 w-[35%] rounded-full text-white font-semibold bg-gradient-to-br from-purple-600 to-blue-500 transition-all duration-300 hover:bg-gradient-to-bl focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg hover:shadow-2xl"
              >
                Register
              </button>
            </div>
          </form>
          {/* Form ends */}
        </div>
      </div>
    </div>
  );
};

export default Candidate;
