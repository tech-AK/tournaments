import {Component} from "react";
import MatchResults from "../data models/MatchResults";
import JoinedMatchResults from "../data models/JoinedMatchResults";
import TableResults from "./TableResults"
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

class TableComponent extends Component {

    state = {
        results: [],
        sortedResults: [],
        dropdownActive: false,
        dropdownId: null,
        displayResults: false,
    };

    toggleDropdown = (idName) => {
        this.setState({
            dropdownActive: !this.state.dropdownActive,
            dropdownId: idName
        });
    }

    render() {
        let resultsHTML = <></>;
        if (this.state.displayResults) {
            resultsHTML = (
                <table className="table table-striped table-hover align-middle">
                    <TableResults loadedPDF={this.props.pdfFormFile} sortedResults={this.state.sortedResults}
                                  triggerRecalculateResults={this.calculateTotalResults}/>
                </table>
            )
        }

        return (
            <div className="pb-5">
                <h1 className="display-5 text-center">{this.props.groupDesc}</h1>
                <table className="table table-striped table-hover">
                    <TableHeader/>
                    <TableBody participantData={this.props.participantData} groupNo={this.props.group} onUpdateResults={this.updateResults} onDropDown={this.toggleDropdown}
                               results={this.state.results} dropdownState={this.state.dropdownActive} dropdownId={this.state.dropdownId}/>

                </table>
                {resultsHTML}
            </div>
        )
    }

    updateResults = (matchIdToUpdate, idPlayer1, statePlayer1, idPlayer2, statePlayer2, playerData) => {
        let newArray;
        if (this.state.results.length > 0) {
            newArray = [...this.state.results];
        } else {
            newArray = [];
        }

        const index = newArray.findIndex(x => x.id === matchIdToUpdate);


        //check if user wants to delete entry in array and thus, has specified no further information
        if (idPlayer1 === undefined && statePlayer1 === undefined && idPlayer2 === undefined && statePlayer2 === undefined) {
            //user wants to reset entry
            if (index !== -1) {
                newArray.splice(index, 1);
            } else {
                //already no entry available
            }
        } else {
            //user wants to set new entry
            if (index !== -1) {
                newArray[index].statePlayer1 = statePlayer1;
                newArray[index].statePlayer2 = statePlayer2;
            } else {
                const matchResults = new MatchResults(matchIdToUpdate, idPlayer1, statePlayer1, idPlayer2, statePlayer2);
                newArray.push(matchResults);
            }
        }


        //this.setState({results: newArray}) //let the method calculateTotalResults() update the state and trigger re-creation of website
        this.calculateTotalResults(playerData, newArray) //we need to pass newArray to the method as state is not updated that fast
    }

    isAllResultsFilledIn = (playerData, resultArray) => {
        const totalMatches = binomial(playerData.length, 2); //want to create out of every participant matches where 2 participants fight against each other
        return (totalMatches === resultArray.length); //every result was recorded
    }

    calculateTotalResults = (playerData, resultArray) => {
        if (this.isAllResultsFilledIn(playerData, resultArray)) {
            let totalResults = [];
            for (let i = 0; i < playerData.length; i++) {
                totalResults.push(new JoinedMatchResults(playerData[i].id, playerData[i], 0, -1));
            }

            resultArray.map((match => {
                const index1 = totalResults.findIndex(x => x.idPlayer === match.idPlayer1);
                totalResults[index1].points += match.statePlayer1;

                const index2 = totalResults.findIndex(x => x.idPlayer === match.idPlayer2);
                totalResults[index2].points += match.statePlayer2;
            }));

            let sortedResults = totalResults.sort((a, b) => (a.points < b.points ? 1 : -1));

            let rank = 1;
            for (let i = 0; i < sortedResults.length; i++) {
                sortedResults[i].rank = rank;
                if (i + 1 < sortedResults.length && sortedResults[i + 1].points !== sortedResults[i].points) {
                    rank++;
                }
            }

            this.setState({
                sortedResults: sortedResults,
                results: resultArray,
                displayResults: true,
            });

            //upload results to AWS - currently not used
            /*const date = new Date().toLocaleDateString();
            for (let i = 0; i < sortedResults.length; i++) {
                const idPlayer = sortedResults[i].idPlayer;
                const playerIndex = playerData.findIndex(x => x.id === idPlayer);
                sendResultsToDatabase(date, playerData[playerIndex].forename, playerData[playerIndex].name, playerData[playerIndex].weight, this.props.groupDesc, sortedResults[i].rank);
            }*/

        } else {
            //not every result is recorded yet, so we do not need to update sortedResults
            this.setState({
                results: resultArray,
                displayResults: false,
            });
        }


    }
}


async function sendResultsToDatabase(date, firstName, lastName, weight, groupName, rank) {
        const result = {
            TournamentsDate: date,
            firstName: firstName,
            lastName: lastName,
            weight: parseInt(weight),
            groupName: groupName,
            Rank: parseInt(rank)
        };

        //send to DB - this function is currently not used.
}

function binomial(n, k) {
    if ((typeof n !== 'number') || (typeof k !== 'number'))
        return false;
    let coeff = 1;
    for (let x = n - k + 1; x <= n; x++) {
        coeff *= x;
    }
    for (let x = 1; x <= k; x++) {
        coeff /= x;
    }
    return coeff;
}

export default TableComponent;