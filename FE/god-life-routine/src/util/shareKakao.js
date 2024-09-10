
const {Kakao} = window;
const shareKakao = async (team_id) => {
await Kakao.Share.sendCustom({
    templateId: 112039,
    templateArgs: {
        'team_id': team_id,
    },
  });
}

export default shareKakao;