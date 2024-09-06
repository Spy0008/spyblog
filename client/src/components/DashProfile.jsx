import { Alert, Button, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function DashProfile() {
    const { currentUser } = useSelector(state => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadingProgress, setImageFileUploadingProgress] = useState(null);
    const [imageFileUpladingError, setImageFileUploadingError] = useState(null);
    const filePickerRef = useRef();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));

        }
    };
    useEffect(() => {
        if (imageFile) {
            uploadImage();
        }
    }, [imageFile]);

    const uploadImage = async () => {
        setImageFileUploadingError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImageFileUploadingProgress(progress.toFixed(0));
            },
            (error) => {
                setImageFileUploadingError('Could not upload image (File must be less than 2 MB)');
                setImageFileUploadingProgress(null);
                setImageFile(null);
                setImageFileUrl(null);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((DownloadURL) => {
                        setImageFileUrl(DownloadURL);
                    })
            },
        )
    };
    return (
        <div className="max-w-lg mx-auto p-3 w-full">
            <h1 className="my-7 text-center font-bold text-3xl ">Your Profile</h1>
            <form className="flex flex-col gap-4">
                <input hidden type="file" accept="image/*" onChange={handleImageChange} ref={filePickerRef} />
                <div className=" relative w-32 h-32 self-center cursor-pointer shadow-xl overflow-hidden rounded-full  " onClick={() => filePickerRef.current.click()}>
                    {imageFileUploadingProgress && (
                        <CircularProgressbar value={imageFileUploadingProgress || 0} text={`${imageFileUploadingProgress}%`} strokeWidth={5} styles={{
                            root: {
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                            },
                            path: {
                                stroke: `rgba(255, 83, 73, ${imageFileUploadingProgress / 100})`,
                            },
                        }} /> 
                    )}
                    <img src={imageFileUrl || currentUser.profilePicture} alt="user" className={`rounded-full w-full h-full object-cover border-8 border-blue-400 ${imageFileUploadingProgress && imageFileUploadingProgress < 100 && 'opacity-55'} `} />
                </div>
                {imageFileUpladingError && (
                    <Alert color='failure'>
                        {imageFileUpladingError}
                    </Alert>
                )}
                <TextInput type='text' id="username" placeholder="username" defaultValue={currentUser.username} />
                <TextInput type='email' id="email" placeholder="email" defaultValue={currentUser.email} />
                <TextInput type='password' id="password" placeholder="password" />
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