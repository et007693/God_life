import * as yup from "yup";
export const createTeamRoomSchema = yup.object().shape({
    name: yup.string("이름을 입력해주세요").min(1,"이름을 입력해주세요").max(10,"이름은 10자 이하로 입력해주세요").required("이름을 입력해주세요"),
    penalty: yup.number().typeError("벌금을 입력해주세요").positive("벌금은 양수로 입력해주세요").integer("벌금은 정수로 입력해주세요").required("벌금을 입력해주세요"),
    selectedTopic: yup.string("주제를 선택해주세요").required("주제를 선택해주세요"),
    selectedMonth: yup.string("월을 선택해주세요").required("월을 선택해주세요"),
});