/* eslint-disable react-hooks/exhaustive-deps */
import axios, { AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { useAlert } from "react-bootstrap-hooks-alert";
import eventContext from "../Contexts/EventContexts";
import { urlTeamAverages, urlPicklist, urlMatchData } from "../endpoints";
import { TeamAveragesDTO } from "../MatchStrategy/MatchStrategy.model";
import { matchDataDTO } from "../TeamParser/TeamParser.model";
import Button from "../Utils/Button";
import { dynamicSort } from "../Utils/HelperFunctions";
import RRModal from "../Utils/RRModal";
import TeamMatchByMatchTable from "../Utils/TeamMatchByMatchTable";
import { PicklistOrderDTO } from "./Picklist.model";
import TeamRowPicklist from "./TeamRowPicklist";
import { utils, writeFile } from 'xlsx'
import ExportButton from "../Utils/ExportButton";




export default function Picklist() {    
    const editMode = 'Edit';
    const allianceSelectionMode = 'AllianceSelection'


    const [teamAverages, setTeamAverages] = useState<TeamAveragesDTO[]>([]);
    const [order, setOrder] = useState<PicklistOrderDTO[]>([]);
    const [mode, setMode] = useState<string>(editMode);

    const [showModal, setShowModal] = useState<boolean>(false);
    const [matchByMatch, setMatchByMatch] = useState<matchDataDTO[]>([]);

    const [draggedElement, setDraggedElement] = useState<TeamAveragesDTO | undefined>(undefined);

    const { danger, success } = useAlert();

    const { eventCode } = useContext(eventContext);

    useEffect(() => {
        loadData();
    }, [eventCode]);


    function loadData() {
        axios.get(`${urlTeamAverages}/getteamaverages`, {
            params: {
                eventID: eventCode
            },
        })
            .then((response: AxiosResponse<TeamAveragesDTO[]>) => {
                let averages = response.data.sort(dynamicSort("totalTeleAvg", true));
                setTeamAverages(averages);

                axios.get(`${urlPicklist}/getorder`, {
                    params: {
                        eventID: eventCode
                    },
                })
                    .then((response: AxiosResponse<PicklistOrderDTO[]>) => {
                        let teamOrder = response.data
                        setOrder(teamOrder)
                        orderAverages(teamOrder, averages)
                    })

            })
    }

    function orderAverages(picklistOrder: PicklistOrderDTO[], averages: TeamAveragesDTO[] ) {
        let teamOrder = picklistOrder.map(x => x.teamNumber);
        averages.sort((a, b) => teamOrder.indexOf(a.teamNumber) - teamOrder.indexOf(b.teamNumber));
        setTeamAverages(averages);
    }



    function handleDragStart(item: TeamAveragesDTO) {
        setDraggedElement(item);
    }
    function handleDragOver(item: TeamAveragesDTO) {
        if (!draggedElement) {
            return;
        }
        if (item.teamNumber !== draggedElement.teamNumber) {
            const draggedElementIndex = teamAverages.findIndex(x => x.teamNumber === draggedElement.teamNumber);
            const categoryIndex = teamAverages.findIndex(x => x.teamNumber === item.teamNumber);

            const ranked = [...teamAverages];
            ranked[categoryIndex] = draggedElement;
            ranked[draggedElementIndex] = item;
            setTeamAverages(ranked);
        }
    }
    function moveDown(team: TeamAveragesDTO) {
        let newArray = [...teamAverages];
        let index = newArray.findIndex(x => x.teamNumber === team.teamNumber)
        newArray.push(newArray[index])
        newArray.splice(index, 1);
        setTeamAverages(newArray);
    }

   async function saveOrder() {
        let newOrder: PicklistOrderDTO[] = [];
        teamAverages.forEach((team) => {
            let newTeam: PicklistOrderDTO = {
                id: 1,
                teamNumber: team.teamNumber,
                eventCode: team.eventCode,
                order: (teamAverages.indexOf(team) + 1)
            }
            newOrder.push(newTeam);
        });
        await axios.post(`${urlPicklist}/save`, newOrder).then(() => {
            loadData();
            success("Successfully saved rankings")
        })
   }

    function showTeamMatchByMatch(team: number) {
        axios.get(`${urlMatchData}/getbyteam`, {
            params: {
                eventID: eventCode,
                teamNumber: Number(team)
            },
        })
            .then((response: AxiosResponse<matchDataDTO[]>) => {
                let matchByMatch = response.data.sort(dynamicSort("matchNumber", false));
                setMatchByMatch(matchByMatch);
                setShowModal(true);
            })
    }

    return (
        <div className="container w-80" >
            <h3 className="text-center align-middle ">Picklist</h3>


            <Row>
                <Col className="text-center align-middle">
                    {mode === editMode ? <Button className="btn btn-primary btn-block mt-3 " onClick={() => setMode(allianceSelectionMode)} > Change to Alliance Selection Mode</Button>
                                        : <Button className="btn btn-primary btn-block mt-3 " onClick={() => setMode(editMode)} > Change to Edit Mode</Button>}
                </Col>
                <Col className="text-center align-middle">
                    <Button className="btn btn-primary btn-block mt-3 " onClick={() => saveOrder()} > Save Picklist</Button>
                </Col>
                <Col className="text-center align-middle">
                    <ExportButton className="btn btn-primary btn-block mt-3 " data={teamAverages} workbookName={"Picklist" }  > Export Picklist</ExportButton>
                </Col>
            </Row>
            <Table>
                <thead>
                    <tr className="font-weight-bold">
                        {mode === 'AllianceSelection' ? <td></td> : <></> }
                        <td></td>
                        <td className="text-center align-middle" ><b>Team</b></td>
                        <td className="text-center align-middle" ><b>Auto Flat</b></td>
                        <td className="text-center align-middle" ><b>Auto Bump</b></td>
                        <td className="text-center align-middle" ><b>Auto Mid</b></td>
                        <td className="text-center align-middle" ><b>Auto Mid Engage</b></td>
                        <td className="text-center align-middle" ><b>Total Tele</b></td>
                        {mode==='Edit'? <td></td> : <></> }
                    </tr>
                </thead>
                <tbody>
                    {teamAverages?.map((item, index) => <tr key={index}
                        draggable={mode===editMode}
                        onDragStart={() => handleDragStart(item)}
                        onDragOver={() => handleDragOver(item)}>
                        <TeamRowPicklist index={index + 1} team={item} allTeams={teamAverages} dnp={moveDown} mode={mode} teamClick={showTeamMatchByMatch }></TeamRowPicklist>
                    </tr>)}
                </tbody>
            </Table>

            <RRModal
                title="Match By Match Data"
                body={<TeamMatchByMatchTable matchData={matchByMatch} />}
                showModal={showModal}
                onHide={() => { setShowModal(false) }}

            />

        </div>
    )
}