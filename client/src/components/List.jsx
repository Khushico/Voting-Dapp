import React, { useEffect, useState } from "react";
import Button from "./Button";

const List = ({ state, name, party, id, setValue }) => {
  const [fill, setFill] = useState(false);

  useEffect(() => {
    setFill(setValue);
  }, [setValue]);

  return (
    <div className="w-full rounded-3xl p-px bg-gradient-to-b from-blue-300 to-pink-300 dark:from-blue-800 dark:to-purple-800 transition-all duration-700 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] dark:hover:shadow-cyan-500/50">
      <div className="rounded-[calc(1.5rem-1px)] p-6 bg-white dark:bg-gray-900">
        {fill ? (
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 tracking-wide">
                {party}
              </p>
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-400">
                Candidate ID
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{id}</p>
            </div>

            <Button id={id} event="Vote" state={state} />
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <span className="text-md font-medium text-gray-600 dark:text-gray-400">
              Candidates have not registered yet!
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
