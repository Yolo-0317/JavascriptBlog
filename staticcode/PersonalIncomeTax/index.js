// 累计应纳税所得额= 累计税前工资收入 - 累计五险一金（个人缴纳部分） - 累计专项附加扣除 - 累计减除费用+奖金
// 累计减除费用=5000（起征点）*累计月数
// 五险一金如果缴全个人部分（上海）=累计税前工资收入*23%
const {
  StartingPoint,
  CumulativeFiveInsurancesAndOneFund,
  CumulativeSpecialAdditional,
} = require('./constants');

const {
  pension, medical, unemployment, housingFund,
} = CumulativeFiveInsurancesAndOneFund;

const incomeBeforeTax = 18815;
const cfiof = incomeBeforeTax * (pension + medical + unemployment + housingFund); // 累计五险一金（个人缴纳部分）
const pensionValue = incomeBeforeTax * pension; // 养老保险
const medicalValue = incomeBeforeTax * medical; // 医疗保险
const unemploymentValue = incomeBeforeTax * unemployment; // 失业保险
const housingFundValue = incomeBeforeTax * housingFund; // 公积金
const csa = 0; // 累计专项附加扣除

console.log(`累计五险一金（个人缴纳部分）：${cfiof.toFixed(2)}`);
console.log(`养老金：${pensionValue.toFixed(2)}`);
console.log(`医疗保险：${medicalValue.toFixed(2)}`);
console.log(`失业保险：${unemploymentValue.toFixed(2)}`);
console.log(`公积金：${housingFundValue.toFixed(2)}`);
console.log(99.3 / 18815);
