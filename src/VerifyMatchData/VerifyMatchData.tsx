import {Accordion, Button, Col, Form, Row} from "react-bootstrap";
import DropDown from "../Utils/DropDown";
import { useContext, useEffect, useState } from "react";
import { TeamAveragesDTO_2025, formItem, matchDataDTO_2025 } from "../Utils/Utils.models";
import eventContext from "../Contexts/EventContexts";
import axios, { AxiosResponse } from "axios";
import { urlDataValidation2025, urlEvent2025, urlMatchData2025, urlTeamAverages2025 } from "../endpoints";
import { convertNumbersToFormItem, dynamicSort } from "../Utils/HelperFunctions";
import EditMatchForm from "./EditMatchForm";
import { ValidatedMatchDTO } from "./VerifyMatchData.model";
import { useAlert } from "react-bootstrap-hooks-alert";
import VerifyTeamComponent from "./VerifyTeamComponent";




export default function VerifyMatchData() {

    const [teamList, setTeamList] = useState<formItem[]>([]);
    const [matches, setMatches] = useState<formItem[]>([]);
    const [chosenTeam, setChosenTeam] = useState<string>("");

    const { eventCode, updateEvent } = useContext(eventContext);
    const [chosenMatchNumber, setChosenMatchNumber] = useState<string>("");
    const [matchByMatch, setMatchByMatch] = useState<matchDataDTO_2025[]>([]);
    const [validatedMatches, setValidatedMatches] = useState<ValidatedMatchDTO[]>([]);
    const { danger, success } = useAlert();
    const redColor = '#ff5050'
    const blueColor = '#3399ff'

    useEffect(() => {
        loadMatchByMatchData()
    }, [eventCode]);

    useEffect(() => {
        getTeamMatchByMatch();
    }, [chosenTeam]);

    function loadMatchByMatchData()
    {
        axios.get(`${urlMatchData2025}/event`, {
            params: {
                eventID: eventCode
            },
        })
            .then((response: AxiosResponse<matchDataDTO_2025[]>) => {
                setMatchByMatch(response.data)
            })
    }

    function loadValidatedMatches() {
        axios.get(`${urlDataValidation2025}/getTBAFlaggedMatches`, {
            params: {
                eventID: eventCode
            },
        })
            .then((response: AxiosResponse<ValidatedMatchDTO[]>) => {
                setValidatedMatches(response.data)
                if (response.data.length < 1) {
                    success("No matches to validate, good job :)")
                }
                console.log(response.data);
            })
    }
    function loadTeamList() {
        axios.get(`${urlEvent2025}/getteamList`, {
            params: {
                eventID: eventCode
            },
        })
            .then((response: AxiosResponse<number[]>) => {
                setTeamList(convertNumbersToFormItem(response.data));
            })
    }
    function getTeamMatchByMatch() {
        if (chosenTeam != "") {
            axios.get(`${urlMatchData2025}/getbyteam`, {
                params: {
                    eventID: eventCode,
                    teamNumber: chosenTeam
                },
            })
                .then((response: AxiosResponse<matchDataDTO_2025[]>) => {
                    let tempMatchByMatch = response.data.sort(dynamicSort("matchNumber", false));
                    setMatchByMatch(tempMatchByMatch);
                    setMatches(convertNumbersToFormItem(tempMatchByMatch.map(x => x.matchNumber)))
                })
        }
    }

    function ChangeValue(matchData: matchDataDTO_2025, newValue: any, field: string) {
        let copyMatchByMatch = [...matchByMatch]
        let newMatchData = copyMatchByMatch.find((x) => x.matchNumber === matchData.matchNumber && x.teamNumber === matchData.teamNumber)!
        if (field === "autoCoralL1")
        {
            newMatchData.autoCoralL1 = parseInt(newValue);
        }
        // else if (field === "autoSpeaker") {
        //    newMatchData.autoSpeaker = parseInt(newValue);
        //} else if (field === "Amp") {
        //    newMatchData.teleAmp = parseInt(newValue);
        //} else if (field === "Feeds") {
        //    newMatchData.teleFeeds = parseInt(newValue);
        //} else if (field === "Trap") {
        //    newMatchData.teleTrap = parseInt(newValue);
        //} else if (field === "Climb") {
        //    newMatchData.climb = newValue.toString();
        //}

        let copyVerify = [...validatedMatches]
        let newValidMatch = copyVerify.find((x) => x.matchNumber === matchData.matchNumber && (x.teamNumbers[0] === matchData.teamNumber || x.teamNumbers[1] === matchData.teamNumber || x.teamNumbers[2] === matchData.teamNumber))!
        if (field === "autoCoralL1") {
            newMatchData.autoCoralL1 = parseInt(newValue);
        }
        // else if (field === "autoSpeaker") {
        //    newMatchData.autoSpeaker = parseInt(newValue);
        //} else if (field === "Amp") {
        //    newMatchData.teleAmp = parseInt(newValue);
        //} else if (field === "Feeds") {
        //    newMatchData.teleFeeds = parseInt(newValue);
        //} else if (field === "Trap") {
        //    newMatchData.teleTrap = parseInt(newValue);
        //} else if (field === "Climb") {
        //    newMatchData.climb = newValue.toString();
        //}

        setValidatedMatches(copyVerify);
        setMatchByMatch(copyMatchByMatch);
    }

    async function saveMatch(matchNumber: number) {
        let updatedMatches = matchByMatch.filter((x) => x.matchNumber === matchNumber)!
        console.log(updatedMatches.length);
        for (let i = 0; i < updatedMatches.length; i++) {
            try {
                console.log(updatedMatches[i]);
                await axios.post(`${urlMatchData2025}/updatematchbymatch`, updatedMatches[i]).then(() => {
                    axios.get(`${urlTeamAverages2025}/calculateAverages/`, {
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
        getTeamMatchByMatch();
        loadValidatedMatches();
        success("Successfully Saved New Data")
    }

    return (<>
        <div className="container w-75" >
            <h4 className="text-center align-middle RRBlue">Verify Match Data</h4>
            <Button className="btn btn-primary btn-block" onClick={loadValidatedMatches} >Validate</Button>
            <Accordion defaultActiveKey="0">
            {validatedMatches?.map((match, index) =>
                < Accordion.Item eventKey = {index.toString()} >
                    <Accordion.Header className={match.allianceColor === 'Red Alliance' ? 'accordion-button-red' : 'accordion-button-blue'}>
                        {"Match " + match.matchNumber + " " + match.field + " (Current: " + match.currentValue + ", Actual: " + match.correctValue + ")"}
                    </Accordion.Header>
                    <Accordion.Body>
                        <Accordion.Collapse eventKey={index.toString()}>
                            <iframe
                                width="560" height="315" src={`https://www.youtube.com/embed/${match.matchVideo}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; fullscreen; web-share">
                            </iframe>
                        </Accordion.Collapse>

                        <Row className="m-3">
                            {matchByMatch.length > 0 && matchByMatch.find((x) => x.matchNumber === match.matchNumber && (x.teamNumber === match.teamNumbers[0] || x.teamNumber === match.teamNumbers[1] || x.teamNumber === match.teamNumbers[2]) ) ?
                                <>
                                    <VerifyTeamComponent match={matchByMatch.find((x) => x.matchNumber === match.matchNumber && (x.teamNumber === match.teamNumbers[0]))!} alliance={match.allianceColor} updateMatch={ChangeValue} field={match.field }></VerifyTeamComponent>
                                    <VerifyTeamComponent match={matchByMatch.find((x) => x.matchNumber === match.matchNumber && (x.teamNumber === match.teamNumbers[1]))!} alliance={match.allianceColor} updateMatch={ChangeValue} field={match.field}></VerifyTeamComponent>
                                    <VerifyTeamComponent match={matchByMatch.find((x) => x.matchNumber === match.matchNumber && (x.teamNumber === match.teamNumbers[2]))!} alliance={match.allianceColor} updateMatch={ChangeValue} field={match.field}></VerifyTeamComponent>

                                    <Button className="btn btn-primary btn-block mt-3 " onClick={() => saveMatch(match.matchNumber)} >Save</Button>

                                </>
                                : <>{matchByMatch.length}</>
                            }

                        </Row>
                    </Accordion.Body>
                </Accordion.Item>
            )}
            </Accordion>
        </div>
    </>)
}