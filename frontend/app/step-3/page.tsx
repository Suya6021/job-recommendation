import React from 'react'
import JobList from './(components)/JobList';

const Step3= () => {
  return (
    <div className='flex justify-between'>
      <div>
        Filters</div>
      <div className='flex flex-col '>
        <h1>Best jobs recommended only for you!</h1>
        <JobList/>
      </div>
      <div>
        Resume Strenght
        Ads
      </div>
    </div>
  )
}

export default Step3;
