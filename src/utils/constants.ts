import { ColulmnName, Role } from "./types";

export const MAX_NUMBER_OF_TRY = 6;

export const MIN_GUESS_BEFORE_HINT = 3;
export const partyRightnessScore = {
    "Parti Communiste Français": 1,

    "La France Insoumise": 2,
    "Europe Écologie Les Verts": 2,
    "Picardie debout !": 2,
    
    "Parti Socialiste": 4,
    "Union des Démocrates pour la République": 4,

    "La République En Marche !": 6,
    "Horizons": 6,
    "Renaissance": 6,
    "Union pour la Démocratie Française": 6,
    "Union pour la Défense de la République": 6,

    "Les Républicains": 8,
    "Union pour un Mouvement Populaire": 8,
    "Rassemblement pour la République": 8,
    "Union pour la Nouvelle République": 8,


    "Debout la France": 9,
    "Rassemblement National": 10,
    "Reconquête": 10,
    "Les Patriotes": 10,

}

export const partyTraduction: Record<ColulmnName, string> = {
    "name": "Nom",
    "sexe": "Genre",
    "highestRole": "Plus haute fonction",
    "birthDate": "Date de naissance",
    "party": "Parti politique"
}

export const roleHierarchy: Record<Role, number> = {
    "Président": 5,
    "Premier ministre": 4,
    "Ministre": 3,
    "Chef de parti": 2,
    "Député": 1
}

export const winningTitle: string = "🎉🇫🇷 Félicitiations 🇫🇷🎉"

export const winningDescription: string = "Tu as trouvé le politicl #"

export const failedTitle: string = "😢 Dommage 😢"

export const failedDescription: string = "Il s'agissait du politcl #"

export const guideTitle: string = "📄 Règles"

export const guideDescription: string[] = [
    "Tu as 6 essais pour deviner la personnalité politique du jour.",
    "Les émoticons te donnent des indications sur la personne à deviner",
    "⬆️⬇️ : La personne à deviner est plus jeune / plus vieille",
    "⬅️➡️ : La personne à deviner est plus à gauche / plus à droite"]

export const blue = "#2b4e7a";
export const white = "#FFFFFF";
export const red = "#FF0000";
export const confettiColors = [blue, white, red];




// Birthdate advice
const olderAdviceText = "la personne recherchée est après ";
const youngerAdviceText = "la personne recherchée est avant ";
const sameAgeAdviceText = "la personne recherchée est né en  ";