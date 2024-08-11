import { ChangeEvent } from "react"

interface LabellledInputTypes {
    label:string,
    placeholder:string,
    type?:string,
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void
}


export const LabelledInput = ({label,placeholder,type,onChange}:LabellledInputTypes) => {
    return <div className="mb-4">
        <label className="block mb-3 text-sm font-bold text-gray-900 dark:text-white">{label}</label>
        <input type={type==="password"?"password":"text"} onChange={onChange} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
    </div>
}