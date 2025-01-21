import { Accordion, Button, Col, Form, Row } from "react-bootstrap";
import DropDown from "../Utils/DropDown";
import { useContext, useEffect, useState } from "react";
import { MatchDTO, TeamAveragesDTO_2024, formItem, matchDataDTO_2024 } from "../Utils/Utils.models";
import eventContext from "../Contexts/EventContexts";
import axios, { AxiosResponse } from "axios";
import { urlDataValidation2024, urlEvent2024, urlMatchData2024, urlTeamAverages2024 } from "../endpoints";
import { convertNumbersToFormItem, dynamicSort } from "../Utils/HelperFunctions";
import EditMatchForm from "./EditMatchForm";
import { ValidatedMatchDTO } from "./VerifyMatchData.model";
import { useAlert } from "react-bootstrap-hooks-alert";
import { TeamAveragesDTO } from "../MatchStrategy/MatchStrategy.model";




export default function VerifyTeamComponent(props: verifyTeamComponentProps) {

    function getCurrentValue() {
        if (props.field === "autoSpeaker") {
            return props.match.autoSpeaker
        }else if (props.field === "teleSpeaker") {
            return props.match.teleSpeaker
        }
    }

    return (<>

        <Row className='mt-1'>
            <Col className='col-md-auto'>
                <h5>{props.match.teamNumber}: </h5>
            </Col>
            <Col className='col-md-auto'>
                <Form.Control style={{ width: '100px' }} type="number" placeholder="teleopSpeaker" value={getCurrentValue()} onChange={(e) => props.updateMatch(props.match, parseInt(e.target.value), props.field)} />
            </Col>
            <Col className='col-md-auto'>
                <Button className="btn btn-primary" onClick={() => props.saveMatch(props.match)}>Save</Button>
            </Col>
        </Row>



    </>)
}

interface verifyTeamComponentProps {
    match: matchDataDTO_2024,
    alliance: String,
    field: String,
    updateMatch(match: matchDataDTO_2024, newValue: number, fieldNumber: String): void
    saveMatch(match: matchDataDTO_2024): void
}