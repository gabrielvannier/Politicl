//Nom,Date de naissance,Date de mort,Parti,Plus haute fonction exercée,Sexe
export type Person = {
    name: string;
    birthDate: string; //format YYYY-MM-DD
    deathDate: string | null; //format YYYY-MM-DD
    party: string;
    highestRole: string;
    sexe: string; //M or F
};

