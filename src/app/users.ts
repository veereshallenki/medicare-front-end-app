// this class is used to map JSON data from BE
// back end java bean class, front end model class
// variables must be match between FE and BE
// Angular Model class, java entity class and MySQL table must match
export class Users {

    constructor(
        public id: number,
        public name: String,
        public email: String,
        public country: String) { }


}
