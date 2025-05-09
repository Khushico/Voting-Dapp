import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import List from "../components/List";
import UserCard from "../components/UserCard";
import ElectionCard from "../components/ElectionCard";
import Winner from "../components/Winner";
import { createClient, cacheExchange, fetchExchange } from "@urql/core";
import { toast } from "sonner";

const Dashboard = ({ state, info, details, pIdEc, setinfo }) => {
  const [run, setRun] = useState(false);

  const queryUrl = "https://api.studio.thegraph.com/query/55899/testing/version/latest";
  const query = `{
    ecWinners(first: 10 where: {_electionCommission: "${pIdEc.EcAddress}"}) {
      id
      _info_pollId
      _info_winnerName
      _info_partyName
      _electionCommission
    }
    candidates(first: 100, where: {_pollId:  "${pIdEc.pollId}"}) {
      id
      _name
      _party
      _candidateId
      _electionCommission
      _pollId
    }
    voters(where: {_pollId:  "${pIdEc.pollId}"}, first: 100) {
      _name
      _voterAdd
      _votedTo
      _pollId
      _electionCommission
    }
  }`;

  const client = createClient({
    url: queryUrl,
    exchanges: [cacheExchange, fetchExchange],
  });

  const getPidEc = async () => {
    const pollId = Number(await state.contract.nextPollId());
    const electionCommission = await state.contract.electionCommission();
    details(pollId, electionCommission);
  };

  const setifo = async () => {
    const { data } = await client.query(query).toPromise();
    setinfo(data);
    if (typeof data == "undefined") {
      setRun(false);
    } else {
      setRun(true);
    }
  };

  useEffect(() => {
    getPidEc();
    setifo();
  }, []);

  return (
    <div className="flex h-full space-x-12 bg-gradient-to-br from-indigo-900 via-purple-900 to-black">
      <Navigation />
      <div className="p-4 w-full flex space-x-20 dark:text-slate-50">

        {/* Candidate Detail Cards */}
        <div className="w-[60%] h-full p-6 shadow-2xl rounded-lg bg-gray-800 dark:bg-gray-700 border border-gray-600">
          <h1 className="mb-10 text-3xl font-semibold text-gray-100 tracking-wide">
            Registered Candidates
          </h1>
          <div className="w-full gap-4">
            {run ? (
              <div className="grid grid-rows-2 grid-flow-col gap-12 w-[90%] md:mb-10">
                {info.candidates.map((candidate, index) => (
                  <List
                    state={state}
                    key={index}
                    name={candidate._name}
                    party={candidate._party}
                    id={candidate._candidateId}
                    setValue={true}
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-rows-1 grid-flow-col gap-12 w-[90%] md:mb-10">
                <List setValue={false} />
              </div>
            )}
          </div>

          {/* Winner Section */}
          <div className="w-[90%] mt-10">
            <h1 className="mb-10 text-3xl font-semibold text-gray-100 tracking-wide">
              Winner
            </h1>
            <Winner state={state} />
          </div>
        </div>

        {/* Election & User Detail Cards */}
        <div className="w-[35%] h-full p-6 flex flex-col space-y-10 bg-gray-800 dark:bg-gray-700 shadow-2xl rounded-lg">
          <ElectionCard state={state} info={info} />
          <UserCard state={state} />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;


