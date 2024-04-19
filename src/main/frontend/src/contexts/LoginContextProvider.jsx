import {createContext, useEffect, useState} from "react";
import api from "../apis/api";
import Cookies from 'js-cookie';
import * as auth from '../apis/auth';
import {useNavigate} from "react-router-dom";

export const LoginContext = createContext();
LoginContext.displayName = 'LoginContextName';

/**
 * 로그인
 * 로그인 정보
 * 로그아웃
 */

const LoginContextProvider = ({children}) => {


    /*
        상태
        -로그인 여부
        -유저 정보
        -권한 정보
        -아이디 저장

     */
    // context value: 로그인 여부, 로그아웃 함수
    const [isLogin, setLogin] = useState(false);

    // 유저 정보
    const [userInfo, setUserInfo] = useState({})

    // 아이디 저장
    const [remberUserId, setRemberUserid] = useState()

    const [cafeInfo, setCafeInfo] = useState({})

    // 페이지 이동
    const navigate = useNavigate()

    // 카페 리스트
    const [cafes, setCafes] = useState([]);

    // 사용자가 등록한 카페 리스트
    const [myCafes, setMyCafes] = useState([]);

    // 예약 리스트
    const [reservations, setReservations] = useState([])

    //카페 예약
    const [reserv, setReserv] = useState('');



    const loginCheck = async () => {


        const accessToken = Cookies.get("accessToken")
        console.log(`accessToken : ${accessToken}`);

        if (!accessToken) {
            console.log(`쿠키에 accessToken(jwt)이 없음`);
            logoutSetting()
            return
        }

        // header 에 jwt 담기
        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`

        // 사용자 정보 요청
        try {
            const response = await auth.info();
            const data = response.data;
            console.log(`data: ${data}`);

            // 인증 성공 시 로그인 설정
            if (response.status === 200) {
                console.log("사용자 인증 정보 요청 성공");
                loginSetting(data, accessToken);
            } else {
                console.error(`인증 실패: Status ${response.status}`);
                logoutSetting();
            }
        } catch (error) {
            console.error("인증 요청 중 오류 발생:", error.response ? error.response.status : "No response");
            logoutSetting();
        }
    }


    // 로그인
    const login = async (username, password) => {
        console.log(`username : ${username}`)
        console.log(`password : ${password}`)

        try{
            const response = await auth.login(username, password)
            const data = response.data
            const status = response.status
            const headers = response.headers
            const authorization = headers.authorization
            const accessToken = authorization.replace("Bearer ", "") // jwt

            console.log(`data : ${data}`);
            console.log(`status : ${status}`);
            console.log(`headers : ${headers}`);
            console.log(`jwt : ${accessToken}`);

            if (status === 200) {
                //     쿠키에 accessToken(jwt) 저장
                Cookies.set("accessToken", accessToken)


                loginCheck()

                alert("로그인 성공");

                navigate("/")
            }
        } catch (error) {
             alert("로그인 실패!");
        }

    }


    // 로그인 세팅
    // userData, accessToken (jwt)
    const loginSetting = (userData, accessToken) => {
        console.log("Received userData:", userData);
        const {idx, nickname, email} = userData

        console.log(idx);
        console.log(nickname);
        console.log(email);

        //     axios 객체의 header(Authorization : `Bearer ${accessToken}`)
        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;


        //     로그인 여부: true

        setLogin(true);

        //     유저 정보 세팅
        const updatedUserInfo = {idx, nickname, email}
        setUserInfo(updatedUserInfo)


        //     권한 정보 세팅


    }

    // 로그아웃 세팅
    const logoutSetting = () => {
        api.defaults.headers.common.Authorization = undefined;
        Cookies.remove("accessToken")

        setLogin(false);
        setUserInfo(null);
    }

    const logout = () => {

        if(isLogin){
            const check = window.confirm(`로그아웃 하시겠습니까?`);

            if (check) {
                    logoutSetting();

                    navigate("/");
                }
        }
        else{
            navigate("/login")
        }
    }

    // 카페 리스트
    const cafeList = async () => {
        try {

        const response = await auth.cafeList();
        setCafes(response.data);
        console.log(`cafe response: ${response.data}`);
        console.log(response.data)

        } catch(error){
            console.log(error);
        }
    }

    // 사용자가 등록한 카페 리스트
    const myCafeList = async (owner) => {
        try {
            const response = await auth.myCafeList(owner);
            const data = response.data;
            setMyCafes(data)
            console.log(data)
        } catch (error){
            console.log(error);
        }
    }

    // 사용자가 입력한 예약 정보 전달
    const reservation = async (data) => {

        try{
            const response = await auth.cafeReservation(data);
            setReserv(response.data)
            console.log(`Reservation success : ${response.data}`)
            return response.data;

        }catch(error){
            console.error(`Reservation fail : ${error.response}`)
            throw error;
        }
    }

    // 카페 예약 버튼을 누르면 선택한 카페의 데이터가 예약페이지로 전달됨
    const reservationClick = (cafe) => {


        navigate('/cafereservation', {
            state: {
                idx: cafe.idx,
                name: cafe.name,
                address: cafe.address,
                openTime: cafe.openTime,
                closeTime: cafe.closeTime,
                tableNum: cafe.tableNum,
            },
        });
    }

    // 사용자가 예약한 리스트 출력
    const reservationList = async (idx) => {
        if (typeof idx !== 'undefined') {
            try {
                const response = await auth.reservationList(idx);
                const data = response.data;
                console.log(data);
                setReservations(data)
            } catch (error) {
                console.error(`예약 목록 조회 실패: ${error}`);
            }
        } else {
            console.error('유저 인덱스가 정의되지 않음');
        }
    }





    const reservationlist = () => {
        // 마이페이지에서 My Reservations 클릭하면 넘어감
        navigate("/reservationlist")
    }

    const myCafe = () => {
        // 마이페이지에서 My Cafes 클릭하면 넘어감
        navigate("/mycafe")
    }



    const cafeReservation = (cafe) => {
        // 카페 리스트에서 예약 버튼 클릭하면 그 카페에 대한 예약페이지로 넘어감
        navigate("/cafereservation",{state:{cafe}});
    }


    useEffect(() => {

        loginCheck()
    }, []);

    return (
        <div>
            <LoginContext.Provider value={{
                loginCheck,
                isLogin,
                userInfo,
                cafeReservation,
                logout,
                login,
                reservationlist,
                myCafe,
                cafeList,
                reservation,
                cafes,
                reservationClick,
                reservationList,
                reservations,
                myCafeList,
                myCafes
            }}>
                {children}
            </LoginContext.Provider>

        </div>
    )
}
export default LoginContextProvider;