import axios, { AxiosResponse } from "axios";
import { useEffect, useState, useContext } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { urlEvent, urlMatchData, urlTeamAverages } from "../endpoints";
import { TeamAveragesDTO } from "../MatchStrategy/MatchStrategy.model";
import DropDown from "../Utils/DropDown";
import { convertNumbersToFormItem, dynamicSort } from "../Utils/HelperFunctions";
import { formItem } from "../Utils/Utils.models";
import { matchDataDTO } from "./TeamParser.model";
import TeamMatchByMatchTable2023 from "../TeamDetails/TeamMatchByMatchTable2023";
import eventContext from "../Contexts/EventContexts";




export default function TeamParser() {    
    const [teamList, setTeamList] = useState<formItem[]>([]);
    const [team, setTeam] = useState<string>('');
    const [teamAverages, setTeamAverages] = useState<TeamAveragesDTO[]>([]);
    const [matchByMatch, setMatchByMatch] = useState<matchDataDTO[]>([]);

    const { eventCode } = useContext(eventContext);

    useEffect(() => {
        loadTeamList();
        loadAverages();
        getTeamMatchByMatch();
    }, [eventCode]);

    useEffect(() => {
        getTeamMatchByMatch();
    }, [team]);

    function loadTeamList() {
        axios.get(`${urlEvent}/getteamlist`, {
            params: {
                eventID: eventCode
            },
        })
            .then((response: AxiosResponse<number[]>) => {
                setTeamList(convertNumbersToFormItem(response.data));
            })
    }
    function loadAverages() {
        axios.get(`${urlTeamAverages}/getteamaverages`, {
            params: {
                eventID: eventCode
            },
        })
            .then((response: AxiosResponse<TeamAveragesDTO[]>) => {
                setTeamAverages(response.data);
            })
    }
    function getTeamMatchByMatch() {
        axios.get(`${urlMatchData}/getbyteam`, {
            params: {
                eventID: eventCode,
                teamNumber: Number(team)
            },
        })
            .then((response: AxiosResponse<matchDataDTO[]>) => {
                let matchByMatch = response.data.sort(dynamicSort("matchNumber", false));
                setMatchByMatch(matchByMatch);
            })
    }







    return (
        <div className="container w-80" >
            <h3 className="text-center align-middle">Team Parser</h3>
            <Row >
                <Col className='col-md-auto mt-1'><h5>Select Team:</h5></Col>
                <Col className='col-md-auto'><DropDown Options={teamList} DefaultOption='Select Team' selectOptions={setTeam} selectedOption={team} ></DropDown> </Col>
            </Row>

            {/*<Table>*/}
            {/*    <thead>*/}
            {/*        <tr className="font-weight-bold">*/}
            {/*            <td className="text-center align-middle" ><b>Auto Flat</b></td>*/}
            {/*            <td className="text-center align-middle" ><b>Auto Bump</b></td>*/}
            {/*            <td className="text-center align-middle" ><b>Auto Mid</b></td>*/}
            {/*            <td className="text-center align-middle" ><b>Auto Mid Engage</b></td>*/}
            {/*            <td className="text-center align-middle" ><b>Total Tele</b></td>*/}
            {/*            <td className="text-center align-middle" ><b>Adjusted Total</b></td>*/}
            {/*        </tr>*/}
            {/*    </thead>*/}
            {/*</Table>*/}

            {team !== 'Select Team' ? <TeamMatchByMatchTable2023 matchData={matchByMatch} /> : <></> }





        </div>

    )
}