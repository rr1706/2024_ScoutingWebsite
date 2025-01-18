import {Accordion, Button, Col, Form, Row} from "react-bootstrap";
import DropDown from "../Utils/DropDown";
import { useContext, useEffect, useState } from "react";
import { TeamAveragesDTO_2024, formItem, matchDataDTO_2024 } from "../Utils/Utils.models";
import eventContext from "../Contexts/EventContexts";
import axios, { AxiosResponse } from "axios";
import { urlDataValidation2024, urlEvent2024, urlMatchData2024, urlTeamAverages2024 } from "../endpoints";
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
    const [matchByMatch, setMatchByMatch] = useState<matchDataDTO_2024[]>([]);
    const [validatedMatches, setValidatedMatches] = useState<ValidatedMatchDTO[]>([]);
    const { danger, success } = useAlert();
    const redColor = '#ff5050'
    const blueColor = '#3399ff'

    useEffect(() => {

        loadValidatedMatches()
        loadMatchByMatchData()

    }, [eventCode]);

    useEffect(() => {
        getTeamMatchByMatch();
    }, [chosenTeam]);

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

    function loadMatchByMatchData()
    {
        axios.get(`${urlMatchData2024}/event`, {
            params: {
                eventID: eventCode
            },
        })
            .then((response: AxiosResponse<matchDataDTO_2024[]>) => {
                setMatchByMatch(response.data)
                console.log(response.data)
            })
    }

    function loadValidatedMatches() {
        axios.get(`${urlDataValidation2024}/getTBAFlaggedMatches`, {
            params: {
                eventID: eventCode
            },
        })
            .then((response: AxiosResponse<ValidatedMatchDTO[]>) => {
                setValidatedMatches(response.data)
            })
    }
    function loadTeamList() {
        axios.get(`${urlEvent2024}/getteamList`, {
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
            axios.get(`${urlMatchData2024}/getbyteam`, {
                params: {
                    eventID: eventCode,
                    teamNumber: chosenTeam
                },
            })
                .then((response: AxiosResponse<matchDataDTO_2024[]>) => {
                    let tempMatchByMatch = response.data.sort(dynamicSort("matchNumber", false));
                    setMatchByMatch(tempMatchByMatch);
                    setMatches(convertNumbersToFormItem(tempMatchByMatch.map(x => x.matchNumber)))
                })
        }
    }

    function ChangeValue(matchData: matchDataDTO_2024, newValue: any, field: string) {
        let copyMatchByMatch = [...matchByMatch]
        let newMatchData = copyMatchByMatch.find((x) => x.matchNumber === matchData.matchNumber)!
        if (field === "teleSpeaker") {
            newMatchData.teleSpeaker = parseInt(newValue);
        } else if (field === "autoSpeaker") {
            newMatchData.autoSpeaker = parseInt(newValue);
        } else if (field === "Amp") {
            newMatchData.teleAmp = parseInt(newValue);
        } else if (field === "Feeds") {
            newMatchData.teleFeeds = parseInt(newValue);
        } else if (field === "Trap") {
            newMatchData.teleTrap = parseInt(newValue);
        } else if (field === "Climb") {
            newMatchData.climb = newValue.toString();
        }
        setMatchByMatch(copyMatchByMatch);
    }

    async function saveMatch(matchNumber: number) {
        let updatedMatches = matchByMatch.filter((x) => x.matchNumber === matchNumber)!
        for (let i = 0; i < updatedMatches.length; i++)
            try {
                await axios.post(`${urlMatchData2024}/updatematchbymatch`, matchByMatch.find((x) => x.matchNumber === Number(chosenMatchNumber))!).then(() => {
                    getTeamMatchByMatch();
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
        <div className="container w-75" >
            <h4 className="text-center align-middle RRBlue">Verify Match Data</h4>
            <Button className="btn btn-primary btn-block" onClick={() => ""} >Validate</Button>
            <Accordion defaultActiveKey="0">
            {validatedMatches?.map((match, index) =>
                < Accordion.Item eventKey = {index.toString()} >
                    <Accordion.Header className={match.allianceColor === 'Red Alliance' ? 'accordion-button-red' : 'accordion-button-blue'}>
                        {"Match " + match.matchNumber + " " + match.allianceColor}
                    </Accordion.Header>
                    <Accordion.Body>
                        {/*<iframe*/}
                        {/*    width="560" height="315" src={`https://www.youtube.com/embed/${match.matchVideo}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; fullscreen; web-share">*/}
                        {/*</iframe>*/}
                        <Row className="m-3">
                            {matchByMatch.length > 0 && matchByMatch.find((x) => x.matchNumber === match.matchNumber) ?
                                <>
                                    <VerifyTeamComponent match={matchByMatch.find((x) => x.matchNumber === match.matchNumber)!} alliance={match.allianceColor} updateMatch={ChangeValue}></VerifyTeamComponent>
                                    <Button className="btn btn-primary btn-block mt-3 " onClick={() => saveMatch} >Save</Button>

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