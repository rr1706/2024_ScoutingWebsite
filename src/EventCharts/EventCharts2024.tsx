/* eslint-disable @typescript-eslint/no-use-before-define */
import { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { TeamAveragesDTO_2024, formItem } from "../Utils/Utils.models";
import axios, { AxiosResponse } from "axios";
import { urlTeamAverages2024 } from "../endpoints";
import eventContext from "../Contexts/EventContexts";
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    ScatterDataPoint,
    Point,
} from 'chart.js';
import { Line, Scatter } from 'react-chartjs-2';
import { ScatterChartDataset, ScatterDTO } from "./EventChart.model";
import { Button } from "react-bootstrap";
import DropDown from "../Utils/DropDown";

export default function EventCharts() {
    let axisOptions: formItem[] = [
        {
            id: "Auto Total",
            name: "Auto Total"
        },
        {
            id: "Teleop Total",
            name: "Teleop Total"
        },
        {
            id: "Close Auto",
            name: "Close Auto %"
        },
        {
            id: "Center Auto",
            name: "Center Auto"
        },
        {
            id: "Teleop Amp",
            name: "Teleop Amp"
        },
        {
            id: "Teleop Speaker",
            name: "Teleop Speaker"
        },
        {
            id: "Max Feeds",
            name: "Max Feeds"
        },
        {
            id: "Traps",
            name: "Traps"
        },
        {
            id: "Climbs",
            name: "Climbs"
        },
    ]


    let defaultScatterPoint: ScatterDataPoint[] = [{ x: 0, y: 0 }]
    let defaultScatterDataSet: ScatterChartDataset = {
        label: "",
        data: defaultScatterPoint,
        backgroundColor: ""
    }
    let defaultScatterDTO: ScatterDTO = { datasets: [defaultScatterDataSet] };

    ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

    const [teamAverages, setTeamAverages] = useState<TeamAveragesDTO_2024[]>([]);
    const [chartData, setChartData] = useState<ScatterDTO>(defaultScatterDTO);
    const [datasets, setDatasets] = useState<ScatterChartDataset[]>([]);

    const [xAxis, setXAxis] = useState<string>('Auto Total');
    const [yAxis, setYAxis] = useState<string>('Teleop Total');

    const { eventCode } = useContext(eventContext);


    useEffect(() => {
        loadData();
    }, [eventCode]);

    useEffect(() => {
        dateChart();
    }, [xAxis,yAxis]);

    let tempDatasets: ScatterChartDataset[] = []
    function loadData() {
        axios.get(`${urlTeamAverages2024}/getteamaverages`, {
            params: {
                eventID: eventCode
            },
        })
            .then((response: AxiosResponse<TeamAveragesDTO_2024[]>) => {
                setTeamAverages(response.data);
                response.data.map((item, index) => (

                    tempDatasets.push({
                        label: item.teamNumber!.toString(),
                        data: [{
                            x: defineProperty(item, xAxis),
                            y: defineProperty(item, yAxis)
                        }],
                        backgroundColor: "#224195",
                    })

                ))
                setDatasets(tempDatasets);


                setChartData({
                    datasets: tempDatasets

                })

            })
    }

    function dateChart() {
        if (teamAverages.length > 0) {
            tempDatasets = [];
            teamAverages.map((item, index) => (
                tempDatasets.push({
                    label: item.teamNumber!.toString(),
                    data: [{
                        x: defineProperty(item, xAxis),
                        y: defineProperty(item, yAxis)
                    }],
                    backgroundColor: "#224195",
                })

            ))
                    setDatasets(tempDatasets);


            setChartData({
                datasets: tempDatasets

            })
        }

    }

    function defineProperty(teamData: TeamAveragesDTO_2024, dropdownValue: string) {
        if (dropdownValue === "Auto Total") {
            return teamData.autoTotalAvg;
        }
        else if (dropdownValue === "Teleop Total") {
            return teamData.teleTotalAvg;
        }
        else if (dropdownValue === "Close Auto") {
            return teamData.closeAutoSuccessRate;
        }
        else if (dropdownValue === "Center Auto") {
            return teamData.centerAutoAvg;
        }
        else if (dropdownValue === "Teleop Amp") {
            return teamData.teleAmpAvg;
        }
        else if (dropdownValue === "Teleop Speaker") {
            return teamData.teleSpeakerAvg;
        }
        else if (dropdownValue === "Max Feeds") {
            return teamData.maxFeeds;
        }
        else if (dropdownValue === "Traps") {
            return teamData.teleTrapAvg;
        }
        else if (dropdownValue === "Climbs") {
            return teamData.climbPercent;
        }
    }

    const options = {
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                display: true,
                title: {
                    display: true,
                    text: yAxis
                }
            },
            x: {
                beginAtZero: true,
                display: true,
                title: {
                    display: true,
                    text: xAxis
                }
            },
        },

    };



    return (<>
        <div className="container w-75" >
            <h3 className="text-center align-middle RRBlue">{xAxis} vs {yAxis}</h3>
            {chartData.datasets[0].data.length > 0 ?
                <Scatter options={options} data={chartData} /> : <></>}
            <Row>
                <Col><h3 className="text-center align-middle RRBlue">X-Axis</h3></Col>
                <Col><h3 className="text-center align-middle RRBlue">Y-Axis</h3></Col>
            </Row>
            <Row>
                <Col><DropDown Options={axisOptions} DefaultOption='None' selectOptions={setXAxis} selectedOption={xAxis} ></DropDown></Col>
                <Col><DropDown Options={axisOptions} DefaultOption='None' selectOptions={setYAxis} selectedOption={yAxis} ></DropDown></Col>
            </Row>
        </div>
    </>)
}