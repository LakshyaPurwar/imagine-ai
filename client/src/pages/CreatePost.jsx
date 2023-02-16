import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { preview } from '../assets/index'
import { getRandomPrompt } from '../utils/index';
import { FormField, Loader } from '../components/index'


const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(form.prompt && form.photo)
    {
      setIsLoading(true);
      try{
        const response = await fetch('https://imagine-ai-1jah.onrender.com/api/v1/post' , {
          method:'POST',
          headers:{
            'Content-Type' : 'application/json',
          },
          body : JSON.stringify(form),
        });
        console.log("For sending the posts status is  = "+response.status);
        const data = await response.json();
        console.log(data);
        navigate('/');
      }
      catch(error)
      {
        alert("Some error occured ! Data could not be posted.");
      }
      finally{
        setIsLoading(false);
      }
    }
    else{
      alert('Please enter prompt and generate the image');
    }

  }

  const handleChange = (event) => {
    setForm((prevForm) => {
      return { ...prevForm, [event.target.name]: event.target.value }
    });
  }

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm((previousForm) => {
      return { ...previousForm, prompt: randomPrompt }
    });
    //Then do something with it.
  }

  const generateImageClickHandler = async () => {
    //Bro kuch toh bada karna hai
    if (form.prompt) {
      try {

        setGeneratingImg(true);

        const response = await fetch('https://imagine-ai-1jah.onrender.com/api/v1/dalle',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: form.prompt }),
          });

          console.log(response.status+ "is the response sent from the backend");

          if(response.status === 500 )
          {
            const data = await response.json();
            console.log(data.message + "because an error response was sent back");
            throw new Error(data.message);
          }

        const data = await response.json();
        console.log(data);
      
        setForm((prevForm) => {
          return { ...prevForm, photo:"data:image/png;base64,"+data.photo }
        });
      }
      catch (error) {
        console.log(error);
        alert(error);
      }
      finally {
        setGeneratingImg(false);
      }
    }
    else {

      alert('Please enter a prompt ! ');

    }

  }

  const shareImageClickHandler = () => {
    //Tu bhi kuch bada karega bro
  }

  return (
    <section className='max-w-7xl  m-x-auto'>
      <div className=' max-w-3xl mx-auto'>
        <h1 className='font-extrabold text-[#222328] text-[32px] ' >Create</h1>

        <p className='mt-2 text-[#666e75] text-[#16px] max-w-[500px] '>Create a collection of imaginative and visually stunning images generated by IMAGINE-AI and share it with the community</p>

      </div>

      <form className='mt-16 max-w-3xl mx-auto' onSubmit={handleSubmit} action="">

        <div className='flex flex-col gap-5'>
          <FormField
            label='Your name'
            type='text'
            name='name'
            placeholder='John Doe'
            value={form.name}
            handleChange={handleChange} />

          <FormField
            label='Prompt'
            type='text'
            name='prompt'
            placeholder='a painting of a fox in the style of Starry Night'
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe={true}
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-64  h-64 p-3 flex justify-center items-center' >

            {form.photo ? (
              <img src={form.photo}
                alt={form.prompt}
                className='w-full h-full object-contain'
              />
            ) : (
              <img src={preview} alt="preview" className='w-9/12 h-9/12 object-contain opacity-40' />
            )}

            {generatingImg &&
              <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
                <Loader />
              </div>}
          </div>

        </div>

        <div className='mt-5 flex gap-5'>
          <button
            type='button'
            onClick={generateImageClickHandler}
            className='text-white bg-green-700 font-medium rounded-md text-sm px-10 py-2.5 w-full flex items-center justify-center sm:w-auto'
          >
            {generatingImg ? 'Generating . . .' : 'Generate'}
          </button>
        </div>

        <div className='mt-10'>
          <p className='mt-2 text-[#666e75] text-sm'>
            Once you have created the image you want , you can share it with others in the community
          </p>

          <button type='submit'
            onClick={handleSubmit}
            className='mt-3 bg-[#6469ff] text-white text-sm px-5 py-2.5 rounded-md sm:w-auto w-full text-center'
          >
            {isLoading ? 'Sharing . . . ' : 'Share with the community'}
          </button>
        </div>

      </form>
    </section>
  )
}

export default CreatePost;