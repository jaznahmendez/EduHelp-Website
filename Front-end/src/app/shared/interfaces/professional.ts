export interface Professional {
    name: String;
    profession?: String;
    email: String;
    password: String;
    telefono: String;
    token?: String;
    active?: Boolean;
    location?: String;
    link?: String;
    patients?: Array<String>;
}