import axios from "axios";
import { useContext, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useAlert } from "react-bootstrap-hooks-alert";
import eventContext from "../Contexts/EventContexts";
import { urlMatchData2025, urlTeamAverages2025 } from "../endpoints";
import Button from "../Utils/Button";
import FileSelect from "../Utils/FileSelect";
import EventSelector from "../Utils/EventSelector";
import { matchDataDTO_2025 } from "../Utils/Utils.models";


export default function MatchDataImport() {

    const { eventCode, updateEvent } = useContext(eventContext);
    const [selectedFile, setSelectedFile] = useState<File>();

    const { danger, success } = useAlert();

    async function importData() {
        try {
            if (selectedFile) {
                var XLSX = require("xlsx");

                const data = await selectedFile!.arrayBuffer();
                const workbook = XLSX.read(data);
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const newMatches: matchDataDTO_2025[] = XLSX.utils.sheet_to_json(worksheet);

                newMatches.map(match => {
                    match.eventCode = eventCode;
                    return match;
                });
                //console.log(newMatches)


                await axios.post(`${urlMatchData2025}/savedata`, newMatches).then(() => {
                    axios.get(`${urlTeamAverages2025}/calculateAverages/`, {
                        params: {
                            eventID: eventCode
                        },
                    }).then(() => {
                        success("Successfully Imported Match Data");
                    })

                })
            } else {
                danger("Please select file");
            }
        }
        catch (error: any) {
            // console.log(error)
            danger(error.response.data)
        }
    }

    return (<>
        <div className="container w-75" >
            <h4 className="text-center align-middle RRBlue">Import Match Data</h4>

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
            <Row><Button className="btn btn-primary btn-block" onClick={importData} >Import Data</Button></Row>
        </div>
    </>)
}