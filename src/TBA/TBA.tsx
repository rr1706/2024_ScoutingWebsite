import { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { matchDataDTO_2024 } from "../Utils/Utils.models";
import eventContext from "../Contexts/EventContexts";
import axios, { AxiosResponse } from "axios";
import { urlMatchData2024, urlRobotPictures } from "../endpoints";
import Button from "../Utils/Button";
import { TBAEvent } from "./TBA.model";
import ExportButton from "../Utils/ExportButton";


export default function TBA() {

    const [events, setEvents] = useState<TBAEvent[]>([]);

    async function getEvents() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://www.thebluealliance.com/api/v3/events/2024?X-TBA-Auth-Key=e6O1xGxIT7zsDwNUM1gAb7cNsH71EZ4JhyyvAkBwiw1qDRcEvhsW8CBUCkXxCVA8');
        xhr.onload = function () {
            if (xhr.status === 200) {
                var newEvents: TBAEvent[] = []
                var json = (JSON.parse(xhr.responseText));
                for (var index in json) {
                    var newEvent: TBAEvent = {
                        eventCode: json[index].event_code,
                        eventName : json[index].name
                    }
                    newEvents.push(newEvent);
                }
                setEvents(newEvents);
            }
        };
        xhr.send();
    }


    return (
        <>
            <div className="container w-80" >
                <h3 className="text-center align-middle RRBlue">TBA</h3>
                <Button className="btn btn-primary btn-block mt-3 " onClick={() => getEvents()} > Get Events</Button>
                <ExportButton className="btn btn-primary btn-block mt-3" data={events} disabled={(events.length === 0)} workbookName={"2024 Events"} > Excel Export</ExportButton>
            </div>
        </>
    )
}
