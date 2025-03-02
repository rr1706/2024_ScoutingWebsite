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
    }, [eventCode]);

    return (
        <>
            <div style={{ width: '80%', margin: '0 auto', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <h3 style={{ textAlign: 'center', color: '#224195', marginBottom: '20px' }}>Prediction Leaderboard</h3>
                <Table bordered hover style={{ backgroundColor: 'white' }}>
                    <thead>
                        <tr style={{ fontWeight: 'bold', backgroundColor: '#e9ecef' }}>
                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>Scout</td>
                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>Score</td>
                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>Number of Matches</td>
                        </tr>
                    </thead>
                    <tbody>
                        {predictions?.map((item, index) => (
                            <tr key={index}>
                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{item.scoutName}</td>
                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{item.score}</td>
                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{item.numberMatches}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    )
}
