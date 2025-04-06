import axios, { AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import eventContext from "../Contexts/EventContexts";
import { urlEvent2025, urlTeamAverages2025 } from "../endpoints";
import DropDown from "../Utils/DropDown";
import { convertStringsToFormItem } from "../Utils/HelperFunctions";
import { formItem, MatchDTO } from "../Utils/Utils.models";
import AverageRow2025 from "./AverageRow2025";
import { TeamAveragesDTO_2025 } from "../Utils/Utils.models";
import TeamRow2025 from "./TeamRow2025";
import TeamDetails from "../TeamDetails/TeamDetails";
import RRModal from "../Utils/RRModal";
import Button from "../Utils/Button";

export default function MatchStrategy2025() {
    const [teamList, setTeamList] = useState<formItem[]>([]);
    const [teamAverages, setTeamAverages] = useState<TeamAveragesDTO_2025[]>([]);
    const [matchSchedule, setMatchSchedule] = useState<MatchDTO[]>([]);
    const [matches, setMatches] = useState<formItem[]>([]);

    const [selectedMatch, setSelectedMatch] = useState<MatchDTO>();

    const [teamNumber, setTeamNumber] = useState<number>();

    const [showModal, setShowModal] = useState<boolean>(false);
    const [showIndividualTeams, setShowIndividualTeams] = useState<boolean>(false);

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
        axios.get(`${urlEvent2025}/getmatchschedule`, {
            params: {
                eventID: eventCode
            },
        })
            .then((response: AxiosResponse<MatchDTO[]>) => {
                setMatchSchedule(response.data);
                setMatches(convertStringsToFormItem(response.data.map(x => x.matchNumber.toString())));
            });
    }

    function loadTeamAverages() {
        axios.get(`${urlTeamAverages2025}/getteamaverages`, {
            params: {
                eventID: eventCode
            },
        })
            .then((response: AxiosResponse<TeamAveragesDTO_2025[]>) => {
                setTeamAverages(response.data);
                setTeamList(convertStringsToFormItem(response.data.map(x => x.teamNumber!.toString())));
            });
    }

    function getTeamAverage(teamNumber: string) {
        return teamAverages.find((average) => {
            return average.teamNumber === parseInt(teamNumber, 10);
        });
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
        <div className="container-fluid">
            <h3 className="text-center align-middle RRBlue">Match Strategy</h3>

            <Row className="m-3">
                <Col xs={12} md="auto" className="mt-1">
                    <h5>Match Number:</h5>
                </Col>
                <Col xs={12} md="auto">
                    <DropDown Options={matches} DefaultOption="Select match" selectOptions={handleSelectedEvent} selectedOption={selectedMatch ? selectedMatch.matchNumber.toString() : undefined} />
                </Col>
                <Col xs={12} md="auto">
                    <Button onClick={() => setShowIndividualTeams(!showIndividualTeams)}>Select Individual Teams</Button>
                </Col>
            </Row>

            {showIndividualTeams ?
                <Row>
                    <Col xs={12} md={2}>
                        <DropDown Options={teamList} DefaultOption="Red 1" selectOptions={setRed1} selectedOption={red1} />
                    </Col>
                    <Col xs={12} md={2}>
                        <DropDown Options={teamList} DefaultOption="Red 2" selectOptions={setRed2} selectedOption={red2} />
                    </Col>
                    <Col xs={12} md={2}>
                        <DropDown Options={teamList} DefaultOption="Red 3" selectOptions={setRed3} selectedOption={red3} />
                    </Col>
                    <Col xs={12} md={2}>
                        <DropDown Options={teamList} DefaultOption="Blue 1" selectOptions={setBlue1} selectedOption={blue1} />
                    </Col>
                    <Col xs={12} md={2}>
                        <DropDown Options={teamList} DefaultOption="Blue 2" selectOptions={setBlue2} selectedOption={blue2} />
                    </Col>
                    <Col xs={12} md={2}>
                        <DropDown Options={teamList} DefaultOption="Blue 3" selectOptions={setBlue3} selectedOption={blue3} />
                    </Col>
                </Row>
                : <></>
            }

            <hr />

            <div className="table-responsive">
                <table className="table table-bordered">
                    <tbody>
                        <tr className="font-weight-bold">
                            <td className="text-center align-middle"><b>Team</b></td>
                            <td className="text-center align-middle"><b>Mobility</b></td>
                            <td className="text-center align-middle"><b>Auto Mid Coral</b></td>
                            <td className="text-center align-middle"><b>Auto Mid Net</b></td>
                            <td className="text-center align-middle"><b>Auto Side Coral</b></td>
                            <td className="text-center align-middle"><b>Tele Coral</b></td>
                            <td className="text-center align-middle"><b>Processor</b></td>
                            <td className="text-center align-middle"><b>Barge</b></td>
                            <td className="text-center align-middle"><b>Deep Climb</b></td>
                            <td className="text-center align-middle"><b>Total Points</b></td>
                        </tr>
                        <tr>
                            <TeamRow2025 teamAverages={getTeamAverage(red1!)!} teamNumber={red1!} alliance="red" teamClick={showTeamMatchByMatch} />
                        </tr>
                        <tr>
                            <TeamRow2025 teamAverages={getTeamAverage(red2!)!} teamNumber={red2!} alliance="red" teamClick={showTeamMatchByMatch} />
                        </tr>
                        <tr>
                            <TeamRow2025 teamAverages={getTeamAverage(red3!)!} teamNumber={red3!} alliance="red" teamClick={showTeamMatchByMatch} />
                        </tr>
                        <tr>
                            <AverageRow2025 robot1={getTeamAverage(red1!)!} robot2={getTeamAverage(red2!)!} robot3={getTeamAverage(red3!)!} alliance="red" />
                        </tr>
                        <tr><td colSpan={9}></td></tr>
                        <tr>
                            <TeamRow2025 teamAverages={getTeamAverage(blue1!)!} teamNumber={blue1!} alliance="blue" teamClick={showTeamMatchByMatch} />
                        </tr>
                        <tr>
                            <TeamRow2025 teamAverages={getTeamAverage(blue2!)!} teamNumber={blue2!} alliance="blue" teamClick={showTeamMatchByMatch} />
                        </tr>
                        <tr>
                            <TeamRow2025 teamAverages={getTeamAverage(blue3!)!} teamNumber={blue3!} alliance="blue" teamClick={showTeamMatchByMatch} />
                        </tr>
                        <tr>
                            <AverageRow2025 robot1={getTeamAverage(blue1!)!} robot2={getTeamAverage(blue2!)!} robot3={getTeamAverage(blue3!)!} alliance="blue" />
                        </tr>
                    </tbody>
                </table>
            </div>

            <RRModal
                title={teamNumber?.toString()!}
                body={<TeamDetails teamNumber={teamNumber!} />}
                showModal={showModal}
                onHide={() => { setShowModal(false); }}
            />
        </div>
    );
}

