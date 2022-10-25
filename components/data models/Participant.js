export default class Participant {
    constructor(id, group, name, forename, weight) {
        this.name = name;
        this.forename = forename;
        this.fullname = function () {
            return forename + " " + name;
        };
        this.group = group;
        this.id = id;
        this.weight = weight;
        this.points = 0;
    }
}