import React from 'react'

import { retrieveItem } from "../Utils/LocalStorage";


const eventContext = React.createContext<{
    eventCode: string;
    updateEvent(eventCode: string): void
}>({ eventCode: retrieveItem('eventcode'), updateEvent: () => { } });



export default eventContext;