import { Button, Col, Form, Row } from "react-bootstrap";
import DropDown from "../Utils/DropDown";

import { formItem, matchDataDTO_2024 } from "../Utils/Utils.models";


export default function VerifyMatchData(props: MatchProps) {



    let trapOptions: formItem[] = [
        {
            id: "1",
            name: "1"
        },
        {
            id: "2",
            name: "2"
        },
        {
            id: "3",
            name: "3"
        }
    ]

    let climbOptions: formItem[] = [
        {
            id: "Yes",
            name: "Yes"
        },
        {
            id: "Fail",
            name: "Fail"
        }
    ]
    
    function ChangeValue(newValue: any, field: string) {
        if (field === "Speaker") {
            props.matchData!.teleSpeaker = parseInt(newValue);
        } else if (field === "Amp") {
            props.matchData!.teleAmp = parseInt(newValue);
        } else if (field === "Feeds") {
            props.matchData!.teleFeeds = parseInt(newValue);
        } else if (field === "Trap") {
            props.matchData!.teleTrap = parseInt(newValue);
        } else if (field === "Climb") {
            props.matchData!.climb = newValue.toString();
        }
    }

    return (<>
        <div className="container w-75" >
            {props.matchData ?
                <>
                        <h4 className="text-center align-middle RRBlue">Verify Match Data</h4>
                        <Col className='col-md-auto mt-1'><h5>Tele Speaker: </h5></Col>
                        <Col>
                            <Form.Control type="number" placeholder="Teleop Speakers" value={props.matchData.teleSpeaker.toString()} onChange={(e) => ChangeValue(parseInt(e.target.value), "Speaker")} />
                        </Col>
                        <Col className='col-md-auto mt-1'><h5>Tele Amp: </h5></Col>
                        <Col>
                            <Form.Control type="string" placeholder="Teleop Amp" value={props.matchData.teleAmp.toString()} onChange={(e) => ChangeValue(parseInt(e.target.value), "Amp")} />
                        </Col>
                        <Col className='col-md-auto mt-1'><h5>Feeds: </h5></Col>
                        <Col>
                            <Form.Control type="string" placeholder="Feeds" value={props.matchData.teleFeeds!.toString()} onChange={(e) => ChangeValue(parseInt(e.target.value), "Feeds")} />
                        </Col>
                        <Row className="m-3">
                            <Col className='col-md-auto mt-1'><h5>Climb: </h5></Col>
                            <Col>
                                <DropDown Options={climbOptions} DefaultOption='No' selectOptions={(e) => ChangeValue(e, "Climb")} selectedOption={props.matchData.climb!.toString()} ></DropDown>
                            </Col>
                            <Col className='col-md-auto mt-1'><h5>Trap: </h5></Col>
                            <Col>
                                <DropDown Options={trapOptions} DefaultOption='0' selectOptions={(e) => ChangeValue(parseInt(e), "Trap")} selectedOption={props.matchData.teleTrap!.toString()} ></DropDown>
                            </Col>
                    </Row>
                    <Row>
                        <Button className="btn btn-primary btn-block mt-3 " onClick={() => ""} > Update Data</Button>
                    </Row>

                </>

            : <></>}

        </div>
    </>)
}


interface MatchProps {
    matchData: matchDataDTO_2024
}