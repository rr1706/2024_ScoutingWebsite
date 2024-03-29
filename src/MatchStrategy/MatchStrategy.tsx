import axios, { AxiosResponse } from "axios";
import { SetStateAction, useContext, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import eventContext from "../Contexts/EventContexts";
import { urlEvent, urlTeamAverages } from "../endpoints";
import DropDown from "../Utils/DropDown";
import { convertNumbersToFormItem, convertStringsToFormItem } from "../Utils/HelperFunctions";
import { formItem, MatchDTO } from "../Utils/Utils.models";
import { TeamAveragesDTO } from "./MatchStrategy.model";
import TeamRow from "./TeamRow";




export default function MatchStrategy() {    
    const [teamList, setTeamList] = useState<formItem[]>([]);
    const [teamAverages, setTeamAverages] = useState<TeamAveragesDTO[]>([]);
    const [matchSchedule, setMatchSchedule] = useState<MatchDTO[]>([]);
    const [matches, setMatches] = useState<formItem[]>([]);

    const [selectedMatch, setSelectedMatch] = useState<MatchDTO>(); 


    const [red1, setRed1] = useState<string>();
    const [red2, setRed2] = useState<string>();
    const [red3, setRed3] = useState<string>();
    const [blue1, setBlue1] = useState<string>();
    const [blue2, setBlue2] = useState<string>();
    const [blue3, setBlue3] = useState<string>();

    const { eventCode, updateEvent } = useContext(eventContext);

    useEffect(() => {
        loadTeamAverages();
        loadMatchSchedule();
    }, [eventCode]);

    function loadMatchSchedule() {
        axios.get(`${urlEvent}/getmatchschedule`, {
            params: {
                eventID: eventCode
            },
        })
            .then((response: AxiosResponse<MatchDTO[]>) => {
                setMatchSchedule(response.data);
                setMatches(convertStringsToFormItem(response.data.map(x => x.matchNumber.toString())));
            })
    }

    function loadTeamAverages() {
        axios.get(`${urlTeamAverages}/getteamaverages`, {
            params: {
                eventID: eventCode
            },
        })
            .then((response: AxiosResponse<TeamAveragesDTO[]>) => {
                setTeamAverages(response.data);
                setTeamList(convertStringsToFormItem(response.data.map(x => x.teamNumber.toString())));
            })
    }

    function getTeamAverage(teamNumber: string){
        return teamAverages.find((average) => {
            return average.teamNumber === parseInt(teamNumber, 10);
        })
    }

    function handleSelectedEvent(newMatchNum: string) {
        var match = matchSchedule.find(x => x.matchNumber === Number(newMatchNum));
        setSelectedMatch(match);
        setRed1(match!.red1.toString());
        setRed2(match!.red2.toString());
        setRed3(match!.red3.toString());
        setBlue1(match!.blue1.toString());
        setBlue2(match!.blue2.toString());
        setBlue3(match!.blue3.toString());
    }


    return (
        <div className="container w-75" >
            <h3 className="text-center align-middle RRBlue">Match Strategy</h3>


            <Row className="m-3">
                <Col className='col-md-auto mt-1'><h5>Match Number:</h5></Col>
                <Col className='col-md-auto'>
                    <DropDown Options={matches} DefaultOption='Select match' selectOptions={handleSelectedEvent} selectedOption={selectedMatch ? selectedMatch.matchNumber.toString() : undefined} ></DropDown>
                </Col>
            </Row>

            <Row>
                <Col><DropDown Options={teamList} DefaultOption='Red 1' selectOptions={setRed1} selectedOption={red1} ></DropDown> </Col>
                <Col><DropDown Options={teamList} DefaultOption='Red 2' selectOptions={setRed2} selectedOption={red2} ></DropDown> </Col>
                <Col><DropDown Options={teamList} DefaultOption='Red 3' selectOptions={setRed3} selectedOption={red3} ></DropDown> </Col>
                <Col><DropDown Options={teamList} DefaultOption='Blue 1' selectOptions={setBlue1} selectedOption={blue1} ></DropDown> </Col>
                <Col><DropDown Options={teamList} DefaultOption='Blue 2' selectOptions={setBlue2} selectedOption={blue2} ></DropDown> </Col>
                <Col><DropDown Options={teamList} DefaultOption='Blue 3' selectOptions={setBlue3} selectedOption={blue3} ></DropDown> </Col>
            </Row>
            <hr></hr>

{/*            <h4 className='mt-3 text-center align-middle'>Current Charts </h4>*/}
            <table className="table border">
                <tbody>
                    <tr className="font-weight-bold">
                        <td className="text-center align-middle" ><b>Team Number</b></td>
                        <td className="text-center align-middle" ><b>Auto Flat</b></td>
                        <td className="text-center align-middle" ><b>Auto Bump</b></td>
                        <td className="text-center align-middle" ><b>Auto Middle</b></td>
                        <td className="text-center align-middle" ><b>Auto Middle Balance</b></td>
                        <td className="text-center align-middle" ><b>Total Tele</b></td>
                    </tr>
                    <tr>
                        <TeamRow teamAverages={getTeamAverage(red1!)!} alliance='red'></TeamRow>
                    </tr>
                    <tr>
                        <TeamRow teamAverages={getTeamAverage(red2!)!} alliance='red'></TeamRow>
                    </tr>
                    <tr>
                        <TeamRow teamAverages={getTeamAverage(red3!)!} alliance='red'></TeamRow>
                    </tr>
                    {/*<tr>*/}
                    {/*    <AverageRow teamAverages={getTeamAverage(red3!)!} alliance='red'></AverageRow>*/}
                    {/*</tr>*/}
                    <tr > <td></td></tr>
                    <tr >
                        <TeamRow teamAverages={getTeamAverage(blue1!)!} alliance='blue'></TeamRow>
                    </tr>
                    <tr>
                        <TeamRow teamAverages={getTeamAverage(blue2!)!} alliance='blue'></TeamRow>
                    </tr>
                    <tr>
                        <TeamRow teamAverages={getTeamAverage(blue3!)!} alliance='blue' ></TeamRow>
                    </tr>

                </tbody>
            </table>

        </div>
    )
}