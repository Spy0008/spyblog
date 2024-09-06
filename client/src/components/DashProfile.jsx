import { Button, Textarea } from "flowbite-react";
import { useSelector } from "react-redux";

export default function DashProfile() {
    const { currentUser } = useSelector(state => state.user);
    return (
        <div className="max-w-lg mx-auto p-3 w-full">
            <h1 className="my-7 text-center font-bold text-3xl ">Your Profile</h1>
            <form className="flex flex-col gap-4">
                <div className="w-32 h-32 self-center cursor-pointer shadow-xl overflow-hidden rounded-full">
                <img src={currentUser.profilePicture} alt="user" className="rounded-full w-full h-full object-cover border-8 border-blue-400 " />
                </div>
                <Textarea type='text' id="username" placeholder="username" defaultValue={currentUser.username} />
                <Textarea type='email' id="email" placeholder="email" defaultValue={currentUser.email} />
                <Textarea type='password' id="password" placeholder="password"  />
                <Button type="submit" outline gradientDuoTone='redToYellow'>
                    Update Profile
                </Button>
            </form>
            <div className='text-red-600 flex justify-between mt-5'>
                <span className="cursor-pointer">Sign out</span>
                <span className="cursor-pointer">Delete account</span>

            </div>
        </div>
    )
}