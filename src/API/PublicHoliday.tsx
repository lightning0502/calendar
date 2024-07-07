import axios, { AxiosError, AxiosResponse } from 'axios';

const API_URL = 'https://date.nager.at/api/v3/PublicHolidays';

export interface Interface_PublicHoliday {
    date: string;
    localName: string;
    name: string;
    countryCode: string;
    fixed: boolean;
    global: boolean;
    counties?: string[];
    launchYear?: number;
    type: string;
}

const GetPublicHolidays = async (array_Year : number[], setList_Holiday : (responseData : Interface_PublicHoliday[]) => void) => {
    // null check
    if (!array_Year)
        return;

    let year_Start = array_Year[0], year_End = array_Year[1], count = array_Year.length;
    const array_AllHolidays : Interface_PublicHoliday[] = [];

    console.log("year_Start : ", year_Start, " / year_End : ", year_End);

    while(year_Start <= year_End)
    {
        await axios.get<Interface_PublicHoliday[]>(API_URL + "/" + year_Start + "/KR")
        .then((response : AxiosResponse) => {
            array_AllHolidays.push(...response.data);
            console.log("[OK] API_GetPublicHolidays response : ", response.data);
        })
        .catch((error : AxiosError) => {
            setList_Holiday([]);
            console.error("[ERROR] API_GetPublicHolidays : ", error.message, " / code : " + error.code);

            return;
        })

        ++year_Start;
    }

    // set unique array ? setList_Holiday(Array.from(new Set(array_AllHolidays)));
    setList_Holiday(array_AllHolidays);
};

const API = {
    GetPublicHolidays
}

export default API;