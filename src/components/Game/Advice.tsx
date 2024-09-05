import React, {useState,useEffect} from "react";
import { partyRightnessScore, roleHierarchy } from "../../utils/constants";
import { ColumnName, Role } from "../../utils/types";
import { useIsMobile } from "../../utils/utils";

const getBirthDateAdvice = (birthdate: number, ecpectedBirthDate: number) => {
    if (birthdate === ecpectedBirthDate) {
        return "✅";
    }
    if (birthdate < ecpectedBirthDate) {
        return "⬆️";
    }
    return "⬇️";

}
const getPartyAdvice = (party: string, expectedParty: string) => {
    const rightnessScore = partyRightnessScore[party as keyof typeof partyRightnessScore] || undefined;
    const expectedRightnessScore = partyRightnessScore[expectedParty as keyof typeof partyRightnessScore] || undefined;
    if (rightnessScore === undefined || expectedRightnessScore === undefined) {
        return "";
    }
    if (rightnessScore === expectedRightnessScore) {
        if (party === expectedParty) {
            return "✅";
        }
        return "🟰";
    }
    if (rightnessScore < expectedRightnessScore) {
        return "➡️";
    }
    return "⬅️";
}

export const getRoleAvice = (guessRole: Role, expectedRole: Role) => {
    if (guessRole === expectedRole) {
        return "✅";
    }
    if (roleHierarchy[guessRole] > roleHierarchy[expectedRole]) {
        return "⬇️";
    }
    return "⬆️";
}

export const getAdviceText = (displayedColumn: ColumnName, value: string | number, expectedValue: string | number) => {
    if (displayedColumn === "birthDate" && typeof value === "number" && typeof expectedValue === "number") {
        return getBirthDateAdvice(value, expectedValue);
    }
    if (displayedColumn === "party" && typeof value === "string" && typeof expectedValue === "string") {
        return getPartyAdvice(value, expectedValue);
    }
    if (displayedColumn === "highestRole") {
        return getRoleAvice(value as Role, expectedValue as Role);
    }
    if (value === expectedValue) {
        return "✅";
    }
    return "❌";
}

type adviceProps = {
    value: string | number;
    expectedValue: string | number;
    displayedColumn: ColumnName;
}
export function Advice({ value, expectedValue, displayedColumn }: adviceProps) {

    const isMobile = useIsMobile();
    const [scale, setScale] = useState(2);
    useEffect(() => {
        //setScale(2);
        setTimeout(
            () => setScale(1.3), 
            100 /* 100ms == 0.1s */
        );
    }, [ setScale]);
    

    const advice= getAdviceText(displayedColumn, value, expectedValue)
    if (advice === "") {
        return <span className="Advice-empty"></span>
    }

    const desktopStyle = {
        transform: `scale(${scale})`,
        display: "inline-block",
        marginLeft: "10px",
        fontSize: "30px",
        verticalAlign: "middle",
      };

    const mobileStyle: React.CSSProperties = {
      transform: `scale(${scale})`,
      display: "block",
      fontSize: "20px",
    };

    return <span className="Advice" style={isMobile? mobileStyle : desktopStyle}>{advice}</span>
}