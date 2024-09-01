//Nom,Date de naissance,Date de mort,Parti,Plus haute fonction exercée,Sexe

export type Person = {
    name: string;
    birthDate: number;
    party: string;
    highestRole: string;
    sexe: string; //H or F
    hintType: "quote" | "hint";
    hint: string | null;
};

export type ColulmnName = "name" | "sexe" | "highestRole" | "birthDate" | "party";