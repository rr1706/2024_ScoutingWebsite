import {Accordion, Button, Col, Form, Row} from "react-bootstrap";
import DropDown from "../Utils/DropDown";
import { useContext, useEffect, useState } from "react";
import { TeamAveragesDTO_2024, formItem, matchDataDTO_2024 } from "../Utils/Utils.models";
import eventContext from "../Contexts/EventContexts";




export default function SuperScoutData() {

    const [type, setType] = useState<string>("Match");

    const { eventCode, updateEvent } = useContext(eventContext);

    const dropDownOptions: formItem[] = [
        { id: "Match", name: "Match" },
        { id: "Pit", name: "Pit" },
        { id: "Pratice", name: "Practice" }]

    useEffect(() => {
    }, [eventCode]);


   
    

    return (<>
            <div className="container w-100 w-md-75">
            <h4 className="text-center align-middle RRBlue">Super Scout Data</h4>
                <Row className='mt-3'>
                    <Col xs={12} md='auto' className='mt-1'>
                        <h5>Type:</h5>
                    </Col>
                    <Col xs={12} md>
                    <DropDown
                            DefaultOption={" " }
                            Options={dropDownOptions}
                            selectedOption={type}
                            selectOptions={setType}
                        />
                </Col>
                </Row>
                <Row className='mt-3'>
                    <Col xs={12} md='auto' className='mt-1'>
                        <h5>Team Number:</h5>
                    </Col>
                    <Col xs={12} md>
                        <Form.Control type="number" placeholder="Enter Team Number" onChange={() => { }} />
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col xs={12} md='auto' className='mt-1'>
                        <h5>Scout Name:</h5>
                    </Col>
                    <Col xs={12} md>
                        <Form.Control type="string" placeholder="Enter Scout Name" onChange={() => { }} />
                    </Col>
            </Row>
            {type !== "Pit" ? 
                <Row className='mt-3'>
                    <Col xs={12} md='auto' className='mt-1'>
                        <h5>Match Number:</h5>
                    </Col>
                    <Col xs={12} md>
                        <Form.Control type="number" placeholder="Enter Team Number" onChange={() => { }} />
                    </Col>
                </Row>
        
            : <></>}

                <Row className='mt-3'>
                    <Col xs={12} md='auto' className='mt-1'>
                        <h5>Comments:</h5>
                    </Col>
                    <Col xs={12} md>
                        <Form.Control as="textarea" rows={4} placeholder="Comments" onChange={() => { }} />
                    </Col>
                </Row>

                <Row className='mt-3'>
                    <Col xs={12}>
                        <Button className="btn btn-primary btn-block" onClick={() => { }}>Save</Button>
                    </Col>
                </Row>
            </div>

    </>)
}