import { useContext, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "../Utils/Button";
import LoadSchedule from "./LoadSchedule";
import NewEvent from "./NewEvent";
import LoadRobotPictures from "./LoadRobotPictures";
import LoadPicklist from "./LoadPicklist";
import eventContext from "../Contexts/EventContexts";
import axios from "axios";
import { useAlert } from "react-bootstrap-hooks-alert";
import {urlTeamAverages2024 } from "../endpoints";


export default function EventSetup() {
    const NEWEVENT = 'newEvent'
    const LOADSCHEDULE = 'schedule'
    const LOADPICTURES = 'pictures'
    const LOADPICKLIST = 'picklist'
    const [viewMode, setViewMode] = useState<string>("");

    const { eventCode, updateEvent } = useContext(eventContext);
    const { danger, success } = useAlert();

    async function reCalculate() {
            axios.get(`${urlTeamAverages2024}/calculateAverages/`, {
                params: {
                    eventID: eventCode
                },
            }).then(() => {
                success("Successfully Recalculated Averages");
            })

    }

    return (<>
        <div className="container w-75" >
            <Row className='mb-3'>
                <Col className="text-center align-middle">
                    <Button className="btn btn-primary btn-block mt-3 " onClick={() => setViewMode(NEWEVENT)} > New Event</Button>
                </Col>
                <Col className="text-center align-middle">
                    <Button className="btn btn-primary btn-block mt-3 " onClick={() => setViewMode(LOADSCHEDULE)} > Load Schedule</Button>
                </Col>
                <Col className="text-center align-middle">
                    <Button className="btn btn-primary btn-block mt-3 " onClick={() => setViewMode(LOADPICTURES)} > Load Robot Pictures</Button>
                </Col>
                <Col className="text-center align-middle">
                    <Button className="btn btn-primary btn-block mt-3 " onClick={() => setViewMode(LOADPICKLIST)} > Load Picklist</Button>
                </Col>
                <Col className="text-center align-middle">
                    <Button className="btn btn-primary btn-block mt-3 " onClick={reCalculate} > Re-calculate</Button>
                </Col>

            </Row>
            <hr></hr>
            {(() => {
                switch (viewMode) {
                    case NEWEVENT:
                        return <NewEvent />
                    case LOADSCHEDULE:
                        return <LoadSchedule />
                    case LOADPICTURES:
                        return <LoadRobotPictures />
                    case LOADPICKLIST:
                        return <LoadPicklist />
                    default:
                        return null
                }
            })()}
        </div>
    </>)
}