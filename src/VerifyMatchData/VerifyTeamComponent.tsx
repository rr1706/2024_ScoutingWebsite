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

    const { eventCode } = useContext(eventContext);
    const { danger, success } = useAlert();
    const [thisMatch, setThisMatch] = useState<matchDataDTO_2024[]>([]);

    //function ChangeValue(newValue: any, field: string) {
    //    let newMatchData = [props.match];
    //    if (field === "Speaker") {
    //        newMatchData.find((x) => x.matchNumber === Number(thisMatch))!.teleSpeaker = parseInt(newValue);
    //    } else if (field === "Amp") {
    //        newMatchData.find((x) => x.matchNumber === Number(thisMatch))!.teleAmp = parseInt(newValue);
    //    } else if (field === "Feeds") {
    //        newMatchData.find((x) => x.matchNumber === Number(thisMatch))!.teleFeeds = parseInt(newValue);
    //    } else if (field === "Trap") {
    //        newMatchData.find((x) => x.matchNumber === Number(thisMatch))!.teleTrap = parseInt(newValue);
    //    } else if (field === "Climb") {
    //        newMatchData.find((x) => x.matchNumber === Number(thisMatch))!.climb = newValue.toString();
    //    }
    //    setThisMatch(newMatchData);
    //}
    //fix the dragons
    async function saveMatch() {
        try {
            await axios.post(`${urlMatchData2024}/updatematchbymatch`, props.match).then(() => {
                success("Successfully Saved New Data")

                axios.get(`${urlTeamAverages2024}/calculateAverages/`, {
                    params: {
                        eventID: eventCode
                    }
                })
            })


        }
        catch (error: any) {
            danger(error.response.data)
        }
    }

    return (<>

        <Col className='col-md-auto mt-1'><h5>Team Number: {props.match.teamNumber}</h5>
                                        </Col>
                                        <Col className='col-md-auto mt-1'><h5>Tele Speaker: </h5>
                                        </Col>
                                        <Col>
            <Form.Control type="number" placeholder="teleopSpeaker" value={props.match.teleSpeaker} onChange={(e) => props.updateMatch(props.match, parseInt(e.target.value), "teleSpeaker")} />
                                        </Col>
                                        <Col className='col-md-auto mt-1'><h5>Auto Speaker: </h5>
                                        </Col>
                                        <Col>
            <Form.Control type="number" placeholder="autoSpeaker" value={props.match.autoSpeaker} onChange={(e) => props.updateMatch(props.match, parseInt(e.target.value), "autoSpeaker")} />
                                        </Col>


                                        {/* Repeat the above stuff thrice, and change the index referance in the ""*/}


    </>)
}

interface verifyTeamComponentProps {
    match: matchDataDTO_2024,
    alliance: String,
    updateMatch(match: matchDataDTO_2024, newValue: number, fieldNumber: String): void
}