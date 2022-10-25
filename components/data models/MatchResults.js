export default class MatchResults {

    /**
     * Creates a data object to handle the match results
     * @param id The Id of the match
     * @param idPlayer1 The Id of the player 1
     * @param statePlayer1 The state of the first player. Three options possible: 1 => player has won, 2 => draw, 4 => player has lost. Use playerStates for convenience.
     * @param idPlayer2 The Id of the player 2
     * @param statePlayer2 Like statePlayer1, but setting the state for second player.
     */
    constructor(id, idPlayer1, statePlayer1, idPlayer2, statePlayer2) {
        this.id = id;
        this.idPlayer1 = idPlayer1;
        this.statePlayer1 = statePlayer1;
        this.idPlayer2 = idPlayer2;
        this.statePlayer2 = statePlayer2;
    }

    static playerStates = {
        won: 3,
        draw: 1,
        lost: 0
    };


}