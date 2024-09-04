import React from "react";

export function ContributePage() {

    const boldStyle = {
        fontWeight: "bold",
    }
    return (
    <div>
      <h1 style={{textAlign:'center'}}>🤝 Contribuer</h1>
      <ul>
        <li style={{marginTop:'50px'}}>1️⃣ envoie un email à <span style={boldStyle}>contact@politicl.fr</span> </li>
        <li style={{marginTop:'30px'}}>2️⃣ <span style={boldStyle}>précice l'objet du mail.</span> par exemple : "proposition d'idée" ou "ajout dans le jeu de donnée"</li>
        <li style={{marginTop:'30px'}}>3️⃣ <span style={boldStyle}>explique plus en détail.</span>  par exemple : "tu pourrais ajouter un compteur pour chaque jour ou un joueur réussi Politicl" </li>
      </ul>

      <h2 style={{marginTop:'70px',textAlign:'center'}}>Merci pour ta contribution ! 🥰</h2>
    </div>
  );
}