import React, { memo } from "react";
import clsx from "clsx";

const InputField = ({value,setValue,nameKey,type,invalidFields,setInvalidFields,style,fullWidth,placeholder,isHideLabel}) => {
    return (
        <div className={clsx("flex flex-col relative ",fullWidth && 'w-full')}>
            {!isHideLabel && value?.trim() !=='' && <label className="text-[10px] absolute top-0 left-[12px] block bg-white px-1" htmlFor={nameKey}> {nameKey?.slice(0,1).toUpperCase()+nameKey?.slice(1)}</label>}
            <input type= { type || 'text' }
            className= {clsx("px-4 py-2 rounded-sm border w-full mt-2 placeholder:text-sm placeholder:italic outline-non",style)}
            placeholder={placeholder || nameKey?.slice(0,1).toUpperCase()+nameKey?.slice(1)}
            value={value}
            onChange={e => setValue(prev =>({...prev,[nameKey]:e.target.value}))}
            onFocus={() => setInvalidFields && setInvalidFields([])}
            />
            {invalidFields?.some(el => el.name === nameKey) && <small className="text-main italic ">{invalidFields.find(el => el.name === nameKey)?.mes}</small>}
        </div>
    )
}

export default memo(InputField)