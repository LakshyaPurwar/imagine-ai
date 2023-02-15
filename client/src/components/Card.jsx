import React from 'react'
import { download } from '../assets'
import { downloadImage } from '../utils'

const Card = ({ _id, name, prompt, photo }) => {
  return (
    <div className='rounded-xl group relative shadow-card hover:shadow-cardhover card'>
      <img src={photo} alt={prompt}
        className='w-full h-auto object-cover rounded-xl'
      />

      <div className='group-hover:flex  hidden flex-col max-h-[94.5%] absolute  bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md'>

        <p className='text-sm text-white'>{prompt}</p>

        <div className='flex items-center justify-between mt-5 '>

          <div className='flex gap-2 items-center justify-center'>

            <div className='text-sm text-white bg-green-600 w-4 h-4 rounded-full flex justify-center items-center p-4'>{name.toUpperCase()[0]}
            </div>
            <span className='text-sm text-white '>{name}</span>

          </div>


          <div >
            <img 
            src={download} 
            alt={prompt} 
            className='h-5 w-5 bg-white rounded-full ring-green-400 cursor-pointer'
            onClick={()=>{
              downloadImage(_id , photo);
            }}
            />
          </div>
        </div>

      </div>



    </div>

  )
}

export default Card