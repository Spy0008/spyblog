import { Link } from 'react-router-dom';
import { Button, Label, TextInput } from 'flowbite-react';

export default function SignUp() {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          {/* left */}
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-pink-500  to-orange-500 rounded-lg text-white ">Spy</span>
            <span className="text-black">Blog's</span>
          </Link>
          <p className='text-sm my-6'>
            We can’t wait to welcome you! By signing up, you’ll gain access to all our articles, community discussions, and updates. Let’s share the journey!
          </p>
        </div>
          {/* right */}

        <div className="flex-1">
          <form className='flex flex-col gap-3'>
            <div>
              <Label value='Enter Your username' />
              <TextInput
                type='text'
                placeholder='Username'
                id='username'
              />
            </div>
            <div>
              <Label value='Enter Your email' />
              <TextInput
                type='email'
                placeholder='Email'
                id='email'
              />
            </div>
            <div>
              <Label value='Enter Your password' />
              <TextInput
                type='password'
                placeholder='Password'
                id='password'
              />
            </div>
            <Button gradientDuoTone='pinkToOrange' type='submit'>Sign Up</Button>
          </form>
          <div className='flex gap-2 text-sm mt-3'>
            <span>Already have an account?</span>
            <Link className='text-blue-700' to="/sign-in">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}