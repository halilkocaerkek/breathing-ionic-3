
// Cycle Model This model contains four stages of exercise

export class CycleModel {

  public pattern;
  public title: string;
  public inhale: number;
  public hold: number;
  public exhale: number;
  public sustain: number;

   inhaleMin: number;
   holdMin: number;
   exhaleMin: number;
   sustainMin: number;

  constructor(_title: string, _inhale: number, _hold: number, _exhale: number, _sustain: number) {

    this.title = _title;
    this.inhale = _inhale;
    this.hold = _hold;
    this.exhale = _exhale;
    this.sustain = _sustain;
    this.pattern = CycleModel.getString(this);
  }

  public static getLenght(c: CycleModel, t: number) {
    return (c.inhale * t) + (c.hold * t) + (c.exhale * t) + (c.sustain * t);
  }

  public static getTimes(c: CycleModel, t: number) {
    let s = "";
    if (c.inhale > 0) {
      c.inhaleMin = c.inhale * t;
      s += c.inhaleMin.toString();
    }

    if (c.hold > 0) {
      c.holdMin = c.hold * t;
      s += ":" + c.holdMin.toString();
    }

    if (c.exhale > 0) {
      c.exhaleMin = c.exhale * t ;
      s += ":" + c.exhaleMin.toString();
    }

    if (c.sustain > 0) {
      c.sustainMin = c.sustain * t;
      s += ":" + c.sustainMin.toString();
    }

    return s;
  }

  public static getString(c: CycleModel) {
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

  public static gethighlights(c: CycleModel, t: number) {
    let highlights = [];
    let ratio = this.getRatio(c, t) * t;

    let from : number = 0;
    let to : number = c.inhale * ratio ;
    highlights.push(this.gethighlight( from, to, "red"))

    from = to;
    to = from + c.hold * ratio;
    highlights.push(this.gethighlight(from, to, "yellow"));

    from = to;
    to = from + c.exhale * ratio;
    highlights.push(this.gethighlight(from,to, "blue"));

    from = to;
    to = from + c.sustain * ratio;
    highlights.push(this.gethighlight(from, to, "green"));


    return JSON.stringify(highlights);
  }

  public static getRatio(c: CycleModel, t: number) {
    let ratio: number = 1;

    let total: number = (c.inhale + c.hold + c.exhale + c.sustain) * t ;
    if (total > 0) {
      ratio = 360 / total;
    }
    return ratio;
  }

  private static gethighlight(from: number, to: number, color: string) {
    return {
      "from": Math.round(from),
      "to": Math.round( to),
      "color": color
    };
  }
}
