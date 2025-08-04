import axios from "axios";
import { useContext, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useAlert } from "react-bootstrap-hooks-alert";
import eventContext from "../Contexts/EventContexts";
import { urlTBA } from "../endpoints";
import Button from "../Utils/Button";


export default function LoadSchedule() {

    const { eventCode, updateEvent } = useContext(eventContext);
    const { danger, success } = useAlert();

    async function loadFromTBA() {

        await axios.get(`${urlTBA}/getTeamNames`,
            {
            params: {
                eventID: eventCode
            },
        }).then(() => {
            success("Successfully Uploaded Team Names");
        })
    }



    return (<>
        <h4 className="text-center align-middle RRBlue">Load Team Names</h4>

            <Row><Button className="btn btn-primary btn-block" onClick={loadFromTBA} >Load From The Blue Alliance</Button></Row>
            <hr/>
            <Row className='mt-3'>
            </Row>
    </>)
}