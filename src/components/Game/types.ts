//Nom,Date de naissance,Date de mort,Parti,Plus haute fonction exercée,Sexe
export type Person = {
    name: string;
    birthDate: number;
    deathDate: number | null;
    party: string;
    highestRole: string;
    sexe: string; //M or F
};

export type ColulmnName = "name" | "sexe" | "highestRole" | "birthDate" | "party";
