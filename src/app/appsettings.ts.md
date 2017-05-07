import {AngularFireOffline, AfoListObservable, AfoObjectObservable} from 'angularfire2-offline';
// AfoObjectObservable , AfoListObservable  < any[] >
import {ProgramModel} from "./models/program-model";

export class AppSettings {

        public username : String = "Halil";

        public programs : AfoListObservable < ProgramModel[] >;
        public userPrograms : AfoListObservable < ProgramModel[] >;

        constructor(private afo : AngularFireOffline) {

                this.programs = this
                        .afo
                        .database
                        .list('/Breath/Programs/System');
                this.userPrograms = this
                        .afo
                        .database
                        .list('/Breath/Programs/User');

                // this.getPrograms(); this.getUserPrograms();
        }

        getProgram(path, key) : AfoObjectObservable < ProgramModel > {
                let result: AfoObjectObservable < ProgramModel >;
                result = this
                        .afo
                        .database
                        .object('/Breath/Programs/' + path + '/' + key);
                return result;
        }

        public addCycle(path, key)
        {
                let result : AfoListObservable < ProgramModel[] >;
                result = this
                        .afo
                        .database
                        .list('/Breath/Programs/' + path + '/' + key + '/items');
                result.push(ProgramModel.createProgramItem());

        }

        getPrograms()
        {
                // this.sPrograms = this.afo.database.list('/Breath/Programs/System');
                /*   this.programs = [];
                this
                        .programs
                        .push(new ProgramModel("Easy"));
                this
                        .programs
                        .push(new ProgramModel("Normal"));
                this
                        .programs
                        .push(new ProgramModel("Hard"));
                this
                        .programs
                        .push(new ProgramModel("Crazy"));

                this
                        .sPrograms
                        .set(this.programs);
                        */

        }

        getUserPrograms()
        {
                /*
                this.userPrograms = [];
                this
                        .userPrograms
                        .push(new ProgramModel("User Defined Program 1"));
                this
                        .userPrograms
                        .push(new ProgramModel("Weekend Program"));
                this
                        .userPrograms
                        .push(new ProgramModel("Noon Program"));
                this
                        .uPrograms
                        .set(this.userPrograms);
                        */

        }

        public addNewUserProgram()
        {
                this
                        .userPrograms
                        .push(new ProgramModel("New User Program"));

        }

}