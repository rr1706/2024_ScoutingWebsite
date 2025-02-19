import axios from "axios";
import { useContext, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useAlert } from "react-bootstrap-hooks-alert";
import eventContext from "../Contexts/EventContexts";
import { urlEvent2025 } from "../endpoints";
import Button from "../Utils/Button";
import { EventDTO } from "../Utils/Utils.models";


export default function NewEvent() {
    const [newEventCode, setNewEventCode] = useState<string>('');
    const [newEventName, setNewEventName] = useState<string>('');
    const [newTBACode, setNewTBACode] = useState<string>('');
    const [newYear, setNewYear] = useState<number | undefined>();

    const { eventCode, updateEvent } = useContext(eventContext);

    const { danger, success } = useAlert();

    
    async function createEvent() {
        if (newEventCode !== '' && newEventName !== '' && newTBACode !== '' && newYear !== undefined && newYear > 2000) {
            let dto: EventDTO = {
                eventCode: newEventCode,
                eventName: newEventName,
                year: newYear,
                tbaCode: newTBACode
            }
            await axios.post(`${urlEvent2025}/saveevent`, dto).then(() => {
                success("Successfully Added Event")
                updateEvent(newEventCode);
            })
        } else {
            danger("Must populate all fields")
        }
    }
    

    return (<>
        <h4 className="text-center align-middle RRBlue">New Event</h4>
            <Row className='mt-3' >
                <Col className='col-md-auto mt-1'><h5>Code: </h5></Col>
                <Col>
                    <Form.Control type="string" placeholder="Event Code" value={newEventCode} onChange={(e) => setNewEventCode(e.target.value) } />
                </Col>
                <Col className='col-md-auto mt-1'><h5>Name:</h5></Col>
                <Col>
                    <Form.Control type="string" placeholder="Event Name" value={newEventName} onChange={(e) => setNewEventName(e.target.value)} />
            </Col>   
        </Row>
        <Row className='mt-3'>
            <Col className='col-md-auto mt-1'><h5>Year: </h5></Col>
            <Col>
                <Form.Control type="number" placeholder="Event Year" value={newYear} onChange={(e) => setNewYear(parseInt(e.target.value))} />
            </Col>
            <Col className='col-md-auto mt-1'><h5>TBA Code:</h5></Col>
            <Col>
                <Form.Control type="string" placeholder="TBA Code" value={newTBACode} onChange={(e) => setNewTBACode(e.target.value)} />
            </Col>    
        </Row>
        <Row className='mt-3'><Button className="btn btn-primary btn-block" onClick={createEvent} >Save Event</Button></Row>
    </>)
}