import MatchPlan from "../data models/MatchPlan";
import MatchResults from "../data models/MatchResults";

function TableBody(props) {
    const matchPlan = MatchPlan.getMatchPlan(props.participantData);

    const rows = matchPlan.map((match) => {
        return createMatchRow(props.onUpdateResults, match, props.participantData, props.groupNo, props.onDropDown, props.dropdownState, props.dropdownId, props.results);
    });

    return (
        <tbody>{rows}</tbody>
    )
}

function saveResult(toggleDropDownFunction, updateResultsFunction, participantData, groupNo, matchId, idPlayer1, statePlayer1, idPlayer2, statePlayer2) {
    toggleDropDownFunction("group-" + groupNo + "-matchID-" + matchId);
    updateResultsFunction(matchId, idPlayer1, statePlayer1, idPlayer2, statePlayer2, participantData);
}

function getIndexOfPlayerID(participantData, id) {
    for (let i = 0; i < participantData.length; i++) {
        if (participantData[i].id === id) {
            return i
        }
    }
}

function createMatchRow(updateResults, match, participantData, groupNo, toggleDropDownFunction, dropdownState, dropdownId, results) {
    const composedID = "group-" + groupNo + "-matchID-" + match.id;
    const addClassName = (dropdownState && composedID === dropdownId) ? "show" : "";
    let hideForPrinting = true;

    const index = results.findIndex(x => x.id === match.id);
    let lastSelection = <>Enter results </>;
    if (index !== -1) {
        switch (results[index].statePlayer1) {
            case MatchResults.playerStates.won:
                lastSelection = <>{participantData[getIndexOfPlayerID(participantData, match.idPlayer1)].fullname()} has won</>;
                break;
            case MatchResults.playerStates.lost:
                lastSelection = <>{participantData[getIndexOfPlayerID(participantData, match.idPlayer2)].fullname()} has won</>;
                break;
            case MatchResults.playerStates.draw:
                lastSelection = <>Drawn</>;
                break;
        }
        //as the user selected already some option and the dropdown does not have the generic "Enter results" anymore,
        //we want the selected result to be displayed when the user prints the page.
        hideForPrinting = false;
    }

    return (

        <tr key={match.id} id={composedID}>
            <td className="align-middle">{participantData[getIndexOfPlayerID(participantData, match.idPlayer1)].fullname()}</td>
            <td className="align-middle">vs.</td>
            <td className="align-middle">{participantData[getIndexOfPlayerID(participantData, match.idPlayer2)].fullname()}</td>
            <td>
                <div className="dropdown">
                    <a className={"btn btn-secondary dropdown-toggle " + (hideForPrinting ? "no-print" : "")} type="button"
                       aria-expanded="false" onClick={() => toggleDropDownFunction("group-" + groupNo + "-matchID-" + match.id)}>
                        {lastSelection}
                    </a>
                    <ul className={"dropdown-menu " + addClassName}>
                        <li><a className="dropdown-item"
                               onClick={() => saveResult(toggleDropDownFunction, updateResults, participantData, groupNo, match.id, match.idPlayer1, MatchResults.playerStates.won, match.idPlayer2, MatchResults.playerStates.lost)}>{participantData[getIndexOfPlayerID(participantData, match.idPlayer1)].fullname()} has
                            won</a></li>
                        <li><a className="dropdown-item"
                               onClick={() => saveResult(toggleDropDownFunction, updateResults, participantData, groupNo, match.id, match.idPlayer1, MatchResults.playerStates.lost, match.idPlayer2, MatchResults.playerStates.won)}>{participantData[getIndexOfPlayerID(participantData, match.idPlayer2)].fullname()} has
                            won</a></li>
                        <li><a className="dropdown-item"
                               onClick={() => saveResult(toggleDropDownFunction, updateResults, participantData, groupNo, match.id, match.idPlayer1, MatchResults.playerStates.draw, match.idPlayer2, MatchResults.playerStates.draw)}>Drawn</a>
                        </li>
                        <li><a className="dropdown-item"
                               onClick={() => saveResult(toggleDropDownFunction, updateResults, participantData, groupNo, match.id)}>Reset</a>
                        </li>
                    </ul>
                </div>
            </td>
        </tr>
    )
}

export default TableBody;