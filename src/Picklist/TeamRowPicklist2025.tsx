import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "../Utils/Button";
import { getRank } from "../Utils/HelperFunctions";
import { TeamAveragesDTO_2025 } from "../Utils/Utils.models";




export default function TeamRowPicklist2025(props: teamRowProps) {    
    const blueColor = '#b3d1ff'
    const greenColor = '#c1f1db'
    const yellowColor = '#faf6b7'
    const orangeColor = '#ffd2b3'
    const redColor = '#fdb4be'
    const DNPRed = '#cc0000'

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

    function getTeamDNP()
    {
        if (props.team.isDNPed === 1)
        {
            return DNPRed;
        }
        else
        {
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
                : <td className="text-center align-middle" style={{ backgroundColor: getTeamDNP() }}    ><Button className="btn btn-light" onClick={() => props.teamClick(props.team?.teamNumber!)} > {props.team?.teamNumber}</Button> </td>}
            <td className="text-center align-middle" style={{ backgroundColor: getColor(props.team?.averageAutoCoral, props.allTeams?.map(x => x.averageAutoCoral), true)! }} >{props.team?.averageAutoCoral?.toFixed(1)}</td>
            <td className="text-center align-middle" style={{ backgroundColor: getColor(props.team?.averageTeleCoral, props.allTeams?.map(x => x.averageTeleCoral), true)! }}>{props.team?.averageTeleCoral?.toFixed(1)}</td>
            <td className="text-center align-middle" style={{ backgroundColor: getColor(props.team?.averageBargeAll, props.allTeams?.map(x => x.averageBargeAll), true)! }}>{props.team?.averageBargeAll?.toFixed(1)}</td>
            <td className="text-center align-middle" style={{ backgroundColor: getColor(props.team?.averageProcessorAll, props.allTeams?.map(x => x.averageProcessorAll), true)! }} >{props.team?.averageProcessorAll?.toFixed(1)}</td>
            <td className="text-center align-middle" style={{ backgroundColor: getColor(props.team?.successfulShallowClimb, props.allTeams?.map(x => x.successfulShallowClimb), true)! }}>
                <Row>

                    {props.team?.successfulShallowClimb! > 0 ?
                        <>
                            <Col className='text-end' style={{ paddingRight: 0 }} >{props.team?.successfulShallowClimb?.toFixed(1)}%</Col>
                            <Col className='text-start' style={{ fontSize: "10px", paddingLeft: 0, margin: 'auto' }}>({(props.team?.totalShallowClimb).toFixed(0)})</Col>
                        </>
                        : <Col></Col>
                    }
                </Row>
            </td>
            <td className="text-center align-middle" style={{ backgroundColor: getColor(props.team?.successfulDeepClimb, props.allTeams?.map(x => x.successfulDeepClimb), true)! }}>
                <Row>

                    {props.team?.successfulDeepClimb! > 0 ?
                        <>
                            <Col className='text-end' style={{ paddingRight: 0 }} >{props.team?.successfulDeepClimb?.toFixed(1)}%</Col>
                            <Col className='text-start' style={{ fontSize: "10px", paddingLeft: 0, margin: 'auto' }}>({(props.team?.totalDeepClimb).toFixed(0)})</Col>
                        </>
                        : <Col></Col>
                    }
                </Row>
            </td>
            {props.mode === 'Edit' ? 
                <td className="text-center align-middle"  ><Button className="btn btn-danger btn-block btn-sm" onClick={() => props.dnp(props.team)} >
                    {props.team.isDNPed === 1 ? "unDNP" : "DNP" }
                </Button></td>
            :<></>}
            
        </>
    )
}

interface teamRowProps {
    team: TeamAveragesDTO_2025,
    allTeams: TeamAveragesDTO_2025[],
    index: number,
    dnp(team: TeamAveragesDTO_2025): void,
    teamClick(team: number): void,
    mode: string;
}