import { SetStateAction, useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { TeamAveragesDTO } from "../MatchStrategy/MatchStrategy.model";
import Button from "../Utils/Button";
import { getRank } from "../Utils/HelperFunctions";




export default function TeamRowPicklist(props: teamRowProps) {    

    const blueColor = '#88F7E2'
    const greenColor = '#2ab676'
    const yellowColor = '#F5EB67'
    const orangeColor = '#FFA15C'
    const redColor = '#FA233E'

    const [picked, setPicked] = useState<boolean>(false);

    useEffect(() => {
        setPicked(false);
    }, [props.mode]);

    function getColor(value: any, allValues: any[], descending: boolean) {
        let rank: number | undefined
        rank = getRank(value, allValues, descending);
        if (rank) {
            let percentile = (rank / allValues.length)
            if (percentile <= .10) {
                return blueColor
            } else if (percentile <= .25) {
                return greenColor
            } else if (percentile <= .5) {
                return yellowColor
            } else if (percentile <= .75) {
                return orangeColor
            } else {
                return redColor
            }
        } else {
            return '#FFFFFF'
        }

    }


    return (
        <>
            {props.mode === 'AllianceSelection' ?
                <td className="text-center align-middle"  >
                    {picked ? <Button className="btn btn-primary btn-block btn-sm" onClick={() => setPicked(false)} > undo</Button>
                        :
                        <Button className="btn btn-primary btn-block btn-sm" onClick={() => setPicked(true)} > Picked</Button>
                    }
                </td>
                : <></>}
            <td className="text-center align-middle"  >{props.index} </td>

            {props.mode === 'AllianceSelection' ?
                <td className="text-center align-middle" style={picked ? { backgroundColor: 'red' } : {} }   >{props.team?.teamNumber}</td>
                : <td className="text-center align-middle"    ><Button className="btn btn-light" onClick={() => props.teamClick(props.team?.teamNumber)} > {props.team?.teamNumber}</Button> </td>}

            <td className="text-center align-middle" style={{backgroundColor: getColor(props.team?.autoFlatAvg, props.allTeams?.map(x => x.autoFlatAvg), true)! }} >
                <Row>
                    <Col className='text-end' style={{ paddingRight: 0 }} >{props.team?.autoFlatAvg?.toFixed(1)}</Col>
                    {props.team?.autoFlatAttempts > 0 ?
                         <Col className='text-start' style={{ fontSize: "10px", paddingLeft: 0, margin: 'auto' }}>({props.team?.autoFlatAttempts})</Col>
                        : <Col></Col>
                    } 
                </Row>
            </td>
            <td className="text-center align-middle" style={{ backgroundColor: getColor(props.team?.autoBumpAvg, props.allTeams?.map(x => x.autoBumpAvg), true)! }}>
                <Row>
                    <Col className='text-end' style={{ paddingRight: 0 }} >{props.team?.autoBumpAvg?.toFixed(1)}</Col>
                    {props.team?.autoBumpAttempts > 0 ?
                        <Col className='text-start' style={{ fontSize: "10px", paddingLeft: 0, margin: 'auto' }}>({props.team?.autoBumpAttempts})</Col>
                        : <Col></Col>
                    } 
                </Row>
            </td>
            <td className="text-center align-middle" style={{ backgroundColor: getColor(props.team?.autoMiddleAvg, props.allTeams?.map(x => x.autoMiddleAvg), true)! }} >
                <Row>
                    <Col className='text-end' style={{ paddingRight: 0 }} >{props.team?.autoMiddleAvg?.toFixed(1)}</Col>
                    {props.team?.autoMiddleAttempts > 0 ?
                        <Col className='text-start' style={{ fontSize: "10px", paddingLeft: 0, margin: 'auto' }}>({props.team?.autoMiddleAttempts})</Col>
                        : <Col></Col>
                    } 
                </Row>
            </td>
            <td className="text-center align-middle" style={{ backgroundColor: getColor(props.team?.autoMiddleEngage, props.allTeams?.map(x => x.autoMiddleEngage), true)! }}>
                <Row>
                    
                    {props.team?.autoMiddleAttempts > 0 ?
                        <>
                            <Col className='text-end' style={{ paddingRight: 0 }} >{props.team?.autoMiddleEngage?.toFixed(1)}%</Col>
                            <Col className='text-start' style={{ fontSize: "10px", paddingLeft: 0, margin: 'auto' }}>({props.team?.autoMiddleAttempts})</Col>
                        </>
                        : <Col></Col>
                    } 
                </Row>
            </td>
            <td className="text-center align-middle" style={{ backgroundColor: getColor(props.team?.totalTeleAvg, props.allTeams?.map(x => x.totalTeleAvg), true)! }} >{props.team?.totalTeleAvg?.toFixed(1)}</td>
            {props.mode === 'Edit' ? 
                <td className="text-center align-middle"  ><Button className="btn btn-danger btn-block btn-sm" onClick={() => props.dnp(props.team)} > DNP</Button></td>
            :<></>}
            
        </>
    )
}

interface teamRowProps {
    team: TeamAveragesDTO,
    allTeams: TeamAveragesDTO[],
    index: number,
    dnp(team: TeamAveragesDTO): void,
    teamClick(team: number): void,
    mode: string;
}