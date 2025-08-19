import { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { ColumnsSelectedDTO } from "../Picklist/Picklist.model";
import Button from "../Utils/Button";



export default function ColumnSelectorPopup2025(props: ColumnSelectorProps) {
    return (
        <>
            <Row className='mb-3'>
                <Col className="text-center align-middle d-flex align-items-center justify-content-center">
                    <p className="mb-0 me-2">Side Coral Auto</p>
                    <input
                        type="checkbox"
                        checked={props.columnsSelection.sideCoralAuto}
                        onChange={e => props.setColumnsSelection(e.target.checked, "sideCoralAuto")}
                    />
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col className="text-center align-middle d-flex align-items-center justify-content-center">
                    <p className="mb-0 me-2">Middle Coral Auto</p>
                    <input
                        type="checkbox"
                        checked={props.columnsSelection.middleCoralAuto}
                        onChange={e => props.setColumnsSelection(e.target.checked, "middleCoralAuto")}
                    />
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col className="text-center align-middle d-flex align-items-center justify-content-center">
                    <p className="mb-0 me-2">Middle Net Auto</p>
                    <input
                        type="checkbox"
                        checked={props.columnsSelection.middleNetAuto}
                        onChange={e => props.setColumnsSelection(e.target.checked, "middleNetAuto")}
                    />
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col className="text-center align-middle d-flex align-items-center justify-content-center">
                    <p className="mb-0 me-2">Tele Coral</p>
                    <input
                        type="checkbox"
                        checked={props.columnsSelection.teleCoral}
                        onChange={e => props.setColumnsSelection(e.target.checked, "teleCoral")}
                    />
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col className="text-center align-middle d-flex align-items-center justify-content-center">
                    <p className="mb-0 me-2">Barge</p>
                    <input
                        type="checkbox"
                        checked={props.columnsSelection.barge}
                        onChange={e => props.setColumnsSelection(e.target.checked, "barge")}
                    />
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col className="text-center align-middle d-flex align-items-center justify-content-center">
                    <p className="mb-0 me-2">Processor</p>
                    <input
                        type="checkbox"
                        checked={props.columnsSelection.processor}
                        onChange={e => props.setColumnsSelection(e.target.checked, "processor")}
                    />
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col className="text-center align-middle d-flex align-items-center justify-content-center">
                    <p className="mb-0 me-2">Total Tele</p>
                    <input
                        type="checkbox"
                        checked={props.columnsSelection.totalTele}
                        onChange={e => props.setColumnsSelection(e.target.checked, "totalTele")}
                    />
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col className="text-center align-middle d-flex align-items-center justify-content-center">
                    <p className="mb-0 me-2">Total Tele Adjusted</p>
                    <input
                        type="checkbox"
                        checked={props.columnsSelection.totalTeleAdjusted}
                        onChange={e => props.setColumnsSelection(e.target.checked, "totalTeleAdjusted")}
                    />
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col className="text-center align-middle d-flex align-items-center justify-content-center">
                    <p className="mb-0 me-2">Deep Climb</p>
                    <input
                        type="checkbox"
                        checked={props.columnsSelection.deepClimb}
                        onChange={e => props.setColumnsSelection(e.target.checked, "deepClimb")}
                    />
                </Col>
            </Row>
        </>
    )
}
interface ColumnSelectorProps {
    columnsSelection: ColumnsSelectedDTO;
    setColumnsSelection: (value: boolean, field: string) => void;
}