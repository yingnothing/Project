// 获取当前时分
export const getTime=()=>{
    const time=new Date().getHours()
    let mes=''
    switch(true){
        case(5<time&&time<11):
            mes='上午好';
            break;
        case(11<=time&&time<=13):
            mes='中午好';
            break;
        case(13<time&&time<=18):
            mes='下午好';
            break;
        default:
            mes='晚上好';
            break;
    }
    return mes
}