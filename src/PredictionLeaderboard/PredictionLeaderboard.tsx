import { useContext, useEffect, useState } from "react";
import { urlDataValidation2025 } from "../endpoints";
import axios, { AxiosResponse } from "axios";
import { matchDataDTO_2024 } from "../Utils/Utils.models";
import eventContext from "../Contexts/EventContexts";
import { PredictionsDTO } from "./Predictions.model";
import { Table, Button } from "react-bootstrap";
import TeamRowPicklist2025 from "../Picklist/TeamRowPicklist2025";

export default function PredictionLeaderboard() {
    const [predictions, setPredictions] = useState<PredictionsDTO[] | null>(null);
    const { eventCode, updateEvent } = useContext(eventContext);

    useEffect(() => {
        axios.get(`${urlDataValidation2025}/getPredictionStandings`, {
            params: {
                eventID: eventCode
            },
        })
            .then((response: AxiosResponse<PredictionsDTO[]>) => {
                setPredictions(response.data);
            })
    },[] );


    return (
        <>
            <div className="container w-80" >
                <h3 className="text-center align-middle RRBlue">Prediction Leaderboard</h3>
                <Table bordered hover>
                    <thead>
                        <tr className="font-weight-bold">
                            <td className="text-center align-middle">Scout</td>
                            <td className="text-center align-middle">Score</td>
                            <td className="text-center align-middle">Number of Matches</td>
                         
                        </tr>
                    </thead>
                    <tbody>
                        {predictions?.map((item, index) => (
                            <tr key={index} >
                                <td className="text-center align-middle">{item.scoutName}</td>
                                <td className="text-center align-middle">{item.score}</td>
                                <td className="text-center align-middle">{item.numberMatches}</td>
                             </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    )
}


