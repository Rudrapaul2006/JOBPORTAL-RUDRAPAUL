import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'

let filterData = [
  {
    filterType :  "Location",
    array : ["Delhi" , "Bangalor" , "Kolkata" , "Pune" , "Mumbai"],
  },
  {
    filterType : "Industry",
    array : ["Frontend Devoloper" , "Backend Devoloper" , "Graphic Designer"]
  },
  // {
  //   filterType : "Salary",
  //   array : ["0 - 40k" , "40k - 80k" , "80k - 120k" , "120k - 150k" , "150k up"]
  // }
]

// Jobs page job job filter : [Link with jobs page]
let FilterdCard = () => {

  return (
    <div className='flex flex-col border-r-2 h-[75%] border-b-2 w-[90%]'>
       <div className='mb-10'><h1 className='font-bold text-xl'><span className='text-[green]'>Filter</span> <span className='text-[red]'>Jobs</span></h1></div>

        <div className=''>
          <RadioGroup>
          {
          filterData.map((item , index) => (
            <div className='' key={index}>
              <div className='mb-3'>
                <h1 className='mb-3 text-[black]/80 font-bold '>{item.filterType}</h1>
                <hr className="my-3 border-t-1 border-gray-400 rounded-full w-3/4" />


                <div className='cursor-pointer flex flex-col justify-center'>
                  {
                    item.array.map((data , i) => (
                      <div className='flex items-center ' key={i}>
                        <RadioGroupItem className="cursor-pointer mr-3 mt-[2px]" value={data} />
                        <h1 className='cursor-pointer  '>{data}</h1>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          ))
        }
        </RadioGroup>
        </div>  

    </div>
  )
}

export default FilterdCard
