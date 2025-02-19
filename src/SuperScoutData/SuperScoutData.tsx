import { Accordion, Button, Col, Form, Row } from "react-bootstrap";
import DropDown from "../Utils/DropDown";
import { useContext, useEffect, useState } from "react";
import { formItem } from "../Utils/Utils.models";
import eventContext from "../Contexts/EventContexts";
import { useAlert } from "react-bootstrap-hooks-alert";
import { urlEvent, urlSuperScout2025 } from "../endpoints";
import axios from "axios";
import { SuperScoutDataDTO } from "./SuperScoutData.model";

export default function SuperScoutData() {
    const [type, setType] = useState<string>("Match");
    const [matchNumber, setMatchNumber] = useState<number>();
    const [teamNumber, setTeamNumber] = useState<number | undefined>();
    const [scoutName, setScoutName] = useState<string>("");
    const [comments, setComments] = useState<string>("");
    const { eventCode, updateEvent } = useContext(eventContext);

    const { danger, success } = useAlert();

    const dropDownOptions: formItem[] = [
        { id: "Match", name: "Match" },
        { id: "Pit", name: "Pit" },
        { id: "Practice", name: "Practice" },
        { id: "Prescouting", name: "Prescouting" }
    ];

    useEffect(() => { }, [eventCode]);

    async function saveData() {
        if (validateData()) {
            const data: SuperScoutDataDTO = {
                type: type,
                matchNumber: matchNumber,
                teamNumber: teamNumber!,
                scoutName: scoutName,
                comments: comments,
                eventCode: eventCode,
            };
            console.log(data);
            await axios.post(`${urlSuperScout2025}/savedata`, data).then(() => {
                success("Successfully Saved Data");
                if (type === "Match" || type === "Practice") {
                    setMatchNumber(matchNumber! + 1);
                }
                setTeamNumber(0);
                setComments("");
            })
        }
    }

    function validateData() {
        let isValid = true;

        if (type === "") {
            isValid = false;
            danger("Please select a type");
        } else if ((type === "Match" || type === "Practice") && (matchNumber === undefined || matchNumber < 1 || matchNumber === null)) {
            isValid = false;
            danger("Please enter a valid match number");
        } else if (teamNumber === undefined || teamNumber < 1 || teamNumber === null) {
            isValid = false;
            danger("Please enter a valid team number");
        } else if (scoutName === "") {
            isValid = false;
            danger("Please enter a scout name");
        } else if (comments === "") {
            isValid = false;
            danger("Please enter comments");
        }
        return isValid;
    }

    return (
        <>
            <div className="container w-100 w-md-75 p-3">
                <h4 className="text-center align-middle RRBlue mb-4">SuperScout</h4>
                <Row className="mb-3">
                    <Col xs={12} md={3} className="d-flex align-items-center">
                        <h5 className="mb-0">Type:</h5>
                    </Col>
                    <Col xs={12} md={3} className="d-flex align-items-center">
                        <DropDown
                            DefaultOption={"Select Type"}
                            Options={dropDownOptions}
                            selectedOption={type}
                            selectOptions={setType}
                        />
                    </Col>
                    {type === "Match" || type === "Practice" ? (
                        <>
                            <Col xs={12} md={3} className="d-flex align-items-center">
                                <h5 className="mb-0">Match Number:</h5>
                            </Col>
                            <Col xs={12} md={3}>
                                <Form.Control
                                    type="number"
                                    value={matchNumber}
                                    placeholder="Enter Match Number"
                                    onChange={(e) => setMatchNumber(e.target.value ? parseInt(e.target.value) : undefined)}
                                />
                            </Col>
                        </>
                    ) : null}
                </Row>
                <Row className="mb-3">
                    <Col xs={12} md={3} className="d-flex align-items-center">
                        <h5 className="mb-0">Team Number:</h5>
                    </Col>
                    <Col xs={12} md={3}>
                        <Form.Control
                            type="number"
                            placeholder="Enter Team Number"
                            value={teamNumber}
                            onChange={(e) => setTeamNumber(e.target.value ? parseInt(e.target.value) : undefined)}
                        />
                    </Col>
                    <Col xs={12} md={3} className="d-flex align-items-center">
                        <h5 className="mb-0">Scout Name:</h5>
                    </Col>
                    <Col xs={12} md={3}>
                        <Form.Control
                            type="text"
                            placeholder="Enter Scout Name"
                            value={scoutName}
                            onChange={(e) => setScoutName(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col xs={12} md={3} className="d-flex align-items-center">
                        <h5 className="mb-0">Comments:</h5>
                    </Col>
                    <Col xs={12} md={9}>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            placeholder="Enter Comments"
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col xs={12}>
                        <Button className="btn btn-primary w-100" onClick={saveData}>Save</Button>
                    </Col>
                </Row>
            </div>
        </>
    );
}






