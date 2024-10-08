//Nom,Date de naissance,Date de mort,Parti,Plus haute fonction exercée,Sexe
export type Role= "Président" | "Premier ministre" | "Ministre" | "Chef de parti" |"Député"

export type Person = {
    name: string;
    birthDate: number;
    party: string;
    highestRole: Role;
    sexe: string; //H or F
    hintType: "quote" | "hint";
    hint: string;
    wikipedia_link: string;
};

export type ColumnName = "name" | "sexe" | "highestRole" | "birthDate" | "party";