import DropDown from "../Utils/DropDown";
import { Link, NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { MatchDTO, formItem, matchDataDTO_2024 } from "../Utils/Utils.models";
import axios, { AxiosResponse } from "axios";
import { urlEvent2024, urlMatchData2024, urlRobotPictures, urlTeamAverages2024 } from "../endpoints";
import eventContext from "../Contexts/EventContexts";
import { convertNumbersToFormItem, convertStringsToFormItem, dynamicSort } from "../Utils/HelperFunctions";
import { Button, Col , Form, Row } from "react-bootstrap";
import { useAlert } from "react-bootstrap-hooks-alert";
export default function EditMatch2025() {
    const [teamList, setTeamList] = useState<formItem[]>([]);
    const { eventCode, updateEvent } = useContext(eventContext);
    const [chosenTeam, setChosenTeam] = useState<string>("");
    const [matches, setMatches] = useState<formItem[]>([]);
    const [chosenMatchNumber, setChosenMatchNumber] = useState<string>("");
    const [matchByMatch, setMatchByMatch] = useState<matchDataDTO_2024[]>([]);
    const [robotPicture, setRobotPicture] = useState<string>('');

    const { danger, success } = useAlert();


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


    useEffect(() => {
        loadTeamList();
        const queryParams = new URLSearchParams(window.location.search)
        const teamNumber = queryParams.get("team")
        if (teamNumber != null)
        {
            setChosenTeam(teamNumber)
        }

        const matchNumber = queryParams.get("match")
        if (matchNumber != null)
        {
            setChosenMatchNumber(matchNumber)
        }
        
    }, [eventCode]);

    useEffect(() => {
        getTeamMatchByMatch();
        getRobotPicture()
    }, [chosenTeam]);

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

    function getRobotPicture() {
        if (chosenTeam != "") {
            axios.get(`${urlRobotPictures}`, {
                params: {
                    eventCode: eventCode,
                    teamNumber: parseInt(chosenTeam)
                },
            })
                .then((response: AxiosResponse<string>) => {
                    setRobotPicture(response.data);
                })
        }
    }


    function ChangeValue(newValue: any, field: string) {
        let newMatchData = [...matchByMatch];
        if (field === "Speaker") {
            newMatchData.find((x) => x.matchNumber === Number(chosenMatchNumber))!.teleSpeaker = parseInt(newValue);
        } else if (field === "Amp") {
            newMatchData.find((x) => x.matchNumber === Number(chosenMatchNumber))!.teleAmp = parseInt(newValue);
        } else if (field === "Feeds") {
            newMatchData.find((x) => x.matchNumber === Number(chosenMatchNumber))!.teleFeeds = parseInt(newValue);
        } else if (field === "Trap") {
            newMatchData.find((x) => x.matchNumber === Number(chosenMatchNumber))!.teleTrap = parseInt(newValue);
        } else if (field === "Climb") {
            newMatchData.find((x) => x.matchNumber === Number(chosenMatchNumber))!.climb = newValue.toString();
            //console.log(newValue);
        }
        setMatchByMatch(newMatchData);
    }

    async function saveOrder() {
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
            <h3 className="text-center align-middle RRBlue">Edit Match</h3>
            <Row>
                <Col><DropDown Options={teamList} DefaultOption='none' selectOptions={setChosenTeam} selectedOption={chosenTeam} ></DropDown></Col>
                <Col><DropDown Options={matches} DefaultOption='none' selectOptions={setChosenMatchNumber} selectedOption={chosenMatchNumber} ></DropDown></Col>
            </Row>
            <Row className="m-3">
                {chosenMatchNumber !== "" && matchByMatch.length > 0 && matchByMatch.find((x) => x.matchNumber === Number(chosenMatchNumber)) ? 
                    <>
                        <Col className='col-md-auto mt-1'><h5>Tele Speaker: </h5></Col>
                        <Col>
                            <Form.Control type="number" placeholder="Teleop Speakers" value={matchByMatch.find((x) => x.matchNumber === Number(chosenMatchNumber))!.teleSpeaker.toString()} onChange={(e) => ChangeValue(parseInt(e.target.value), "Speaker")} />
                        </Col> 
                        <Col className='col-md-auto mt-1'><h5>Tele Amp: </h5></Col>
                        <Col>
                            <Form.Control type="string" placeholder="Teleop Amp" value={matchByMatch.find((x) => x.matchNumber === Number(chosenMatchNumber))!.teleAmp.toString()} onChange={(e) => ChangeValue(parseInt(e.target.value), "Amp")} />
                        </Col> 
                        <Col className='col-md-auto mt-1'><h5>Feeds: </h5></Col>
                        <Col>
                            <Form.Control type="string" placeholder="Feeds" value={matchByMatch.find((x) => x.matchNumber === Number(chosenMatchNumber))!.teleFeeds!.toString()} onChange={(e) => ChangeValue(parseInt(e.target.value), "Feeds")} />
                        </Col> 
                        <Row className="m-3">
                            <Col className='col-md-auto mt-1'><h5>Climb: </h5></Col>
                            <Col>
                                <DropDown Options={climbOptions} DefaultOption='No' selectOptions={(e) => ChangeValue(e, "Climb")} selectedOption={matchByMatch.find((x) => x.matchNumber === Number(chosenMatchNumber))!.climb!.toString()} ></DropDown>
                            </Col> 
                            <Col className='col-md-auto mt-1'><h5>Trap: </h5></Col>
                            <Col>
                                <DropDown Options={trapOptions} DefaultOption='0' selectOptions={(e) => ChangeValue(parseInt(e), "Trap")} selectedOption={matchByMatch.find((x) => x.matchNumber === Number(chosenMatchNumber))!.teleTrap!.toString()} ></DropDown>
                            </Col> 
                        </Row>
                        
                        <Button className="btn btn-primary btn-block mt-3 " onClick={saveOrder} > Update Data</Button>

                        <div className="text-center m-3"><img className="img-fluid" src={robotPicture} style={{ maxHeight: '400px' }} alt="" /></div>
                        
                    </>
                : <></>              
                }

            </Row>
            
            
        </div>
    </>)
}