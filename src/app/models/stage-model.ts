// StageModel
// This model contains basic item of exercise
// Title : this propterty maybe enum,
// start : start time of the stage
// end : end time of the stage
// we can define 'lenght' instead of 'end'

export class StageModel {

    constructor(public title : string, public start : number, public end : number) {}

}