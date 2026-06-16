import React from 'react';
import RecruiterCompany from './RecruiterCompany';
import { getUserSession } from '@/lib/core/session';

const CompanyPage = async () => {
    const user =await getUserSession();
    console.log("user session in company page", user)

    

    return (
        <div>
            <RecruiterCompany recruiter={user} ></RecruiterCompany>
        </div>
    );
};

export default CompanyPage;