import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "../Utils/Button";
import { getRank } from "../Utils/HelperFunctions";
import { TeamAveragesDTO_2024 } from "../Utils/Utils.models";




export default function TeamRowPicklist2024(props: teamRowProps) {    
    const blueColor = '#b3d1ff'
    const greenColor = '#c1f1db'
    const yellowColor = '#faf6b7'
    const orangeColor = '#ffd2b3'
    const redColor = '#fdb4be'

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
                <td className="text-center align-middle" style={picked ? { backgroundColor: 'red' } : {}}   ><Button className={picked ? "btn btn-clear" : "btn btn-light"}  onClick={() => props.teamClick(props.team?.teamNumber!)} > {props.team?.teamNumber}</Button></td>
                : <td className="text-center align-middle"    ><Button className="btn btn-light" onClick={() => props.teamClick(props.team?.teamNumber!)} > {props.team?.teamNumber}</Button> </td>}
            <td className="text-center align-middle" style={{ backgroundColor: getColor(props.team?.autoTotalAvg, props.allTeams?.map(x => x.autoTotalAvg), true)! }} >{props.team?.autoTotalAvg?.toFixed(1)}</td>

            <td className="text-center align-middle" style={{ backgroundColor: getColor(props.team?.closeAutoAvg, props.allTeams?.map(x => x.closeAutoAvg), true)! }}>
            <Row>

                {props.team?.closeAutoNum! > 0 ?
                    <>
                        <Col className='text-end' style={{ paddingRight: 0 }} >{props.team?.closeAutoAvg?.toFixed(1)}</Col>
                        <Col className='text-start' style={{ fontSize: "10px", paddingLeft: 0, margin: 'auto' }}>({ props.team?.closeAutoNum!.toFixed(0)})</Col>
                    </>
                    : <Col></Col>
                }
             </Row>
            </td>

            <td className="text-center align-middle" style={{ backgroundColor: getColor(props.team?.centerAutoAvg, props.allTeams?.map(x => x.centerAutoAvg), true)! }}>
                <Row>

                    {props.team?.centerAutoNum! > 0 ?
                        <>
                            <Col className='text-end' style={{ paddingRight: 0 }} >{props.team?.centerAutoAvg?.toFixed(1)}</Col>
                            <Col className='text-start' style={{ fontSize: "10px", paddingLeft: 0, margin: 'auto' }}>({props.team?.centerAutoNum!.toFixed(0)})</Col>
                        </>
                        : <Col></Col>
                    }
                </Row>
            </td>

            <td className="text-center align-middle" style={{ backgroundColor: getColor(props.team?.teleAmpAvg, props.allTeams?.map(x => x.teleAmpAvg), true)! }} >{props.team?.teleAmpAvg?.toFixed(1)}</td>
            <td className="text-center align-middle" style={{ backgroundColor: getColor(props.team?.teleSpeakerAvg, props.allTeams?.map(x => x.teleSpeakerAvg), true)! }} >{props.team?.teleSpeakerAvg?.toFixed(1)}</td>
            <td className="text-center align-middle" style={{ backgroundColor: getColor(props.team?.teleTotalAvg, props.allTeams?.map(x => x.teleTotalAvg), true)! }} >{props.team?.teleTotalAvg?.toFixed(1)}</td>
            <td className="text-center align-middle" style={{ backgroundColor: getColor(props.team?.totalAvg, props.allTeams?.map(x => x.totalAvg), true)! }} >{props.team?.totalAvg?.toFixed(1)}</td>
            <td className="text-center align-middle" style={{ backgroundColor: getColor(props.team?.feedAvg, props.allTeams?.map(x => x.feedAvg), true)! }} >{props.team?.feedAvg?.toFixed(1)}</td>
            <td className="text-center align-middle" style={{ backgroundColor: getColor(props.team?.teleTrapAvg, props.allTeams?.map(x => x.teleTrapAvg), true)! }} >{props.team?.teleTrapAvg?.toFixed(1)}</td>
            <td className="text-center align-middle" style={{ backgroundColor: getColor(props.team?.climbSuccessRate, props.allTeams?.map(x => x.climbSuccessRate), true)! }}>
                <Row>

                    {props.team?.climbSuccessRate! > 0 ?
                        <>
                            <Col className='text-end' style={{ paddingRight: 0 }} >{props.team?.climbSuccessRate?.toFixed(1)}%</Col>
                            <Col className='text-start' style={{ fontSize: "10px", paddingLeft: 0, margin: 'auto' }}>({(props.team?.climbPercent! * props.team?.numMatches! / 100).toFixed(0)})</Col>
                        </>
                        : <Col></Col>
                    }
                </Row>
            </td>


            {props.mode === 'Edit' ? 
                <td className="text-center align-middle"  ><Button className="btn btn-danger btn-block btn-sm" onClick={() => props.dnp(props.team)} > DNP</Button></td>
            :<></>}
            
        </>
    )
}

interface teamRowProps {
    team: TeamAveragesDTO_2024,
    allTeams: TeamAveragesDTO_2024[],
    index: number,
    dnp(team: TeamAveragesDTO_2024): void,
    teamClick(team: number): void,
    mode: string;
}