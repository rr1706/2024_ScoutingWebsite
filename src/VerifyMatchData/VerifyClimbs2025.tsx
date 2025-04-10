import { Accordion, Button, Col, Form, Row } from "react-bootstrap";
import DropDown from "../Utils/DropDown";
import { useContext, useEffect, useState } from "react";
import { MatchVideoDTO, TeamAveragesDTO_2025, formItem, matchDataDTO_2025 } from "../Utils/Utils.models";
import eventContext from "../Contexts/EventContexts";
import axios, { AxiosResponse } from "axios";
import { urlDataValidation2025, urlEvent2025, urlMatchData2025, urlTBA, urlTeamAverages2025 } from "../endpoints";
import { convertNumbersToFormItem, dynamicSort } from "../Utils/HelperFunctions";
import EditMatchForm from "./EditMatchForm";
import { ValidatedMatchDTO } from "./VerifyMatchData.model";
import { useAlert } from "react-bootstrap-hooks-alert";
import VerifyTeamComponent from "./VerifyTeamComponent";

export default function VerifyClimbs2025() {

    const climbOptions: formItem[] = [
        { id: "No", name: "No" },
        { id: "Fail", name: "Fail" },
        { id: "Deep", name: "Deep" },
        { id: "Shallow", name: "Shallow" }
    ];

    const [teamList, setTeamList] = useState<formItem[]>([]);
    const [matches, setMatches] = useState<formItem[]>([]);
    const [chosenTeam, setChosenTeam] = useState<string>("");

    const { eventCode, updateEvent } = useContext(eventContext);
    const [matchByMatch, setMatchByMatch] = useState<matchDataDTO_2025[]>([]);
    const [matchVideos, setmatchVideos] = useState<MatchVideoDTO[]>([]);

    const { danger, success } = useAlert();

    const [expanded, setExpanded] = useState<string | null>(null);

    useEffect(() => {
        loadTeamList()
        loadMatchVideos();
    }, [chosenTeam]);

    useEffect(() => {
        getTeamMatchByMatch();
    }, [chosenTeam]);


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
    function loadMatchVideos() {
        axios.get(`${urlTBA}/getMatchVideos`, {
            params: {
                eventID: eventCode
            },
        })
            .then((response: AxiosResponse<MatchVideoDTO[]>) => {
                setmatchVideos(response.data);
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
                    let tempMatchByMatch = response.data
                        .filter(match => match.endClimb !== "Deep")
                        .filter(match => match.validatedClimb !== 1)
                        .sort(dynamicSort("matchNumber", false));
                    setMatchByMatch(tempMatchByMatch);
                    setMatches(convertNumbersToFormItem(tempMatchByMatch.map(x => x.matchNumber)))
                })
        }
    }
    function ChangeValue(matchData: matchDataDTO_2025, newValue: any) {
        let newMatch = { ...matchData }
        newMatch.endClimb = newValue;
        newMatch.validatedClimb = 1;
        saveMatch(newMatch);
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
            <h4 className="text-center align-middle RRBlue mb-4">Verify Climbs</h4>
            <DropDown Options={teamList} DefaultOption="" selectOptions={setChosenTeam} selectedOption={chosenTeam} />
            <Accordion defaultActiveKey="-0" onSelect={(eventKey) => setExpanded(eventKey !== undefined ? eventKey!.toString() : null)}>
                {matchByMatch?.map((match, index) =>
                    < Accordion.Item eventKey={index.toString()} key={index}>
                        <Accordion.Header>
                            {"Match " + match.matchNumber +  " (Current: " + match.endClimb + ")"}
                        </Accordion.Header>
                        <Accordion.Body>
                            {expanded === index.toString() && (
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <iframe
                                        width="560" height="315" src={`https://www.youtube.com/embed/${matchVideos.find(video => video.matchNumber === match.matchNumber)?.video}?start=130`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; fullscreen; web-share">
                                    </iframe>
                                </div>
                            )}
                            <Row className="m-3">
                                <Col>
                                    <DropDown
                                        DefaultOption={""}
                                        Options={climbOptions}
                                        selectedOption={match.endClimb}
                                        selectOptions={(e: any) => ChangeValue(match, e)}
                                    />
                                </Col>
                                <Col>
                                    <Button
                                        onClick={() => { ChangeValue(match, match.endClimb) }}>
                                        Confirm
                                    </Button>
                                </Col>
                            </Row>
                        </Accordion.Body>
                    </Accordion.Item>
                )}
            </Accordion>
        </div>
    </>)
}

