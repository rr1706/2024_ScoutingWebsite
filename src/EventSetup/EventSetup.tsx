import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "../Utils/Button";
import LoadSchedule from "./LoadSchedule";
import NewEvent from "./NewEvent";
import LoadRobotPictures from "./LoadRobotPictures";
import LoadPicklist from "./LoadPicklist";


export default function EventSetup() {
    const NEWEVENT = 'newEvent'
    const LOADSCHEDULE = 'schedule'
    const LOADPICTURES = 'pictures'
    const LOADPICKLIST = 'picklist'
    const [viewMode, setViewMode] = useState<string>("");

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