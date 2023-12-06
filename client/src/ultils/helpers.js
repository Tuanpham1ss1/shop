import icons from "./icons"
const {AiFillStar,AiOutlineStar} = icons

export const creatrSlug = string => string.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").split(' ').join('-')
export const formatMoney = number => Number(number?.toFixed(1)).toLocaleString()
export const renderStarFromNumber = (number) => {
    if(!Number(number)) return
    const stars = []
    for(let i=0;i<+number;i++){
        stars.push(<AiFillStar color="orange" />)
    }
    for(let i=5;i>+number;i--){
        stars.push(<AiOutlineStar color="orange"/>)
    }
    return stars
}
export const validate = (payload,setInvalidFields) => {
    let invalids = 0
    const formatPayload = Object.entries(payload)
    for(let arr of formatPayload){
        if(arr[1].trim() ==='') {
            invalids++
            setInvalidFields(prev =>([...prev,{name:arr[0],mes:'Require this field.'}]))
        }
    }
    for(let arr of formatPayload){
        switch(arr[0]){
            case 'email':
                const re =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                if(!arr[1].match(re)){
                    invalids++
                    setInvalidFields(prev =>([...prev,{name:arr[0],mes:'Email invalid.'}]))
                }
                break;
            case 'password':
                if(arr[1].length<6){
                    invalids++
                    setInvalidFields(prev =>([...prev,{name:arr[0],mes:'Password minium 6 charactor.'}]))
                }
            default:
                break;
        }
    }

    return invalids
}
export const formatPrice = number => Math.round(number/1000)*1000

export const generatRange = (start,end) => {
    const length = end+1 -start
    return Array.from({length},(_,index) => start+index )
}
export function fileToBase64(file) {
    if (!file) return ''
    return new Promise((resolve,reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
    });
};