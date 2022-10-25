export default class MatchPlan {

    constructor(id, idPlayer1, idPlayer2) {
        this.id = id;
        this.idPlayer1 = idPlayer1;
        this.idPlayer2 = idPlayer2;
    }


    static getMatchPlan(data) {
        const matchPlan = [];
        let participants = [...data];
        let id = 0;
        for (let i = 0; i < data.length; i++) {
            participants.splice(0, 1); //always delete the first participant in array to skip him
            for (let j = 0; j < participants.length; j++) {
                    const match = new MatchPlan(id++, data[i].id, participants[j].id);
                    matchPlan.push(match);
            }
        }
        return matchPlan;
    }

}