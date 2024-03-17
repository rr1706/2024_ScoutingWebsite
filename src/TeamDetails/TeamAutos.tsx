import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "../Utils/Button";
import { matchDataDTO_2024 } from "../Utils/Utils.models";

export default function TeamAutos(props: autoProps) {
    const [matchIndex, setMatchIndex] = useState<number>(0);

    return (
        <>
            <Row className='mb-3'>
                <Col className="text-center align-middle">
                    {matchIndex > 0 ? 
                        <Button className="btn btn-secondary btn-sm btn-block mt-3 " onClick={() => setMatchIndex(matchIndex - 1)} > Previous Match</Button>
                        : <></>}
                </Col>
                <Col className="text-center align-middle mt-3"><div>Match Number: {props.matchData[matchIndex].matchNumber}</div></Col>
                <Col className="text-center align-middle">
                    {matchIndex < props.matchData.length-1 ?
                        <Button className="btn btn-secondary btn-sm btn-block mt-3 " onClick={() => setMatchIndex(matchIndex + 1)} > Next Match</Button>
                        : <></>}
                </Col>
            </Row>

            <div>{props.matchData[matchIndex].autoPreload}</div>


        </>
    )
}
interface autoProps {
    matchData: matchDataDTO_2024[];
}