// Cycle Model This model contains four stages of exercise

export class CycleModel {

    public pattern;
    public title : string;
    public inhale : number;
    public hold : number;
    public exhale : number;
    public sustain : number;

    constructor(_title : string, _inhale : number, _hold : number, _exhale : number, _sustain : number) {

        this.title = _title;
        this.inhale = _inhale;
        this.hold = _hold;
        this.exhale = _exhale;
        this.sustain = _sustain;
        this.pattern = CycleModel.getString(this);
    }

    public static getLenght(c : CycleModel, t : number)
    {
        return (c.inhale * t) + (c.hold * t) + (c.exhale * t) + (c.sustain * t);
    }

    public static getTimes(c : CycleModel, t : number)
    {
        let s = "";
        if (c.inhale > 0) {
            s += (c.inhale * t).toString();
        }

        if (c.hold > 0) {
            s += ":" + (c.hold * t).toString();
        }

        if (c.exhale > 0) {
            s += ":" + (c.exhale * t).toString();
        }

        if (c.sustain > 0) {
            s += ":" + (c.sustain * t).toString();
        }

        return s;
    }

    public static getString(c : CycleModel)
    {
        let s = "";

        if (c.inhale > 0) {
            s += (c.inhale).toString();
        }

        if (c.hold > 0) {
            s += ":" + (c.hold).toString();
        }

        if (c.exhale > 0) {
            s += ":" + (c.exhale).toString();
        }

        if (c.sustain > 0) {
            s += ":" + (c.sustain).toString();
        }

        return s;
    }

}