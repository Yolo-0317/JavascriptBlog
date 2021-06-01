// 累计专项附加扣除
const CumulativeSpecialAdditional = [
  {
    key: 'rent', label: '租房', value: 1500,
  },
  {
    key: 'housingLoan', label: '房贷', value: 1000,
  },
  {
    key: 'educationForChildren', label: '子女教育', value: 1000,
  },
  {
    key: 'continuingEducation', label: '继续教育', value: 3600,
  },
  {
    key: 'continuingEducation', label: '继续教育', value: 3600,
  },
];

// 起征点
const StartingPoint = 5000;

// 累计五险一金（个人缴纳部分） 生育和工伤不存在个人缴存情况
const CumulativeFiveInsurancesAndOneFund = {
  pension: 0.08, // 养老
  medical: 0.02, // 医疗
  unemployment: 0.005, // 失业
  housingFund: 0.05, // 住房公积金
};

module.exports = {
  StartingPoint,
  CumulativeFiveInsurancesAndOneFund,
  CumulativeSpecialAdditional,
};
