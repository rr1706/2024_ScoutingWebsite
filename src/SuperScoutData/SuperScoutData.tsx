import { Button, Col, Form, Row } from "react-bootstrap";
import DropDown from "../Utils/DropDown";
import { useContext, useEffect, useState } from "react";
import { formItem } from "../Utils/Utils.models";
import eventContext from "../Contexts/EventContexts";
import { useAlert } from "react-bootstrap-hooks-alert";
import { urlSuperScout2025 } from "../endpoints";
import axios from "axios";
import { SuperScoutDataDTO } from "./SuperScoutData.model";

export default function SuperScoutData() {
    const [type, setType] = useState<string>("Match");
    const [matchNumber, setMatchNumber] = useState<number>();
    const [teamNumber, setTeamNumber] = useState<number | undefined>();
    const [scoutName, setScoutName] = useState<string>("");
    const [comments, setComments] = useState<string>("");
    const [drivetrain, setDrivetrain] = useState<string>("");
    const [drivetrainOverride, setDrivetrainOverride] = useState<string>("");
    const { eventCode } = useContext(eventContext);
    const [batteryCount, setBatteryCount] = useState<number | undefined>();
    const [batteryAge, setBatteryAge] = useState<string>("");
    const [driverExperience, setDriverExperience] = useState<string>("");

    const { danger, success } = useAlert();

    const matchTypeOptions: formItem[] = [
        { id: "Match", name: "SuperScout" },
        { id: "Pit", name: "Pit" },
        { id: "Practice", name: "Practice" },
        { id: "Prescouting", name: "Prescouting" }
    ];

    const drivetrainOptions: formItem[] = [
        { id: "Thrifty Swerve", name: "Thrifty Swerve" },
        { id: "WCP Fancy Wheel Swerve", name: "WCP Fancy Wheel Swerve" },
        { id: "WCP Old Swerve", name: "WCP Old Swerve" },
        { id: "Rev Swerve Crap Wheel", name: "Rev Swerve Crap Wheel" },
        { id: "Rev Swerve TB wheel", name: "Rev Swerve TB wheel" },
        { id: "Rev Swerve Rev Tread", name: "Rev Swerve Rev Tread" },
        { id: "Tank - KOP", name: "Tank - KOP" },
        { id: "Tank - Custom", name: "Tank - Custom" },
        { id: "mk4i - L2", name: "mk4i - L2" },
        { id: "mk4i - L3", name: "mk4i - L3" },
        { id: "mk4 - L2", name: "mk4 - L2" },
        { id: "mk4 - L3", name: "mk4 - L3" },
        { id: "Other", name: "Other" }
    ];

    useEffect(() => { }, [eventCode]);

    async function saveData() {
        if (validateData()) {
            let tempDrive: string = ''
            if (drivetrain === "Other") {
                tempDrive = drivetrainOverride;
            } else {
                tempDrive = drivetrain;
            }
            console.log(driverExperience)
            const data: SuperScoutDataDTO = {
                type: type,
                matchNumber: matchNumber,
                teamNumber: teamNumber!,
                scoutName: scoutName,
                comments: comments,
                eventCode: eventCode,
                drivetrain: tempDrive,
                batteryAge: batteryAge,
                batteryCount: batteryCount,
                driverExperience: driverExperience
            };
            await axios.post(`${urlSuperScout2025}/savedata`, data).then(() => {
                success("Successfully Saved Data");
                if (type === "Match" || type === "Practice") {
                    setMatchNumber(matchNumber! + 1);
                }
                setTeamNumber(undefined);
                setComments("");
                setDrivetrain("");
                setDrivetrainOverride("");
                setBatteryCount(undefined);
                setBatteryAge("");
                setDriverExperience("");
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
        } else if (comments === "" && type !== 'Pit') {
            isValid = false;
            danger("Please enter comments");
        }
        return isValid;
    }

    return (
        <>
            <div className="container w-100 w-md-75 p-3">
                <h4 className="text-center align-middle RRBlue mb-4">SuperScout</h4>
                <Row className="mb-3 mt-3">
                    <Col xs={12} md={3} className="d-flex align-items-center mb-2 mb-md-0">
                        <h5 className="mb-0">Type:</h5>
                    </Col>
                    <Col xs={12} md={3} className="mb-2 mb-md-0">
                        <DropDown
                            DefaultOption={"Select Type"}
                            Options={matchTypeOptions}
                            selectedOption={type}
                            selectOptions={setType}
                        />
                    </Col>
                    <Col xs={12} md={3} className="d-flex align-items-center mb-2 mb-md-0">
                        <h5 className="mb-0">Team Number:</h5>
                    </Col>
                    <Col xs={12} md={3}>
                        <Form.Control
                            type="number"
                            placeholder="Enter Team Number"
                            value={teamNumber || ''}
                            onChange={(e) => setTeamNumber(e.target.value ? parseInt(e.target.value) : undefined)}
                        />
                    </Col>
                </Row>
                <Row className="mb-3 mt-3">
                    <Col xs={12} md={3} className="d-flex align-items-center mb-2 mb-md-0">
                        <h5 className="mb-0">Scout Name:</h5>
                    </Col>
                    <Col xs={12} md={3} className="mb-2 mb-md-0">
                        <Form.Control
                            type="text"
                            placeholder="Enter Scout Name"
                            value={scoutName}
                            onChange={(e) => setScoutName(e.target.value)}
                        />
                    </Col>
                    {type === "Pit" ? (
                        <>
                            <Col xs={12} md={3} className="d-flex align-items-center mb-2 mb-md-0">
                                <h5 className="mb-0">Drivetrain:</h5>
                            </Col>
                            <Col xs={12} md={3}>
                                <DropDown
                                    DefaultOption={"Select Type"}
                                    Options={drivetrainOptions}
                                    selectedOption={drivetrain}
                                    selectOptions={setDrivetrain}
                                />
                                {drivetrain === "Other" ? (
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Drivetrain"
                                        value={drivetrainOverride}
                                        onChange={(e) => setDrivetrainOverride(e.target.value)}
                                        className="mt-2"
                                    />
                                ) : null}
                            </Col>
                        </>
                    ) : null}
                    {type === "Match" || type === "Practice" ? (
                        <>
                            <Col xs={12} md={3} className="d-flex align-items-center mb-2 mb-md-0">
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
                {type === "Pit" ? (
                    <>
                        <Row className="mb-3 mt-3">
                            <Col xs={12} md={3} className="d-flex align-items-center mb-2 mb-md-0">
                                <h5 className="mb-0">Battery Count:</h5>
                            </Col>
                            <Col xs={12} md={3} className="mb-2 mb-md-0">
                                <Form.Control
                                    type="number"
                                    placeholder="Enter Battery Count"
                                    value={batteryCount || ''}
                                    onChange={(e) => setBatteryCount(e.target.value ? parseInt(e.target.value) : undefined)}
                                />
                            </Col>
                            <Col xs={12} md={3} className="d-flex align-items-center mb-2 mb-md-0">
                                <h5 className="mb-0">Battery Age:</h5>
                            </Col>
                            <Col xs={12} md={3}>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter Battery Age"
                                    value={batteryAge}
                                    onChange={(e) => setBatteryAge(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <Row className="mb-3 mt-3">
                            <Col xs={12} md={3} className="d-flex align-items-center mb-2 mb-md-0">
                                <h5 className="mb-0">Driver Experience:</h5>
                            </Col>
                            <Col xs={12} md={3} className="mb-2 mb-md-0">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Driver Experience"
                                    value={driverExperience}
                                    onChange={(e) => setDriverExperience(e.target.value)}
                                />
                            </Col>
                        </Row>
                    </>
                ) : null}
                <Row className="mb-3 mt-3">
                    <Col xs={12} md={3} className="d-flex align-items-center mb-2 mb-md-0">
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

































