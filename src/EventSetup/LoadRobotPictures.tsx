import axios from "axios";
import { useContext, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useAlert } from "react-bootstrap-hooks-alert";
import eventContext from "../Contexts/EventContexts";
import {  urlRobotPictures } from "../endpoints";
import Button from "../Utils/Button";
import EventSelector from "../Utils/EventSelector";
import FileSelectMultiple from "../Utils/FileSelectMultiple";


export default function LoadRobotPictures() {

    const { eventCode, updateEvent } = useContext(eventContext);

    const [selectedFiles, setSelectedfiles] = useState<File[]>();

    const { danger, success } = useAlert();

    async function upLoadPictures() {
        try {
            if (selectedFiles) {
                for (var file of selectedFiles) {
                    const formData = new FormData();
                    formData.append('photo', file);

                    await axios({
                        method: 'post',
                        url: `${urlRobotPictures}/${eventCode}`,
                        data: formData,
                        headers: { 'Content-Type': 'multipart/form-data' }
                    });
                }
                success("Successfully Uploaded Picture(s)")
            } else {
                danger("Please select file(s)")
            }
        }
        catch (error: any) {
            danger(error.response.data)
        }
    }
    async function deletePictures() {
        try {
            axios.delete(`${urlRobotPictures}/${eventCode}`)
                .then(response => {
                    success("Successfully Deleted Picture(s)")
                })
            }
        catch (error: any) {
            danger(error.response.data)
        }
    }

    return (<>
        <h4 className="text-center align-middle RRBlue">Load Robot Pictures</h4>

            <Row className='mt-3'>
                <Col className='col-md-auto mt-1'><h5>Select Event: </h5></Col>
                <Col>
                    <EventSelector ></EventSelector>
                </Col>
                <Col className='col-md-auto mt-1'><h5>Select Pictures: </h5></Col>
                <Col>
                    <FileSelectMultiple onSelect={setSelectedfiles}></FileSelectMultiple> 
                </Col>
            </Row>
        <Row><Button className="btn btn-primary btn-block" onClick={upLoadPictures} >Load Pictures</Button></Row>
        <Row><Button className="btn btn-danger btn-block mt-3" onClick={deletePictures} >Delete Pictures</Button></Row>
    </>)
}