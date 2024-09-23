import axios from "axios";
import { useContext, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useAlert } from "react-bootstrap-hooks-alert";
import eventContext from "../Contexts/EventContexts";
import { urlEvent } from "../endpoints";
import Button from "../Utils/Button";
import { EventDTO } from "../Utils/Utils.models";


export default function NewEvent() {
    const [newEventCode, setNewEventCode] = useState<string>('');
    const [newEventName, setNewEventName] = useState<string>('');

    const { eventCode, updateEvent } = useContext(eventContext);

    const { danger, success } = useAlert();

    
    async function createEvent() {
        if (newEventCode !== '' && newEventName !== '') {
            let dto: EventDTO = {
                eventCode: newEventCode,
                eventName: newEventName
            }

            await axios.post(`${urlEvent}/saveevent`, dto).then(() => {
                success("Successfully Added Event")
                updateEvent(newEventCode);
            })
        } else {
            danger("Event Code and Event Name cannot be blank")
        }
    }
    

    return (<>
        <h4 className="text-center align-middle RRBlue">New Event</h4>
            <Row className='mt-3' >
                <Col className='col-md-auto mt-1'><h5>Code: </h5></Col>
                <Col>
                    <Form.Control type="string" placeholder="Enter Event Code" value={newEventCode} onChange={(e) => setNewEventCode(e.target.value) } />
                </Col>
                <Col className='col-md-auto mt-1'><h5>Name:</h5></Col>
                <Col>
                    <Form.Control type="string" placeholder="Enter Event Name" value={newEventName} onChange={(e) => setNewEventName(e.target.value)} />
                </Col>      
            </Row>
        <Row className='mt-3'><Button className="btn btn-primary btn-block" onClick={createEvent} >Save Event</Button></Row>
    </>)
}