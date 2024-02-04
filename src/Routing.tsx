import { Routes, Route, Navigate } from 'react-router-dom';
import Authorized from './Auth/Authortized';
import Login from './Auth/Login';
import Register from './Auth/Register';
import EventSetup from './EventSetup/EventSetup';
import LandingPage from './LandingPage';
import MatchDataImport from './MatchDataImport/MatchDataImport';
import MatchStrategy2024 from './MatchStrategy/MatchStrategy2024';
import Picklist2024 from './Picklist/Picklist2024';
import TeamParser2024 from './TeamParser/TeamParser2024';


export default function routing() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route path="/matchstrategy" element={<Authorized authorized={< MatchStrategy2024 />} notAuthorized={<Login />}></Authorized>} />
            <Route path="/picklist" element={<Authorized authorized={< Picklist2024 />} notAuthorized={<Login />}></Authorized>} />
            <Route path="/teamparser" element={<Authorized authorized={< TeamParser2024 />} notAuthorized={<Login />}></Authorized>} />
            <Route path="/eventsetup" element={<Authorized authorized={< EventSetup />} notAuthorized={<Login />}></Authorized>} />
            <Route path="/matchdataimport" element={<Authorized authorized={< MatchDataImport />} notAuthorized={<Login />}></Authorized>} />
            <Route path="/login" element={<Login />} />
            <Route path="/registerr" element={< Register /> } />



            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>  
     )
}