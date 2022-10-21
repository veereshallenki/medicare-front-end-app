// this class is used to map JSON data from BE
// back end java bean class, front end model class
// variables must be match between FE and BE
// Angular Model class, java entity class and MySQL table must match

export class Medicines {

    constructor(
        public id:number,
        public name:string,
        public price: number,
        public category:string,
        public enableFlag:string,
        public url:string
    ){}
}
