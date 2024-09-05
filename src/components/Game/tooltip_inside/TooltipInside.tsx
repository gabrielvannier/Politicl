import React from "react";
import { ColumnName } from "../../../utils/types";
import { RoleTooltipInside } from "./RoleTooltipInside";
import { PartyTooltipInside } from "./PartyTooltipInside";
import { BirthDateTooltipInside } from "./BirthDateTooltipInside";

type TooltipInsideProps = {
    guessedValue: string | number;
    expectedValue: string | number;
    displayedColumn: ColumnName;
}

export function TooltipInside({ guessedValue, expectedValue, displayedColumn }: TooltipInsideProps) {
    if (displayedColumn === "highestRole") {
        return <RoleTooltipInside guessRole={guessedValue as any} expectedRole={expectedValue as any} />;
    }
    if (displayedColumn === "party") {
        return <PartyTooltipInside guessedParty={guessedValue as string} expectedParty={expectedValue as string} />;
    }
    if (displayedColumn === "birthDate") {
        return <BirthDateTooltipInside guessedBirthDate={guessedValue as number} expectedBirthDate={expectedValue as number} />;
    }
    return <span/>;
}