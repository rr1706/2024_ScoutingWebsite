/* eslint-disable react-hooks/exhaustive-deps */
import axios, { AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { useAlert } from "react-bootstrap-hooks-alert";
import eventContext from "../Contexts/EventContexts";
import { urlPicklist, urlTeamAverages2025 } from "../endpoints";
import Button from "../Utils/Button";
import { dynamicSort } from "../Utils/HelperFunctions";
import RRModal from "../Utils/RRModal";
import { PicklistOrderDTO } from "./Picklist.model";
import ExportButton from "../Utils/ExportButton";
import { TeamAveragesDTO_2025 } from "../Utils/Utils.models";
import TeamRowPicklist2025 from "./TeamRowPicklist2025";
import TeamDetails from "../TeamDetails/TeamDetails";
import { useBeforeunload } from 'react-beforeunload';
import ConfirmationDialog from "../Utils/ConfirmationDialog";


export default function Picklist2025() {
    const editMode = 'Edit';
    const allianceSelectionMode = 'AllianceSelection'

    const [teamAverages, setTeamAverages] = useState<TeamAveragesDTO_2025[]>([]);
    const [order, setOrder] = useState<PicklistOrderDTO[]>([]);
    const [mode, setMode] = useState<string>(editMode);
    const [teamNumber, setTeamNumber] = useState<number>();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
    const [draggedElement, setDraggedElement] = useState<TeamAveragesDTO_2025 | undefined>(undefined);
    const [sortDescending, setSortDescending] = useState<boolean>(true);



    const { danger, success } = useAlert();

    const { eventCode } = useContext(eventContext);

    useBeforeunload((event) => event.preventDefault());

    useEffect(() => {
        loadData();
    }, [eventCode]);


    function loadData() {
        axios.get(`${urlTeamAverages2025}/getteamaverages`, {
            params: {
                eventID: eventCode
            },
        })
            .then((response: AxiosResponse<TeamAveragesDTO_2025[]>) => {
                let averages = response.data.sort(dynamicSort("totalPoints", true));
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
                        setDNPs(teamOrder, averages)
                    })
            })
    }

    function loadAverages() {
        let order: PicklistOrderDTO[] = [];

        teamAverages.forEach(function (currentTeam) {
            let currentOrder: PicklistOrderDTO =
            {
                id: 0,
                eventCode: eventCode,
                teamNumber: currentTeam.teamNumber!,
                order: teamAverages.indexOf(currentTeam)
            }

            order.push(currentOrder);
        });

        axios.get(`${urlTeamAverages2025}/getteamaverages`, {
            params: {
                eventID: eventCode
            },
        }).then((response: AxiosResponse<TeamAveragesDTO_2025[]>) => {
            orderAverages(order, response.data)

        })
    }

    function orderAverages(picklistOrder: PicklistOrderDTO[], averages: TeamAveragesDTO_2025[]) {
        let teamOrder = picklistOrder.map(x => x.teamNumber);
        averages.sort((a, b) => teamOrder.indexOf(a.teamNumber!) - teamOrder.indexOf(b.teamNumber!));
        setTeamAverages(averages);
    }
    function setDNPs(picklistOrder: PicklistOrderDTO[], averages: TeamAveragesDTO_2025[]) {
        let copyAverages = [...averages];
        picklistOrder.forEach(function (currentOrder) {
            copyAverages.forEach(function (currentAverage) {
                if (currentAverage.teamNumber === currentOrder.teamNumber) {
                    currentAverage.isDNPed = currentOrder.isDNPed;
                }
            })
        });
        setTeamAverages(copyAverages);
    }

    function sortColumn(columnName: string) {
        let newAverages = [...teamAverages]
        newAverages.sort(dynamicSort(columnName, sortDescending));
        setSortDescending(!sortDescending);
        setTeamAverages(newAverages);
    }

    function handleDragStart(item: TeamAveragesDTO_2025) {
        setDraggedElement(item);
    }
    function handleDragOver(item: TeamAveragesDTO_2025) {
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
    function moveDown(team: TeamAveragesDTO_2025) {
        let newArray = [...teamAverages];
        let index = newArray.findIndex(x => x.teamNumber === team.teamNumber);
        if (team.isDNPed != 1) {
            newArray[index].isDNPed = 1;
            newArray.push(newArray[index]);
            newArray.splice(index, 1);
            setTeamAverages(newArray);
        } else {
            newArray[index].isDNPed = 0;
            setTeamAverages(newArray);
        }
    }

    async function saveOrder() {
        setShowConfirmation(false);
        let newOrder: PicklistOrderDTO[] = [];
        teamAverages.forEach((team) => {
            let newTeam: PicklistOrderDTO = {
                id: 1,
                teamNumber: team.teamNumber!,
                eventCode: team.eventCode!,
                order: (teamAverages.indexOf(team) + 1),
                isDNPed: team.isDNPed!
            }
            newOrder.push(newTeam);
        });
        await axios.post(`${urlPicklist}/save`, newOrder).then(() => {
            loadData();
            success("Successfully saved picklist")
        })
    }

    function showTeamMatchByMatch(team: number) {
        setTeamNumber(team);
        setShowModal(true);
    }

    return (
        <div className="container w-90" >
            <h3 className="text-center align-middle RRBlue">Picklist</h3>


            <Row>
                <Col className="text-center align-middle">
                    {mode === editMode ? <Button className="btn btn-primary btn-block mt-3 " onClick={() => setMode(allianceSelectionMode)} > Change to Alliance Selection Mode</Button>
                        : <Button className="btn btn-primary btn-block mt-3 " onClick={() => setMode(editMode)} > Change to Edit Mode</Button>}
                </Col>
                <Col className="text-center align-middle">
                    <Button className="btn btn-primary btn-block mt-3 " onClick={() => setShowConfirmation(true)} > Save Picklist</Button>
                </Col>
                <Col className="text-center align-middle">
                    <ExportButton className="btn btn-primary btn-block mt-3 " data={teamAverages} workbookName={"Picklist"}  > Export Picklist</ExportButton>
                </Col>
            </Row>
            <Table>
                <thead>
                    <tr className="font-weight-bold">
                        {mode === 'AllianceSelection' ? <td></td> : <></>}
                        <td></td>
                        <td className="text-center align-middle" ><Button disabled={mode === allianceSelectionMode} className="btn btn-light" onClick={() => sortColumn("teamNumber")} > <b>Team</b></Button></td>
                        <td className="text-center align-middle" ><Button disabled={mode === allianceSelectionMode} className="btn btn-light" onClick={() => sortColumn("averageAutoCoral")} > <b>Auto Coral</b></Button></td>
                        <td className="text-center align-middle" ><Button disabled={mode === allianceSelectionMode} className="btn btn-light" onClick={() => sortColumn("averageTeleCoral")} > <b>Tele Coral</b></Button></td>
                        <td className="text-center align-middle" ><Button disabled={mode === allianceSelectionMode} className="btn btn-light" onClick={() => sortColumn("averageBargeAll")} > <b>Barge All</b></Button></td>
                        <td className="text-center align-middle" ><Button disabled={mode === allianceSelectionMode} className="btn btn-light" onClick={() => sortColumn("averageProcessorAll")} > <b>Processor All</b></Button></td>
                        <td className="text-center align-middle" ><Button disabled={mode === allianceSelectionMode} className="btn btn-light" onClick={() => sortColumn("successfulShallowClimb")} > <b>Successful Shallow Climb</b></Button></td>
                        <td className="text-center align-middle" ><Button disabled={mode === allianceSelectionMode} className="btn btn-light" onClick={() => sortColumn("succesfullDeepClimb")} > <b>Successful Deep Climb</b></Button></td>


                        {mode === 'Edit' ? <td></td> : <></>}
                    </tr>
                </thead>
                <tbody>
                    {teamAverages?.map((item, index) => <tr key={index}
                        draggable={mode === editMode}
                        onDragStart={() => handleDragStart(item)}
                        onDragOver={() => handleDragOver(item)}>
                        <TeamRowPicklist2025 index={index + 1} team={item} allTeams={teamAverages} dnp={moveDown} mode={mode} teamClick={showTeamMatchByMatch}></TeamRowPicklist2025>
                    </tr>)}
                </tbody>
            </Table>

            <RRModal
                title={teamNumber?.toString()!}
                body={<TeamDetails teamNumber={teamNumber!}  ></TeamDetails>}
                showModal={showModal}
                onHide={() => { setShowModal(false); loadAverages(); }}
            />
            <ConfirmationDialog
                title={"Confirm Save"}
                body={"This will replace current picklist."}
                showModal={showConfirmation}
                onHide={() => { setShowConfirmation(false) }}
                confirmText="Confirm"
                confirmOnClick={saveOrder}
                cancelText="Cancel"
                cancelOnClick={() => { setShowConfirmation(false) }}
            />
        </div>
    )
}