import { Accordion, Button, Col, Form, Row } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { matchDataDTO_2025 } from "../Utils/Utils.models";
import { useAlert } from "react-bootstrap-hooks-alert";

export default function VerifyTeamComponent(props: verifyTeamComponentProps) {

    function getCurrentValue() {
        if (props.field === "coralL1") {
            return props.match.coralL1;
        } else if (props.field === "coralL2") {
            return props.match.coralL2;
        } else if (props.field === "coralL3") {
            return props.match.coralL3;
        } else if (props.field === "coralL4") {
            return props.match.coralL4;
        } else if (props.field === "autoCoralL1") {
            return props.match.autoCoralL1;
        } else if (props.field === "autoCoralL2") {
            return props.match.autoCoralL2;
        } else if (props.field === "autoCoralL3") {
            return props.match.autoCoralL3;
        } else if (props.field === "autoCoralL4") {
            return props.match.autoCoralL4;
        } else if (props.field === "processor") {
            return props.match.processor;
        } else if (props.field === "net") {
            return props.match.barge;
        }
    }

    return (
        <Row className="mt-1" style={{ alignItems: 'center' }}>
            <Col style={{ flex: '0 0 80px', maxWidth: '80px' }}>
                <h5 style={{ margin: 0 }}>{props.match.teamNumber}:</h5>
            </Col>
            <Col style={{ flex: '0 0 100px', maxWidth: '100px' }}>
                <Form.Control
                    type="number"
                    value={getCurrentValue()}
                    onChange={(e) => props.updateMatch(props.match, parseInt(e.target.value), props.field)}
                    style={{ width: '100%' }}
                />
            </Col>
            <Col style={{ flex: '0 0 100px', maxWidth: '100px' }}>
                <Button
                    className="btn btn-primary btn-block"
                    onClick={() => props.saveMatch(props.match)}
                    style={{ width: '100%' }}
                >
                    Save
                </Button>
            </Col>
        </Row>
    );
}

interface verifyTeamComponentProps {
    match: matchDataDTO_2025;
    alliance: String;
    field: String;
    updateMatch(match: matchDataDTO_2025, newValue: number, fieldNumber: String): void;
    saveMatch(match: matchDataDTO_2025): void;
}

