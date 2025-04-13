import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "../Utils/Button";
import { getRank } from "../Utils/HelperFunctions";
import { TeamAveragesDTO_2025 } from "../Utils/Utils.models";




export default function TeamRowPicklist2025(props: teamRowProps) {    
    const top10 = '#24d685'
    const top25 = '#bef7dd'
    const top50 = '#faf6b7'
    const top75 = '#ffd2b3'
    const botom25 = '#fdb4be'
    const DNPRed = '#cc0000'

    const [picked, setPicked] = useState<boolean>(false);

    useEffect(() => {
        setPicked(false);
        // console.log(props.allTeams)
    }, [props.mode]);

    function getColor(value: any, allValues: any[], descending: boolean) {
        let rank: number | undefined
        rank = getRank(value, allValues, descending);
        if (rank) {
            let percentile = (rank / allValues.length)
            if (percentile <= .10) {
                return top10
            } else if (percentile <= .25) {
                return top25
            } else if (percentile <= .5) {
                return top50
            } else if (percentile <= .75) {
                return top75
            } else {
                return botom25
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
                    {picked ? <Button className="btn btn-primary btn-block btn-sm" onClick={() => setPicked(false)} > Undo</Button>
                        :
                        <Button className="btn btn-primary btn-block btn-sm" onClick={() => setPicked(true)} > Picked</Button>
                    }
                </td>
                : <></>}
            <td className="text-center align-middle"  >{props.index} </td>

            {props.mode === 'AllianceSelection' ?
                <td className="text-center align-middle" style={picked ? { backgroundColor: 'red' } : {}}   ><Button className={picked ? "btn btn-clear" : "btn btn-light"}  onClick={() => props.teamClick(props.team?.teamNumber!)} > {props.team?.teamNumber}</Button></td>
                : <td className="text-center align-middle" style={{ backgroundColor: getTeamDNP() }}    ><Button className="btn btn-light" onClick={() => props.teamClick(props.team?.teamNumber!)} > {props.team?.teamNumber}</Button> </td>}


            <td className="text-center align-middle" style={{ backgroundColor: getColor(props.team?.sideCoralAuto, props.allTeams?.map(x => x.sideCoralAuto), true)! }}>
                <Row>

                    {props.team?.sideAutoCount! > 0 ?
                        <>
                            <Col className='text-end' style={{ paddingRight: 0 }} >{props.team?.sideCoralAuto?.toFixed(1)}</Col>
                            <Col className='text-start' style={{ fontSize: "10px", paddingLeft: 0, margin: 'auto' }}>({(props.team?.sideAutoCount!).toFixed(0)})</Col>
                        </>
                        : <Col></Col>
                    }
                </Row>
            </td>

            <td className="text-center align-middle" style={{ backgroundColor: getColor(props.team?.middleCoralAuto, props.allTeams?.map(x => x.middleCoralAuto), true)! }}>
                <Row>

                    {props.team?.middleAutoCount! > 0 ?
                        <>
                            <Col className='text-end' style={{ paddingRight: 0 }} >{props.team?.middleCoralAuto?.toFixed(1)}</Col>
                            <Col className='text-start' style={{ fontSize: "10px", paddingLeft: 0, margin: 'auto' }}>({(props.team?.middleAutoCount!).toFixed(0)})</Col>
                        </>
                        : <Col></Col>
                    }
                </Row>
            </td>

            <td className="text-center align-middle" style={{ backgroundColor: getColor(props.team?.middleNetAuto, props.allTeams?.map(x => x.middleNetAuto), true)! }}>
                <Row>

                    {props.team?.middleAutoCount! > 0 ?
                        <>
                            <Col className='text-end' style={{ paddingRight: 0 }} >{props.team?.middleNetAuto?.toFixed(1)}</Col>
                            <Col className='text-start' style={{ fontSize: "10px", paddingLeft: 0, margin: 'auto' }}>({(props.team?.middleAutoCount!).toFixed(0)})</Col>
                        </>
                        : <Col></Col>
                    }
                </Row>
            </td>


            <td className="text-center align-middle" style={{ backgroundColor: getColor(props.team?.averageTeleCoral, props.allTeams?.map(x => x.averageTeleCoral), true)! }}>{props.team?.averageTeleCoral?.toFixed(1)}</td>
            <td className="text-center align-middle" style={{ backgroundColor: getColor(props.team?.averageBargeAll, props.allTeams?.map(x => x.averageBargeAll), true)! }}>{props.team?.averageBargeAll?.toFixed(1)}</td>
            <td className="text-center align-middle" style={{ backgroundColor: getColor(props.team?.averageProcessorAll, props.allTeams?.map(x => x.averageProcessorAll), true)! }} >{props.team?.averageProcessorAll?.toFixed(1)}</td>
            <td className="text-center align-middle" style={{ backgroundColor: getColor(props.team?.totalTeleScore, props.allTeams?.map(x => x.totalTeleScore), true)! }} >{props.team?.totalTeleScore?.toFixed(1)}</td>
            <td className="text-center align-middle" style={{ backgroundColor: getColor(props.team?.totalTeleAdjusted, props.allTeams?.map(x => x.totalTeleAdjusted), true)! }} >{props.team?.totalTeleAdjusted?.toFixed(1)}</td>

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