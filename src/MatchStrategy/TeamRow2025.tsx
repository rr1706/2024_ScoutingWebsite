import { SetStateAction, useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "../Utils/Button";
import { matchDataDTO_2025, TeamAveragesDTO_2025 } from "../Utils/Utils.models";




export default function TeamRow2025(props: teamRowProps) {    

    const redColor = '#ffb3b3'
    const blueColor = '#b3d9ff'



    return (
        <>
            {props.teamAverages ?
                <td className="text-center align-middle" style={{ backgroundColor: props.alliance === 'red' ? redColor : blueColor }}><Button className="btn btn-clear btn-outline-dark" onClick={() => props.teamClick(props.teamAverages?.teamNumber!)} > {props.teamAverages?.teamNumber}</Button>  </td>
                :
                <td className="text-center align-middle" style={{ backgroundColor: props.alliance === 'red' ? redColor : blueColor }}>{props.teamNumber} </td>
            }
            <td className="text-center align-middle" style={{ backgroundColor: props.alliance === 'red' ? redColor : blueColor }}>
                {props.teamAverages?.percentMoblilitize! > 0 ?
                    <Row>
                        <Col className="text-center align-middle" style={{ paddingRight: 0 }} >{props.teamAverages?.percentMoblilitize?.toFixed(1) + '%'}</Col>
                    </Row>
                    :
                    <Row></Row>}

            </td>

            <td className="text-center align-middle" style={{ backgroundColor: props.alliance === 'red' ? redColor : blueColor }}>
                {props.teamAverages?.middleAutoCount! > 0 ?
                    <Row>
                        <Col className='text-end' style={{ paddingRight: 0 }} >{props.teamAverages?.middleCoralAuto?.toFixed(1)}</Col>
                        <Col className='text-start' style={{ fontSize: "10px", paddingLeft: 0, margin: 'auto' }}>({(props.teamAverages?.middleAutoCount!).toFixed(0)})</Col>
                    </Row>
                    :
                    <Row></Row>}
            </td>

            <td className="text-center align-middle" style={{ backgroundColor: props.alliance === 'red' ? redColor : blueColor }}>
                {props.teamAverages?.middleNetAuto! > 0 ?
                    <Row>
                        <Col className='text-end' style={{ paddingRight: 0 }} >{props.teamAverages?.middleNetAuto?.toFixed(1)}</Col>
                        <Col className='text-start' style={{ fontSize: "10px", paddingLeft: 0, margin: 'auto' }}>({(props.teamAverages?.middleNetAuto!).toFixed(0)})</Col>
                    </Row>
                    :
                    <Row></Row>}
            </td>

            <td className="text-center align-middle" style={{ backgroundColor: props.alliance === 'red' ? redColor : blueColor }}>
                {props.teamAverages?.sideAutoCount! > 0 ?
                    <Row>
                        <Col className='text-end' style={{ paddingRight: 0 }} >{props.teamAverages?.sideCoralAuto?.toFixed(1)}</Col>
                        <Col className='text-start' style={{ fontSize: "10px", paddingLeft: 0, margin: 'auto' }}>({(props.teamAverages?.sideAutoCount!).toFixed(0)})</Col>
                    </Row>
                    :
                    <Row></Row>}
            </td>

            <td className="text-center align-middle" style={{ backgroundColor: props.alliance === 'red' ? redColor : blueColor }}>{props.teamAverages?.averageTeleCoral?.toFixed(1)} </td>
            <td className="text-center align-middle" style={{ backgroundColor: props.alliance === 'red' ? redColor : blueColor }}>{props.teamAverages?.averageProcessorAll?.toFixed(1)} </td>
            <td className="text-center align-middle" style={{ backgroundColor: props.alliance === 'red' ? redColor : blueColor }}>{props.teamAverages?.averageBargeAll?.toFixed(1)} </td>
            <td className="text-center align-middle" style={{ backgroundColor: props.alliance === 'red' ? redColor : blueColor }}>
                {props.teamAverages?.successfulDeepClimb! > 0 ?
                    <Row>
                        <Col className='text-end' style={{ paddingRight: 0 }} >{props.teamAverages?.successfulDeepClimb?.toFixed(1) + '%'}</Col>
                        <Col className='text-start' style={{ fontSize: "10px", paddingLeft: 0, margin: 'auto' }}>({(props.teamAverages?.totalDeepClimb).toFixed(0)})</Col>
                    </Row>
                    :
                    <Row></Row>}
            </td>
            <td className="text-center align-middle" style={{ backgroundColor: props.alliance === 'red' ? redColor : blueColor }}>{props.teamAverages?.totalPoints?.toFixed(1)} </td>
        </>
    )
}

interface teamRowProps {
    teamAverages: TeamAveragesDTO_2025,
    teamNumber: string,
    alliance: string,
    teamClick(team: number): void,
}