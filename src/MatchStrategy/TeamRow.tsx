import { SetStateAction, useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { TeamAveragesDTO } from "./MatchStrategy.model";




export default function TeamRow(props: teamRowProps) {    

    const redColor = '#ff5050'
    const blueColor = '#3399ff'



    return (
        <>
            <td className="text-center align-middle" style={{ backgroundColor: props.alliance === 'red' ? redColor : blueColor }}><b>{props.teamAverages?.teamNumber}</b> </td>
            <td className="text-center align-middle" style={{ backgroundColor: props.alliance === 'red' ? redColor : blueColor }} >
                <Row>
                    <Col className='text-end' style={{ paddingRight: 0 }} >{props.teamAverages?.autoFlatAvg?.toFixed(1)}</Col>
                    {props.teamAverages?.autoFlatAttempts > 0 ?
                         <Col className='text-start' style={{ fontSize: "10px", paddingLeft: 0, margin: 'auto' }}>({props.teamAverages?.autoFlatAttempts})</Col>
                        : <Col></Col>
                    } 
                </Row>
            </td>
            <td className="text-center align-middle" style={{ backgroundColor: props.alliance === 'red' ? redColor : blueColor }}>
                <Row>
                    <Col className='text-end' style={{ paddingRight: 0 }} >{props.teamAverages?.autoBumpAvg?.toFixed(1)}</Col>
                    {props.teamAverages?.autoBumpAttempts > 0 ?
                        <Col className='text-start' style={{ fontSize: "10px", paddingLeft: 0, margin: 'auto' }}>({props.teamAverages?.autoBumpAttempts})</Col>
                        : <Col></Col>
                    } 
                </Row>
            </td>
            <td className="text-center align-middle" style={{ backgroundColor: props.alliance === 'red' ? redColor : blueColor }}>
                <Row>
                    <Col className='text-end' style={{ paddingRight: 0 }} >{props.teamAverages?.autoMiddleAvg?.toFixed(1)}</Col>
                    {props.teamAverages?.autoMiddleAttempts > 0 ?
                        <Col className='text-start' style={{ fontSize: "10px", paddingLeft: 0, margin: 'auto' }}>({props.teamAverages?.autoMiddleAttempts})</Col>
                        : <Col></Col>
                    } 
                </Row>
            </td>
            <td className="text-center align-middle" style={{ backgroundColor: props.alliance === 'red' ? redColor : blueColor }}>
                <Row>
                    
                    {props.teamAverages?.autoMiddleAttempts > 0 ?
                        <>
                            <Col className='text-end' style={{ paddingRight: 0 }} >{props.teamAverages?.autoMiddleEngage?.toFixed(1)}%</Col>
                            <Col className='text-start' style={{ fontSize: "10px", paddingLeft: 0, margin: 'auto' }}>({props.teamAverages?.autoMiddleAttempts})</Col>
                        </>

                        : <Col></Col>
                    } 
                </Row>
            </td>
            <td className="text-center align-middle" style={{ backgroundColor: props.alliance === 'red' ? redColor : blueColor }}>{props.teamAverages?.totalTeleAvg?.toFixed(1)}</td>
        </>
    )
}

interface teamRowProps {
    teamAverages: TeamAveragesDTO,
    alliance: string,
}