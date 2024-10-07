import { useCallback, useState } from "react";
import Picker from "react-mobile-picker";
import Header from "../components/Header";
import { useMutation } from "@tanstack/react-query";
import useRoomInfo from "../store/useRoomInfo";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { updateTeamMissionRule } from "../api/teamMissionApi";
import { updatePersonalMission } from "../api/personalMissionApi";

const selections = {
  meridiem: ["오전", "오후"],
  hour: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
  minute: [
    "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
    "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40",
    "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59",
  ],
};

export default function MyPicker() {
  const navigate = useNavigate();
  const now = new Date();
  const location = useLocation();
  const {teamId} = useParams();
  const [pickerValue, setPickerValue] = useState({
    meridiem: now.getHours() < 12 ? "오전": "오후",
    hour: now.getHours() % 12,
    minute: now.getMinutes(),
  });

  const { roomNumber, roomType, rule } = useRoomInfo();
  const onNavigateNextPage = ()=>{
    const uri = roomType === "team" ? `/teamMission/${roomNumber}` : `/personalMission`
    navigate(uri);
  }

  const { mutate: updateMissionSetting } = useMutation({
    mutationFn: (ruleData) => location.pathname.includes('team') ? updateTeamMissionRule(teamId, ruleData) : updatePersonalMission(ruleData),
    onSuccess: onNavigateNextPage

  });

  const onClickConfirmBtn = useCallback(async () => {
    await updateMissionSetting({
      meridiem: pickerValue.meridiem,
      time: `${pickerValue.hour.toString().padStart(2, '0')}:${pickerValue.minute.toString().padStart(2, '0')}`,
    });
  },[roomType, pickerValue,rule]);
  const formattedTime = `${pickerValue.meridiem} ${pickerValue.hour}시 ${pickerValue.minute}분`;
  
  

  return (
    <div>
      <Header title={"시간 등록"} color={"orange"} />
      <div className="text-left p-12 pt-14 mt-10">
        <div className="text-base mb-1 text-gray-500">송창송창용팀</div>
        <div className="flex items-center mb-4">
          <div className="text-2xl font-bold mr-2">일찍 일어나기</div>
          <div className="text-sm pt-3 text-gray-500">미션</div>
        </div>

        <div className="pt-20 relative">
          <Picker value={pickerValue} onChange={setPickerValue}>
            <div>
              <div className="absolute top-[50%] left-0 right-0 transform -translate-y-1/2 h-[40px] bg-gray-100  pointer-events-none"></div>
            </div>
            {Object.keys(selections).map((name) => (
              <Picker.Column key={name} name={name}>
                {selections[name].map((option) => (
                  <Picker.Item
                  key={option}
                  value={option}
                  className={`${pickerValue[name] === option ? "" : "text-xl"}`}
                  style={pickerValue[name] === option ? { fontSize: "1.5rem", fontWeight: "bold" } : {}}
                >
                    {option}
                  </Picker.Item>
                ))}
              </Picker.Column>
            ))}
          </Picker>
        </div>
        <div className="text-base text-gray-500 text-center pt-10">
          현재 선택된 시간은 {formattedTime} 입니다.
        </div>

        <div className="flex justify-center items-center pt-40">
          <button onClick={onClickConfirmBtn} className="bg-orange-400 text-white px-10 py-3 rounded-lg text-xl">
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
