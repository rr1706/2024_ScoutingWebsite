/* eslint-disable @typescript-eslint/no-use-before-define */
import { useContext, useEffect, useState } from "react";
import { TeamAveragesDTO_2024 } from "../Utils/Utils.models";
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

export default function EventCharts() {

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

    const { eventCode } = useContext(eventContext);


    useEffect(() => {
        loadData();
    }, [eventCode]);

    


    function loadData() {
        axios.get(`${urlTeamAverages2024}/getteamaverages`, {
            params: {
                eventID: eventCode
            },
        })
            .then((response: AxiosResponse<TeamAveragesDTO_2024[]>) => {
                setTeamAverages(response.data);

                setChartData({
                    datasets: [{
                        label: "label",
                        data: response.data.map((item, index) => (

                            {
                                x: item.autoTotalAvg,
                                y: item.teleTotalAvg
                            }

                        )),
                        backgroundColor: "rgb(255,90,132)"
                    }]

                })

            })
    }



     const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };


     

    return (<>
        <div className="container w-75" >
            {chartData.datasets[0].data.length > 0 ? 
                <Scatter  options={options} data={chartData}  /> : <></>}

            <Button className="btn btn-primary btn-block mt-3 " onClick={() => console.log(chartData)} > log chart data</Button>
        </div>
    </>)
}