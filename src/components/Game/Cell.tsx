import React from "react";
import { ColulmnName } from "./types";
import { Advice } from "./Advice";
import {partyRightnessScore, partyTraduction } from "./constants";
import { color } from "@mui/system";
import { text } from "stream/consumers";
type cellProps = {
    value: string | number | undefined;
    expectedValue: string | number;
    displayedColumn: ColulmnName;
    displayOrder: number;
}
const communDefaultStyle = {
    border: "1px solid black",
    margin: "5px",
    borderRadius: "10px",
    fontSize: "20px",
    lineHeight: "50px",
    display: "inline-block"
}
const columnStyle = {
    "name": {
        width: "300px",
    },
    "sexe": {
        width: "70px",
    },
    "highestRole": {
        width: "200px",
    },
    "birthDate": {
        width: "100px",
    },
    "party": {
        width: "400px",
    }
}

function ColumnHeadline({ displayedColumn }: { displayedColumn: ColulmnName }) {
    const defaultStyle = {
        ...columnStyle[displayedColumn],
        lineHeight: "15px",
        display: "inline-block",
        fontSize: "16px",
        //border: "1px solid black",
        margin: "5px",
        //textAlign: "left",
    }
    return <p style={defaultStyle}>{partyTraduction[displayedColumn]} :</p>
}

export function ColumnHeadlines() {
    return <div className="Column-headlines">
        <ColumnHeadline displayedColumn="sexe" />
        <ColumnHeadline displayedColumn="highestRole" />
        <ColumnHeadline displayedColumn="party" />
        <ColumnHeadline displayedColumn="birthDate" />
        <ColumnHeadline displayedColumn="name" />
    </div>
}


export function Cell({ value, expectedValue, displayedColumn, displayOrder }: cellProps) {

    const [shouldDisplay, setShouldDisplay] = React.useState(false);
    React.useEffect(() => {
        if (value === undefined) {
            return;
        }
        setTimeout(() => setShouldDisplay(true), 700 * displayOrder - 650);
    }, [value]);

    const defaultStyle = {
        ...communDefaultStyle,
        ...columnStyle[displayedColumn]
    }
    if (value === undefined || shouldDisplay === false) {
        const emptyStyle = {
            ...defaultStyle,
            background: "#dcdcdc",
            color: "#dcdcdc",
            opacity: "0.5",
            //disable display
        }
        return <span className="Cell-empty" style={emptyStyle}>.</span>
    }
    const isCorrect = value === expectedValue;

    if (isCorrect) {
        const correctStyle = {
            ...defaultStyle,
            background: "#8df38d",
            color: "#000000",
            opacity: shouldDisplay ? "1" : "0",
        }
        return <span className="Cell-correct" style={correctStyle}>{value}
            <Advice value={value} expectedValue={expectedValue} displayedColumn={displayedColumn} />
        </span>
    }
    const incorrectStyle = {
        ...defaultStyle,
        background: "#da7373",
        color: "#ffffff",
        opacity: shouldDisplay ? "1" : "0",
    }
    if (displayedColumn === 'party'){
        if (partyRightnessScore[value as keyof typeof partyRightnessScore] === partyRightnessScore[expectedValue as keyof typeof partyRightnessScore]){
            incorrectStyle.background = "#f5d142";
            incorrectStyle.color = "#000000";
        }}

    return <span className="Cell-incorrect" style={incorrectStyle}>{value}
        <Advice value={value} expectedValue={expectedValue} displayedColumn={displayedColumn} />
    </span>
}