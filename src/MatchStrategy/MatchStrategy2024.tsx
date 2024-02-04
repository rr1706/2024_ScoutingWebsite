import axios, { AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import { Col,  Row } from "react-bootstrap";
import eventContext from "../Contexts/EventContexts";
import {  urlEvent2024, urlTeamAverages2024 } from "../endpoints";
import DropDown from "../Utils/DropDown";
import { convertStringsToFormItem } from "../Utils/HelperFunctions";
import { formItem, MatchDTO } from "../Utils/Utils.models";
import AverageRow2024 from "./AverageRow2024";
import { TeamAveragesDTO_2024 } from "../Utils/Utils.models";
import TeamRow2024 from "./TeamRow2024";
import TeamDetails from "../Utils/TeamDetails";
import RRModal from "../Utils/RRModal";




export default function MatchStrategy2024() {    
    const [teamList, setTeamList] = useState<formItem[]>([]);
    const [teamAverages, setTeamAverages] = useState<TeamAveragesDTO_2024[]>([]);
    const [matchSchedule, setMatchSchedule] = useState<MatchDTO[]>([]);
    const [matches, setMatches] = useState<formItem[]>([]);

    const [selectedMatch, setSelectedMatch] = useState<MatchDTO>(); 

    const [teamNumber, setTeamNumber] = useState<number>();

    const [showModal, setShowModal] = useState<boolean>(false);


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
        axios.get(`${urlEvent2024}/getmatchschedule`, {
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
        axios.get(`${urlTeamAverages2024}/getteamaverages`, {
            params: {
                eventID: eventCode
            },
        })
            .then((response: AxiosResponse<TeamAveragesDTO_2024[]>) => {
                setTeamAverages(response.data);
                setTeamList(convertStringsToFormItem(response.data.map(x => x.teamNumber!.toString())));
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
    function showTeamMatchByMatch(team: number) {
        setTeamNumber(team);
        setShowModal(true);
    }


    return (
        <div className="container w-80" >
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

            <table className="table border">
                <tbody>
                    <tr className="font-weight-bold">
                        <td className="text-center align-middle" ><b>Team Number</b></td>
                        <td className="text-center align-middle" ><b>Auto Amp</b></td>
                        <td className="text-center align-middle" ><b>Auto Speaker</b></td>
                        <td className="text-center align-middle" ><b>Tele Amp</b></td>
                        <td className="text-center align-middle" ><b>Tele Speaker</b></td>
                        <td className="text-center align-middle" ><b>Trap</b></td>
                        <td className="text-center align-middle" ><b>Total Tele</b></td>
                        <td className="text-center align-middle" ><b>Climb*</b></td>
                        <td className="text-center align-middle" ><b>Total Points</b></td>
                    </tr>
                    <tr>
                        <TeamRow2024 teamAverages={getTeamAverage(red1!)!} teamNumber={red1!} alliance='red' teamClick={showTeamMatchByMatch}></TeamRow2024>
                    </tr>
                    <tr>
                        <TeamRow2024 teamAverages={getTeamAverage(red2!)!} teamNumber={red2!} alliance='red' teamClick={showTeamMatchByMatch}></TeamRow2024>
                    </tr>
                    <tr>
                        <TeamRow2024 teamAverages={getTeamAverage(red3!)!} teamNumber={red3!}  alliance='red' teamClick={showTeamMatchByMatch}></TeamRow2024>
                    </tr>
                    <tr>
                        <AverageRow2024 robot1={getTeamAverage(red1!)!} robot2={getTeamAverage(red2!)!} robot3={getTeamAverage(red3!)!} alliance='red'></AverageRow2024>
                    </tr>
                    <tr > <td></td></tr>
                    <tr >
                        <TeamRow2024 teamAverages={getTeamAverage(blue1!)!} teamNumber={blue1!} alliance='blue' teamClick={showTeamMatchByMatch}></TeamRow2024>
                    </tr>
                    <tr>
                        <TeamRow2024 teamAverages={getTeamAverage(blue2!)!} teamNumber={blue2!} alliance='blue' teamClick={showTeamMatchByMatch}></TeamRow2024>
                    </tr>
                    <tr>
                        <TeamRow2024 teamAverages={getTeamAverage(blue3!)!} teamNumber={blue3!} alliance='blue' teamClick={showTeamMatchByMatch}></TeamRow2024>
                    </tr>
                    <tr>
                        <AverageRow2024 robot1={getTeamAverage(blue1!)!} robot2={getTeamAverage(blue2!)!} robot3={getTeamAverage(blue3!)!} alliance='blue'></AverageRow2024>
                    </tr>

                </tbody>
            </table>
            <div>*Success Rate and number of successful climbs</div>

            <RRModal
                title={teamNumber?.toString()!}
                body={<TeamDetails teamNumber={teamNumber!} ></TeamDetails>}
                showModal={showModal}
                onHide={() => { setShowModal(false) }}
            />

        </div>
    )
}