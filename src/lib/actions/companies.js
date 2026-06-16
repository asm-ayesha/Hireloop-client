'use server'

import { serverMutation } from "../core/server"

export const createCompany = async(newCompanyData) =>{ 
    return serverMutation('/companies', newCompanyData)
}











// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
// export const createCompany = async (newCompanyData)=>{
//     const res = await fetch(`${baseUrl}/companies`,{ 
//         method: 'POST',
//         headers:{
//             'Content-Type' : 'application/json',
//         },
//         body:JSON.stringify(newCompanyData),

//     })
//     return res.json();
// }