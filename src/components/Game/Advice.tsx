import React, {useState,useEffect} from "react";
import { partyRightnessScore } from "../../utils/constants";
import { ColulmnName } from "../../utils/types";

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

export const getAdviceText = (displayedColumn: ColulmnName, value: string | number, expectedValue: string | number) => {
    if (displayedColumn === "birthDate" && typeof value === "number" && typeof expectedValue === "number") {
        return getBirthDateAdvice(value, expectedValue);
    }
    if (displayedColumn === "party" && typeof value === "string" && typeof expectedValue === "string") {
        return getPartyAdvice(value, expectedValue);
    }
    if (value === expectedValue) {
        return "✅";
    }
    return "❌";
}

type adviceProps = {
    value: string | number;
    expectedValue: string | number;
    displayedColumn: ColulmnName;
}
export function Advice({ value, expectedValue, displayedColumn }: adviceProps) {

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

    const style = {
        transform: `scale(${scale})`,
        display: "inline-block",
        marginLeft: "10px",
        fontSize: "30px",
        verticalAlign: "middle",
      };

    return <span className="Advice" style={style}>{advice}</span>
}