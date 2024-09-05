import React from "react";
import { getRoleAvice } from "./Advice";
import { roleHierarchy } from "../../utils/constants";
import { Role } from "../../utils/types";

const shouldBeBold = (guessRole: Role, diplayedRole: Role, advice: "⬆️" | "⬇️") => {
  if (guessRole === diplayedRole) {
    return false;
  }
  if (advice === "⬆️" && roleHierarchy[guessRole] < roleHierarchy[diplayedRole]) {
    return true;
  }
  if (advice === "⬇️" && roleHierarchy[guessRole] > roleHierarchy[diplayedRole]) {
    return true;
  }
  return false;
};

export function RoleAdviceTooltip({
  guessRole,
  expectedRole,
}: {
guessRole: Role;
  expectedRole: Role;
}) {
  const adviceArrow = getRoleAvice(guessRole, expectedRole);
  if (adviceArrow === "✅") {
    return <span>Le personne recherchée est un {guessRole}</span>;
  }
  const roleList: Role[] = Object.keys(roleHierarchy) as Role[];
  return (
    <ul
      style={{
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {roleList.map((mappedRole, idx) => {
        return (
          <span
            style={{
              fontWeight: shouldBeBold(guessRole, mappedRole, adviceArrow)
                ? "bold"
                : "",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            key={idx}
          >
            <span>{mappedRole}</span>
            {idx<roleList.length -1 && <span>{adviceArrow}</span>}
          </span>
        );
      })}
    </ul>
  );
}
