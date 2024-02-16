import { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { matchDataDTO_2024 } from "../Utils/Utils.models";
import Button from "./Button";
import TeamMatchByMatchTable2024 from "./TeamMatchByMatchTable2024";
import eventContext from "../Contexts/EventContexts";
import axios, { AxiosResponse } from "axios";
import { urlMatchData2024, urlRobotPictures } from "../endpoints";
import { dynamicSort } from "./HelperFunctions";

export default function TeamDetails(props: detailsProps) {
    const MATCHBYMATCH = 'matchByMatch'
    const PICTURE = 'picture'
    const [viewMode, setViewMode] = useState<string>(PICTURE);

    const [matchByMatch, setMatchByMatch] = useState<matchDataDTO_2024[]>([]);
    const [robotPicture, setRobotPicture] = useState<string>('');

    const { eventCode } = useContext(eventContext);

    useEffect(() => {
        getTeamMatchByMatch();
        getRobotPicture()
    }, [props.teamNumber]);

    function getTeamMatchByMatch() {
        axios.get(`${urlMatchData2024}/getbyteam`, {
            params: {
                eventID: eventCode,
                teamNumber: props.teamNumber
            },
        })
            .then((response: AxiosResponse<matchDataDTO_2024[]>) => {
                let matchByMatch = response.data.sort(dynamicSort("matchNumber", false));
                setMatchByMatch(matchByMatch);
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

    return (
        <>
            <Row className='mb-3'>
                <Col className="text-center align-middle">
                    <Button className="btn btn-primary btn-block mt-3 " onClick={() => setViewMode(MATCHBYMATCH)} > View Match By Match Data</Button>
                </Col>
                <Col className="text-center align-middle">
                    <Button className="btn btn-primary btn-block mt-3 " onClick={() => setViewMode(PICTURE)} > View Picture</Button>
                </Col>

            </Row>
            {(() => {
                switch (viewMode) {
                    case MATCHBYMATCH:
                        return <TeamMatchByMatchTable2024 matchData={matchByMatch} /> 
                    case PICTURE:
                        return <div className="text-center"><img className="img-fluid" src={robotPicture} style={{ maxHeight: '400px' }} alt="" /></div>
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