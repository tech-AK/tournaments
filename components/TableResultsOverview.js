//NOTE: This class depends on AWS cloud and is currently not in use.
//import {listResults} from '/src/graphql/queries';
//import {API} from "aws-amplify";
import {useEffect, useState} from "react";

function TableResultsOverview(props) {

    //defines variable and function to use state in non-component class in react
    const [results, setResultState] = useState([]);
    const [notFetched, setFetchedState] = useState([true]);

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        if (notFetched) {
            fetchResults();
        }
    });

    const resultEntries = {results}.results;
    resultEntries.sort(sortResults);

    const rows = resultEntries.map((res) => {
        return createResultRow(res.TournamentsDate, res.firstName, res.lastName, res.groupName, res.weight, res.Rank);
    });

    return (
        <div className="px-5">
            <table className="table table-striped table-hover align-middle">
                <thead>
                <tr>
                    <th scope="col" className="col">Date</th>
                    <th scope="col" className="col">First Name</th>
                    <th scope="col" className="col">Last Name</th>
                    <th scope="col" className="col">Group</th>
                    <th scope="col" className="col">Weight</th>
                    <th scope="col" className="col">Rank</th>
                </tr>
                </thead>

                <tbody>{rows}</tbody>
            </table>
        </div>
    )

    function sortResults(a, b) {
        // sort result by date, groupName and rank
        const dateA = a.TournamentsDate;
        const dateB = b.TournamentsDate;

        if (dateA > dateB) {
            return -1;
        } else if (dateA < dateB) {
            return 1;
        }

        //then dates must be equal, use group name for next sort
        else {
            const groupNameA = a.groupName.toUpperCase(); // ignore upper and lowercase
            const groupNameB = b.groupName.toUpperCase();
            if (groupNameA > groupNameB) {
                return -1;
            }
            if (groupNameA < groupNameB) {
                return 1;
            }

            // names must be equal, use rank as last criteria
            return a.Rank - b.Rank;
        }
    }

    async function fetchResults() {
        setFetchedState(false); //prevent React to fetch infinitive times as each data rebuilds the component
        //const apiData = await API.graphql({query: listResults})
        setResultState(apiData.data.listResults.items); //update Result state
    }
}

function createResultRow(date, firstName, lastName, groupName, weight, rank) {
    return (
        <tr>
            <td className="align-middle">{date}</td>
            <td className="align-middle">{firstName}</td>
            <td className="align-middle">{lastName}</td>
            <td className="align-middle">{groupName}</td>
            <td className="align-middle">{weight} kg</td>
            <td className="align-middle">{rank}.</td>
        </tr>
    );
}


export default TableResultsOverview;