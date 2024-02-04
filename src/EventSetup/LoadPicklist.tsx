import axios from "axios";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useAlert } from "react-bootstrap-hooks-alert";
import { urlPicklist } from "../endpoints";
import Button from "../Utils/Button";
import { TeamAveragesDTO_2024 } from "../Utils/Utils.models";
import { utils } from 'xlsx';
import FileSelect from "../Utils/FileSelect";
import EventSelector from "../Utils/EventSelector";
import { PicklistOrderDTO } from "../Picklist/Picklist.model";


export default function LoadPicklist() {
    const [selectedFile, setSelectedFile] = useState<File>();

    const { danger, success } = useAlert();

    async function uploadSchedule() {
        try {
            if (selectedFile) {
                var XLSX = require("xlsx");

                const data = await selectedFile!.arrayBuffer();
                const workbook = XLSX.read(data);
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData: TeamAveragesDTO_2024[] = utils.sheet_to_json<TeamAveragesDTO_2024>(worksheet);

                let newOrder: PicklistOrderDTO[] = [];
                jsonData.forEach((team) => {
                    let newTeam: PicklistOrderDTO = {
                        id: 1,
                        teamNumber: team.teamNumber!,
                        eventCode: team.eventCode!,
                        order: (jsonData.indexOf(team) + 1)
                    }
                    newOrder.push(newTeam);
                });
                await axios.post(`${urlPicklist}/save`, newOrder).then(() => {
                    success("Successfully Loaded Picklist")
                })

            } else {
                danger("Please select file");
            }
        }
        catch (error: any) {
            danger(error.response.data)
        }
    }

    return (<>
        <h4 className="text-center align-middle RRBlue">Load Picklist</h4>

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
            <Row><Button className="btn btn-primary btn-block" onClick={uploadSchedule} >Upload Picklist</Button></Row>
    </>)
}