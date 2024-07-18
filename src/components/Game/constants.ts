import { ColulmnName } from "./types";

export const MAX_NUMBER_OF_TRY = 6;

export const partyRightnessScore = {
"Parti Communiste Français" : 0,
"La France Insoumise" : 2,
"Europe Écologie Les Verts" : 2,
"Parti Socialiste" : 4,
"Union des Démocrates pour la République" : 4,

"La République En Marche !" : 6,

"Union pour la Défense de la République" : 6,

"Les Républicains" : 8,
"Union pour un Mouvement Populaire" : 8,
"Rassemblement pour la République" : 8,
"Union pour la Nouvelle République" : 8,


"Debout la France" : 9,
"Rassemblement National" : 10,
"Les Patriotes" : 10,

}

export const partyTraduction: Record<ColulmnName, string> = {
    "name":"Nom",
    "sexe":"Genre",
    "highestRole":"Plus haute fonction",
    "birthDate":"Date de naissance",
    "party":"Parti politique"
}
