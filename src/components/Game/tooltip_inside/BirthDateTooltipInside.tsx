import React from "react";

type birthDateTooltipInsideProps = {
    guessedBirthDate: number;
    expectedBirthDate: number;
    };

export function BirthDateTooltipInside({ guessedBirthDate, expectedBirthDate }: birthDateTooltipInsideProps) {
    if (guessedBirthDate === expectedBirthDate) {
        return <span>né en {guessedBirthDate}</span>;
    }
    if (guessedBirthDate > expectedBirthDate) {
        return <span>né avant {guessedBirthDate}</span>;
    }
    return <span>né après {guessedBirthDate}</span>;

}