
const ToLocaleString = (number)=>{
  const newNum = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return newNum
}
export default ToLocaleString