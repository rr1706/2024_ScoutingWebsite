import { SetStateAction, useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "../Utils/Button";
import { matchDataDTO_2024, TeamAveragesDTO_2024 } from "../Utils/Utils.models";




export default function TeamRow2024(props: teamRowProps) {    

    const redColor = '#ffb3b3'
    const blueColor = '#b3d9ff'



    return (
        <>
            {props.teamAverages ?
                <td className="text-center align-middle" style={{ backgroundColor: props.alliance === 'red' ? redColor : blueColor }}><Button className="btn btn-clear btn-outline-dark" onClick={() => props.teamClick(props.teamAverages?.teamNumber!)} > {props.teamAverages?.teamNumber}</Button>  </td>
                :
                <td className="text-center align-middle" style={{ backgroundColor: props.alliance === 'red' ? redColor : blueColor }}>{props.teamNumber} </td>
            }
            <td className="text-center align-middle" style={{ backgroundColor: props.alliance === 'red' ? redColor : blueColor }}>{props.teamAverages?.autoSpeakerAvg?.toFixed(1)} </td>
            <td className="text-center align-middle" style={{ backgroundColor: props.alliance === 'red' ? redColor : blueColor }}>
                {props.teamAverages?.closeAutoNum! > 0 ?
                    <Row>
                        <Col className='text-end' style={{ paddingRight: 0 }} >{props.teamAverages?.closeAutoAvg?.toFixed(1)}</Col>
                        <Col className='text-start' style={{ fontSize: "10px", paddingLeft: 0, margin: 'auto' }}>({(props.teamAverages?.closeAutoNum!).toFixed(0)})</Col>
                    </Row>
                    :
                    <Row></Row>}

            </td>
            <td className="text-center align-middle" style={{ backgroundColor: props.alliance === 'red' ? redColor : blueColor }}>{props.teamAverages?.teleAmpAvg?.toFixed(1)} </td>
            <td className="text-center align-middle" style={{ backgroundColor: props.alliance === 'red' ? redColor : blueColor }}>{props.teamAverages?.teleSpeakerAvg?.toFixed(1)} </td>
            <td className="text-center align-middle" style={{ backgroundColor: props.alliance === 'red' ? redColor : blueColor }}>{props.teamAverages?.teleTrapAvg?.toFixed(1)} </td>
            <td className="text-center align-middle" style={{ backgroundColor: props.alliance === 'red' ? redColor : blueColor }}>{props.teamAverages?.teleTotalAvg?.toFixed(1)} </td>
            <td className="text-center align-middle" style={{ backgroundColor: props.alliance === 'red' ? redColor : blueColor }}>
                {props.teamAverages?.climbSuccessRate! > 0 ?
                    <Row>
                        <Col className='text-end' style={{ paddingRight: 0 }} >{props.teamAverages?.climbSuccessRate?.toFixed(1) + '%'}</Col>
                        <Col className='text-start' style={{ fontSize: "10px", paddingLeft: 0, margin: 'auto' }}>({(props.teamAverages?.climbPercent! * props.teamAverages?.numMatches! / 100).toFixed(0)})</Col>
                    </Row>
                    :
                    <Row></Row>}

            </td>
            <td className="text-center align-middle" style={{ backgroundColor: props.alliance === 'red' ? redColor : blueColor }}>{props.teamAverages?.totalPoints?.toFixed(1)} </td>
        </>
    )
}

interface teamRowProps {
    teamAverages: TeamAveragesDTO_2024,
    teamNumber: string,
    alliance: string,
    teamClick(team: number): void,
}