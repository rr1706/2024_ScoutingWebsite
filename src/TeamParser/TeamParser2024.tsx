import axios, { AxiosResponse } from "axios";
import { useEffect, useState, useContext } from "react";
import { Col, Row} from "react-bootstrap";
import { urlEvent2024, urlMatchData2024 } from "../endpoints";
import DropDown from "../Utils/DropDown";
import { convertNumbersToFormItem, dynamicSort } from "../Utils/HelperFunctions";
import { formItem } from "../Utils/Utils.models";
import eventContext from "../Contexts/EventContexts";
import { matchDataDTO_2024, TeamAveragesDTO_2024 } from "../Utils/Utils.models";
import TeamDetails from "../Utils/TeamDetails";




export default function TeamParser2024() {    
    const [teamList, setTeamList] = useState<formItem[]>([]);
    const [team, setTeam] = useState<string>('');
    const [matchByMatch, setMatchByMatch] = useState<matchDataDTO_2024[]>([]);

    const { eventCode } = useContext(eventContext);

    useEffect(() => {
        loadTeamList();
        getTeamMatchByMatch();
    }, [eventCode]);

    useEffect(() => {
        getTeamMatchByMatch();
    }, [team]);

    function loadTeamList() {
        axios.get(`${urlEvent2024}/getteamlist`, {
            params: {
                eventID: eventCode
            },
        })
            .then((response: AxiosResponse<number[]>) => {
                setTeamList(convertNumbersToFormItem(response.data));
            })
    }
    function getTeamMatchByMatch() {
        axios.get(`${urlMatchData2024}/getbyteam`, {
            params: {
                eventID: eventCode,
                teamNumber: Number(team)
            },
        })
            .then((response: AxiosResponse<matchDataDTO_2024[]>) => {
                let matchByMatch = response.data.sort(dynamicSort("matchNumber", false));
                setMatchByMatch(matchByMatch);
            })
    }







    return (
        <div className="container w-80" >
            <h3 className="text-center align-middle RRBlue">Team Parser</h3>
            <Row>
                <Col className='col-md-auto mt-1'><h5>Select Team:</h5></Col>
                <Col className='col-md-auto'><DropDown Options={teamList} DefaultOption='Select Team' selectOptions={setTeam} selectedOption={team} ></DropDown> </Col>
            </Row>

            {!(team === '') ?
                <TeamDetails teamNumber={Number(team)} ></TeamDetails>
            : <></>}





        </div>

    )
}