import Header from "../components/Header";
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';


const Dashboard = () => {

    const {user, setUser} = useContext(UserContext);

    return (
        <>
        <Header />
        <div className="iframe_container" dangerouslySetInnerHTML={{ __html: "<iframe src='https://sense-demo.qlik.com/sso/single/?appid=cd840389-f841-4477-86be-532fb0b13775&sheet=aLvPhq&opt=ctxmenu,currsel' />"}} />
        </>
        )  
}

export default Dashboard;