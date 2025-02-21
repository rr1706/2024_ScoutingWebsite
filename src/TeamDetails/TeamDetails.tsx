import { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { matchDataDTO_2025 } from "../Utils/Utils.models";
import Button from "../Utils/Button";
import TeamMatchByMatchTable2025 from "./TeamMatchByMatchTable2025";
import eventContext from "../Contexts/EventContexts";
import axios, { AxiosResponse } from "axios";
import { urlMatchData2025, urlRobotPictures, urlMatchData, urlTeamAverages2025, urlSuperScout2025 } from "../endpoints";
import { dynamicSort } from "../Utils/HelperFunctions";
import TeamAutos from "./TeamAutos";
import RobotGraph from "./RobotGraph";
import TeamNotesTable2025 from "./TeamNotesTable2025";
import { SuperScoutDataDTO } from "../SuperScoutData/SuperScoutData.model";

export default function TeamDetails(props: detailsProps) {
    const MATCHBYMATCH = 'matchByMatch'
    const PICTURE = 'picture'
/*    const AUTOS = 'autos'*/
    const GRAPHS = 'graphs'
    const NOTES = 'notes'
    const [viewMode, setViewMode] = useState<string>(PICTURE);
    const [matchByMatch, setMatchByMatch] = useState<matchDataDTO_2025[]>([]);
    const [superScoutData, setSuperScoutData] = useState<SuperScoutDataDTO[]>([]);
    const [robotPicture, setRobotPicture] = useState<string>('');

    const { eventCode } = useContext(eventContext);

    useEffect(() => {
        getTeamMatchByMatch();
        getSuperScoutData();
        getRobotPicture()
    }, [props.teamNumber]);

    function getTeamMatchByMatch() {
        axios.get(`${urlMatchData2025}/getbyteam`, {
            params: {
                eventID: eventCode,
                teamNumber: props.teamNumber
            },
        })
            .then((response: AxiosResponse<matchDataDTO_2025[]>) => {
                let matchByMatch = response.data.sort(dynamicSort("matchNumber", false));
                setMatchByMatch(matchByMatch);
            })
    }
    function getSuperScoutData() {
        axios.get(`${urlSuperScout2025}/getbyteam`, {
            params: {
                eventID: eventCode,
                teamNumber: props.teamNumber
            },
        })
            .then((response: AxiosResponse<SuperScoutDataDTO[]>) => {
                let superScoutData = response.data.sort(dynamicSort("matchNumber", false));
                setSuperScoutData(superScoutData);
            })
    }

    function getRobotPicture() {
        axios.get(`${urlRobotPictures}`, {
            params: {
                eventCode: eventCode,
                teamNumber: props.teamNumber
            },
        })
            .then((response: AxiosResponse<string>) => {
                setRobotPicture(response.data);
            })
    }

    async function toggleIgnoreMatch(match: matchDataDTO_2025) {
        if (match.ignore === 0) {
            match.ignore = 1;
        } else {
            match.ignore = 0;
        }
        await axios.post(`${urlMatchData2025}/sendignore/${match.id}/${match.ignore}` ).then(() => {
            getTeamMatchByMatch();

            axios.get(`${urlTeamAverages2025}/calculateAverages/`, {
                params: {
                    eventID: eventCode
                }
            })
        })  
    }

    return (
        <>
            <Row className='mb-3'>
                <Col className="text-center align-middle">
                    <Button className="btn btn-primary btn-block mt-3 " onClick={() => setViewMode(MATCHBYMATCH)} > View Match By Match Data</Button>
                </Col>
                <Col className="text-center align-middle">
                    <Button className="btn btn-primary btn-block mt-3 " onClick={() => setViewMode(NOTES)} > View Scout Notes</Button>
                </Col>
                {/*<Col className="text-center align-middle">*/}
                {/*    <Button className="btn btn-primary btn-block mt-3 " onClick={() => setViewMode(AUTOS)} > View Autos</Button>*/}
                {/*</Col>*/}
                <Col className="text-center align-middle">
                    <Button className="btn btn-primary btn-block mt-3 " onClick={() => setViewMode(PICTURE)} > View Picture</Button>
                </Col>
                <Col className="text-center align-middle">
                    <Button className="btn btn-primary btn-block mt-3 " onClick={() => setViewMode(GRAPHS)} > View Graphs</Button>
                </Col>

            </Row>
            <hr></hr>
            {(() => {
                switch (viewMode) {
                    case MATCHBYMATCH:
                        return <TeamMatchByMatchTable2025 matchData={matchByMatch} ignore={toggleIgnoreMatch}  /> 
                    case PICTURE:
                        return <div className="text-center"><img className="img-fluid" src={robotPicture} style={{ maxHeight: '400px' }} alt="" /></div>
                    //case AUTOS:
                    //    return <TeamAutos matchData={matchByMatch}></TeamAutos>
                    //case GRAPHS:
                    //    return <RobotGraph matchData={matchByMatch}></RobotGraph>
                    case NOTES:
                        return <TeamNotesTable2025 matchData={matchByMatch} superScout={superScoutData}  />
                    default:
                        return null
                }
            })()}
        </>
    )
}
interface detailsProps {
    teamNumber: number;
}