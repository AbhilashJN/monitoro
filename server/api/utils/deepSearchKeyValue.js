const isArrayOfObj = (arr)=>{
    return  typeof arr[0] === 'object' &&  !(arr[0] instanceof Array)
}

const isArrayOfArray= (arr)=>{
    return  typeof arr[0] === 'object' &&  arr[0] instanceof Array
}

const handleArray = (arr,skey,sval)=>{
if(arr.length===0 || (!isArrayOfObj(arr) && !isArrayOfArray(arr))){
    return false
}
else if(isArrayOfArray(arr)){
    return arr.some(nestedarr=>{
        const res = handleArray(nestedarr,skey,sval)
        return res
    })
}
else if(isArrayOfObj(arr)){
    return arr.some((obj) => {
        const objRes = search(obj,skey,sval)
        return objRes
    });
}
}

const search = (obj,skey,sval)=>{
for(const key in obj){
    if(obj.hasOwnProperty(key)){
        const val = obj[key]
        if(typeof val ==='object'){
            if(val instanceof Array){
                const res = handleArray(val,skey,sval)
                if (res){return true}
            }
            else{
                const res = search(val,skey,sval)
                if (res){return true}
            }
        }
        else{
            if(key===skey && val.toString()===sval){return true}
        }
    }
}
return false
}

module.exports = search