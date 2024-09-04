import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('please fill out all fields.')
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);

      if (res.ok) {
        return navigate('/sign-in');
      }
    } catch (error) {
      setErrorMessage(error.message)
      setLoading(false);
    }

  };

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
          <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
            <div>
              <Label value='Enter Your username' />
              <TextInput
                type='text'
                placeholder='Username'
                id='username'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Enter Your email' />
              <TextInput
                type='email'
                placeholder='Email'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Enter Your password' x />
              <TextInput
                type='password'
                placeholder='Password'
                id='password'
                onChange={handleChange}
              />
            </div>
            <Button disabled={loading} className='active:scale-95 disabled:opacity-70' gradientDuoTone='pinkToOrange' type='submit'>
              {
                loading ? (
                  <>
                    <Spinner size='sm' />
                    <span className='pl-3'>Loading...</span>
                  </>
                ) : 'Sign Up'
              }
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-3'>
            <span>Already have an account?</span>
            <Link className='text-blue-700' to="/sign-in">
              Sign In
            </Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}