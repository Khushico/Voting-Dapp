import React from 'react';
import Navigation from "./Navigation";
import { toast } from 'sonner';

const ElectionCommission = ({ state }) => {

    const handleElection = async (event) => {
        event.preventDefault();
        const start = document.querySelector("#startT").value;
        const end = document.querySelector("#endT").value;
        const date = new Date();
        try {
            const tx = await state.contract.voteTime.send(start, end);
            await tx.wait();
            toast.success("Voting has been initialised", {
                description: `${date.toString().slice(0, 3)}, ${date.toString().slice(4, 7)} ${date.getDate()} at ${date.toLocaleTimeString()}`
            });
        } catch (error) {
            console.error(error);
            toast.error(error.reason);
        }
        console.log(start, end);
    }

    const handleEmergency = async () => {
        try {
            await state.contract.emergency();
            toast.success("Emergency has been declared");
        } catch (error) {
            console.error(error);
            toast.error(error.reason);
        }
    }

    const handleResult = async () => {
        try {
            await state.contract.result();
            toast.success("Result has been declared");
        } catch (error) {
            console.error(error);
            toast.error(error.reason);
        }
    }

    return (
        <div className='flex h-[100%] space-x-12 bg-gradient-to-br from-indigo-500 to-purple-500'>
            <Navigation />
            <div className="w-[60%] h-[70%] flex flex-col justify-center items-center mt-[5%]">

                <h1 className="mb-8 tracking-wide text-gray-100 text-3xl font-semibold text-center">
                    Set Election Voting Time (In Seconds)
                </h1>

                {/* Vote Time Form */}
                <form className="w-[80%] grid grid-rows-2 grid-flow-col gap-10" onSubmit={handleElection}>
                    <div className="w-full col-span-2 space-y-5">
                        <div className="rounded-3xl p-1 bg-gradient-to-r from-blue-400 to-pink-400 hover:shadow-2xl transition-all duration-500">
                            <input
                                className="rounded-xl p-4 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white h-12 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                placeholder="Start Time (in seconds)"
                                id="startT"
                                type="number"
                            />
                        </div>
                        <div className="rounded-3xl p-1 bg-gradient-to-r from-blue-400 to-pink-400 hover:shadow-2xl transition-all duration-500">
                            <input
                                className="rounded-xl p-4 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white h-12 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                placeholder="End Time (in seconds)"
                                id="endT"
                                type="number"
                            />
                        </div>
                    </div>

                    <div className='w-full mt-8'>
                        <button
                            type="submit"
                            className="relative inline-flex w-full items-center justify-center p-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-2xl text-white font-medium text-lg transition-all duration-300 focus:outline-none"
                        >
                            <span className="relative px-6 py-2">Start Voting</span>
                        </button>
                    </div>
                </form>

                {/* Emergency & Result Buttons */}
                <div className="w-full mt-10 flex justify-around space-x-4">
                    <button
                        onClick={handleEmergency}
                        className="w-[40%] py-3 rounded-xl bg-red-600 text-white font-medium text-lg hover:bg-red-700 shadow-2xl transition-all duration-300 focus:outline-none"
                    >
                        Declare Emergency
                    </button>
                    <button
                        onClick={handleResult}
                        className="w-[40%] py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium text-lg hover:bg-indigo-700 shadow-2xl transition-all duration-300 focus:outline-none"
                    >
                        Declare Result
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ElectionCommission;
