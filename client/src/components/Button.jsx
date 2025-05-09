import React from "react";
import { toast } from 'sonner';

const Button = ({ event, id, state }) => {

  const vote = async () => {
    try {
      const voterId = Number(await state.contract.checkVoterID());
      console.log(id, voterId);
      await state.contract.vote.send(voterId, id);
      toast.success("You have successfully Voted");
    } catch (error) {
      console.error(error);
      toast.error(error.reason);
    }
  };

  return (
    <button
      onClick={vote}
      className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-3xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-400 active:scale-95"
    >
      {event}
    </button>
  );
};

export default Button;
