import React from "react";

export function ReportPage() {

    const boldStyle = {
        fontWeight: "bold",
    }
    return (
    <div>
      <h1 style={{textAlign:'center'}}>👮‍♂️ signaler une erreur</h1>
      <ul>
        <li style={{marginTop:'50px'}}>1️⃣ envoie un email à <span style={boldStyle}>contact@politicl.fr</span> </li>
        <li style={{marginTop:'30px'}}>2️⃣ <span style={boldStyle}>précice l'objet du mail.</span> par exemple : "erreur dans le jeu de donnée" ou "bug avec le code"</li>
        <li style={{marginTop:'30px'}}>3️⃣ <span style={boldStyle}>explique plus en détail.</span>  par exemple : "François Fillon n'est pas né en 1964 mais en 1954" </li>
      </ul>

      <h2 style={{marginTop:'70px',textAlign:'center'}}>Merci pour ton signalement !</h2>
    </div>
  );
}