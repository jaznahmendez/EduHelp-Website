export interface Patient {
    name: String;
    tutorId: String;
    email: String;
    password: String;
    age?: Number;
    gender?: String;
    pastProfessionals?: Array<String>;
    currentProfessionals?: Array<String>;
    tutorDescription?: String;
}
