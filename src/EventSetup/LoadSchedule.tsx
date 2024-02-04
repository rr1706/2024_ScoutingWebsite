import axios from "axios";
import { useContext, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useAlert } from "react-bootstrap-hooks-alert";
import eventContext from "../Contexts/EventContexts";
import { urlEvent } from "../endpoints";
import Button from "../Utils/Button";
import {MatchDTO } from "../Utils/Utils.models";
import { utils } from 'xlsx';
import FileSelect from "../Utils/FileSelect";
import EventSelector from "../Utils/EventSelector";


export default function LoadSchedule() {

    const { eventCode, updateEvent } = useContext(eventContext);
    const [selectedFile, setSelectedFile] = useState<File>();

    const { danger, success } = useAlert();

    async function uploadSchedule() {
        if (selectedFile) {
            var XLSX = require("xlsx");

            const data = await selectedFile!.arrayBuffer();
            const workbook = XLSX.read(data);
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData: MatchDTO[] = utils.sheet_to_json<MatchDTO>(worksheet);

            jsonData.forEach(x => {
                x.eventCode = eventCode;
            })

            await axios.post(`${urlEvent}/saveschedule`, jsonData).then(() => {
                success("Successfully Uploaded Schedule");
            })
        } else {
            danger("Please select file");
        }
    }

    return (<>
        <h4 className="text-center align-middle RRBlue">Load Match Schedule</h4>

            <Row className='mt-3'>
                <Col className='col-md-auto mt-1'><h5>Select Event: </h5></Col>
                <Col>
                    <EventSelector ></EventSelector>
                </Col>
                <Col className='col-md-auto mt-1'><h5>Select Excel: </h5></Col>
                <Col>
                    <FileSelect onSelect={setSelectedFile}></FileSelect> 
                </Col>
            </Row>
            <Row><Button className="btn btn-primary btn-block" onClick={uploadSchedule} >Upload Schedule</Button></Row>
    </>)
}