import React from 'react'

import { retrieveItem } from "../Utils/LocalStorage";


const TBAContext = React.createContext<{
    tbaCode: string;
    updatetbaCode(tbaCode: string): void
}>({ tbaCode: retrieveItem('tbacode'), updatetbaCode: () => { } });



export default TBAContext;