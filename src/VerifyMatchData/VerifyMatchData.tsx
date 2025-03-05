import { Accordion, Button, Col, Form, Row } from "react-bootstrap";
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

    const [expanded, setExpanded] = useState<string | null>(null);

    useEffect(() => {
        loadMatchByMatchData()
    }, [eventCode]);

    useEffect(() => {
        getTeamMatchByMatch();
    }, [chosenTeam]);

    function loadMatchByMatchData() {
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
                axios.get(`${urlTeamAverages2025}/calculateAverages/`, {
                    params: {
                        eventID: eventCode
                    },
                }).then(() => {
                })
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
        if (field === "autoCoralL1") {
            newMatchData.autoCoralL1 = parseInt(newValue);
        }
        else if (field === "autoCoralL2") {
            newMatchData.autoCoralL2 = parseInt(newValue);
        }
        else if (field === "autoCoralL3") {
            newMatchData.autoCoralL3 = parseInt(newValue);
        }
        else if (field === "autoCoralL4") {
            newMatchData.autoCoralL4 = parseInt(newValue);
        }
        else if (field === "coralL1") {
            newMatchData.coralL1 = parseInt(newValue);
        }
        else if (field === "coralL2") {
            newMatchData.coralL2 = parseInt(newValue);
        }
        else if (field === "coralL3") {
            newMatchData.coralL3 = parseInt(newValue);
        }
        else if (field === "coralL4") {
            newMatchData.coralL4 = parseInt(newValue);
        }
        else if (field === "processor") {
            newMatchData.processor = parseInt(newValue);
        }
        else if (field === "net") {
            newMatchData.barge = parseInt(newValue);
        }

        setMatchByMatch(copyMatchByMatch);
    }

    async function saveMatch(match: matchDataDTO_2025) {
        try {
            await axios.post(`${urlMatchData2025}/updatematchbymatch`, match).then(() => {
                axios.get(`${urlTeamAverages2025}/calculateAverages/`, {
                    params: {
                        eventID: eventCode
                    }
                })
                getTeamMatchByMatch();
                success("Successfully Saved New Data")
            })
        }
        catch (error: any) {
            danger(error.response.data)
        }
    }

    return (<>
        <div className="container w-75 p-4" >
            <h4 className="text-center align-middle RRBlue mb-4">Verify Match Data</h4>
            <Button className="btn btn-primary btn-block mb-3" onClick={loadValidatedMatches} >Validate</Button>
            <Accordion defaultActiveKey="-0" onSelect={(eventKey) => setExpanded(eventKey !== undefined ? eventKey!.toString() : null)}>
                {validatedMatches?.map((match, index) =>
                    < Accordion.Item eventKey={index.toString()} key={index}>
                        <Accordion.Header className={match.allianceColor === 'Red' ? 'accordion-button-red' : 'accordion-button-blue'}>
                            {"Match " + match.matchNumber + " " + match.field + " (Current: " + match.currentValue + ", Actual: " + match.correctValue + ")"}
                        </Accordion.Header>
                        <Accordion.Body>
                            {expanded === index.toString() && (
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <iframe
                                        width="560" height="315" src={`https://www.youtube.com/embed/${match.matchVideo}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; fullscreen; web-share">
                                    </iframe>
                                </div>
                            )}
                            <Row className="m-3">
                                {matchByMatch.length > 0 && matchByMatch.find((x) => x.matchNumber === match.matchNumber && (x.teamNumber === match.teamNumbers[0] || x.teamNumber === match.teamNumbers[1] || x.teamNumber === match.teamNumbers[2])) ?
                                    <>
                                        <VerifyTeamComponent match={matchByMatch.find((x) => x.matchNumber === match.matchNumber && (x.teamNumber === match.teamNumbers[0]))!} alliance={match.allianceColor} updateMatch={ChangeValue} field={match.field} saveMatch={saveMatch }></VerifyTeamComponent>
                                        <VerifyTeamComponent match={matchByMatch.find((x) => x.matchNumber === match.matchNumber && (x.teamNumber === match.teamNumbers[1]))!} alliance={match.allianceColor} updateMatch={ChangeValue} field={match.field} saveMatch={saveMatch}></VerifyTeamComponent>
                                        <VerifyTeamComponent match={matchByMatch.find((x) => x.matchNumber === match.matchNumber && (x.teamNumber === match.teamNumbers[2]))!} alliance={match.allianceColor} updateMatch={ChangeValue} field={match.field} saveMatch={saveMatch}></VerifyTeamComponent>
                                    </>
                                    : <>{matchByMatch.length}</>
                                }

                            </Row>
                            <Row className="m-3">
                                <Button className="btn btn-primary btn-block" onClick={loadValidatedMatches}>Re-validate</Button>
                            </Row>
                        </Accordion.Body>
                    </Accordion.Item>
                )}
            </Accordion>
        </div>
    </>)
}

