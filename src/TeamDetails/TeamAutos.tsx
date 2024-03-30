import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "../Utils/Button";
import { matchDataDTO_2024 } from "../Utils/Utils.models";

export default function TeamAutos(props: autoProps) {
    const [matchIndex, setMatchIndex] = useState<number>(0);

    function makeOrMiss(result: string) {
        if (result === "Make") {
            return "/greenO.png"
        } else if (result === "Miss") {
            return "/redO.png"
        } else {
            return "/greyO.png"
        }
    }

    function ignoreZero(order: number) {
        if (order > 0) {
            return order
        } else {
            return ''
        }
    }

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

            <div className="parent">
                <img src="/field.jpg" className="img-fluid, fieldImg" alt="" />
                <img src={makeOrMiss(props.matchData[matchIndex].autoClose1!)} className="img-fluid, autoClose1" alt="" />
                <img src={makeOrMiss(props.matchData[matchIndex].autoClose2!)} className="img-fluid, autoClose2" alt="" />
                <img src={makeOrMiss(props.matchData[matchIndex].autoClose3!)} className="img-fluid, autoClose3" alt="" />
                <img src={makeOrMiss(props.matchData[matchIndex].autoCenter1!)} className="img-fluid, autoCenter1" alt="" />
                <img src={makeOrMiss(props.matchData[matchIndex].autoCenter2!)} className="img-fluid, autoCenter2" alt="" />
                <img src={makeOrMiss(props.matchData[matchIndex].autoCenter3!)} className="img-fluid, autoCenter3" alt="" />
                <img src={makeOrMiss(props.matchData[matchIndex].autoCenter4!)} className="img-fluid, autoCenter4" alt="" />
                <img src={makeOrMiss(props.matchData[matchIndex].autoCenter5!)} className="img-fluid, autoCenter5" alt="" />
                <img src={makeOrMiss(props.matchData[matchIndex].autoPreload!)} className="img-fluid, autoPreloaded" alt="" />
                <div className="autoClose1Order">{ignoreZero(props.matchData[matchIndex].autoClose1Order!)}</div>
                <div className="autoClose2Order">{ignoreZero(props.matchData[matchIndex].autoClose2Order!)}</div>
                <div className="autoClose3Order">{ignoreZero(props.matchData[matchIndex].autoClose3Order!)}</div>
                <div className="autoCenter1Order">{ignoreZero(props.matchData[matchIndex].autoCenter1Order!)}</div>
                <div className="autoCenter2Order">{ignoreZero(props.matchData[matchIndex].autoCenter2Order!)}</div>
                <div className="autoCenter3Order">{ignoreZero(props.matchData[matchIndex].autoCenter3Order!)}</div>
                <div className="autoCenter4Order">{ignoreZero(props.matchData[matchIndex].autoCenter4Order!)}</div>
                <div className="autoCenter5Order">{ignoreZero(props.matchData[matchIndex].autoCenter5Order!)}</div>
            </div>


        </>
    )
}
interface autoProps {
    matchData: matchDataDTO_2024[];
}