import { Accordion, Button, Col, Form, Row } from "react-bootstrap";
import DropDown from "../Utils/DropDown";
import { useContext, useEffect, useState } from "react";
import { MatchDTO, TeamAveragesDTO_2025, formItem, matchDataDTO_2025 } from "../Utils/Utils.models";
import eventContext from "../Contexts/EventContexts";
import axios, { AxiosResponse } from "axios";
import { urlDataValidation2025, urlEvent2025, urlMatchData2025, urlTeamAverages2025 } from "../endpoints";
import { convertNumbersToFormItem, dynamicSort } from "../Utils/HelperFunctions";
import EditMatchForm from "./EditMatchForm";
import { ValidatedMatchDTO } from "./VerifyMatchData.model";
import { useAlert } from "react-bootstrap-hooks-alert";
import { TeamAveragesDTO } from "../MatchStrategy/MatchStrategy.model";




export default function VerifyTeamComponent(props: verifyTeamComponentProps) {

    function getCurrentValue() {
        
        if (props.field === "coralL1")
        {
            return props.match.coralL1
        }
        else if (props.field === "coralL2") {
            return props.match.coralL2
        }
        else if (props.field === "coralL3") {
            return props.match.coralL3
        }
        else if (props.field === "coralL4") {
            return props.match.coralL4
        }
        else if (props.field === "autoCoralL1") {
            return props.match.autoCoralL1
        }
        else if (props.field === "autoCoralL2") {
            return props.match.autoCoralL2
        }
        else if (props.field === "autoCoralL3") {
            return props.match.autoCoralL3
        }
        else if (props.field === "autoCoralL4") {
            return props.match.autoCoralL4
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
        </Row>



    </>)
}

interface verifyTeamComponentProps {
    match: matchDataDTO_2025,
    alliance: String,
    field: String,
    updateMatch(match: matchDataDTO_2025, newValue: number, fieldNumber: String): void
}