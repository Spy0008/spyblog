import { Alert, Button, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart, updateSuccess, updateFailure } from '../redux/user/userSlice'
import { useDispatch } from "react-redux";

export default function DashProfile() {
    const { currentUser } = useSelector((state) => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadingProgress, setImageFileUploadingProgress] = useState(null);
    const [imageFileUpladingError, setImageFileUploadingError] = useState(null);
    const [imageFileUplading, setImageFileUploading] = useState(false);
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [updateUserError, setUpdateUserError] = useState(null);
    const [formData, setFormData] = useState({});
    const filePickerRef = useRef();
    const dispatch = useDispatch();

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
        setImageFileUploading(true);
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
                setImageFileUploading(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((DownloadURL) => {
                        setImageFileUrl(DownloadURL);
                        setFormData({ ...formData, profilePicture: DownloadURL });
                        setImageFileUploading(false);
                    })
            },
        )
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdateUserError(null);
        setUpdateUserSuccess(null);
        if (Object.keys(formData).length === 0) {
            setUpdateUserError('No change made')
            return;
        }
        if (imageFileUplading) {
            setUpdateUserError('🕐 Please wait for image upload')
            return;
        }
        try {
            dispatch(updateStart());
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (!res.ok) {
                dispatch(updateFailure(data.message));
                setUpdateUserError(Date.message);
            } else {
                dispatch(updateSuccess(data));
                setUpdateUserSuccess("🎉 congratulations Your profile update successfully")
            }
        } catch (error) {
            dispatch(updateFailure(error.message));
            setUpdateUserError(error.message);
        }
    }

    return (
        <div className="max-w-lg mx-auto p-3 w-full">
            <h1 className="my-7 text-center font-bold text-3xl ">Your Profile</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                <TextInput onChange={handleChange} type='text' id="username" placeholder="username" defaultValue={currentUser.username} />
                <TextInput onChange={handleChange} type='email' id="email" placeholder="email" defaultValue={currentUser.email} />
                <TextInput onChange={handleChange} type='password' id="password" placeholder="password" />
                <Button type="submit" outline gradientDuoTone='redToYellow' className=" active:scale-95">
                    Update Profile
                </Button>
            </form>
            <div className='text-red-600 flex justify-between mt-5'>
                <span className="cursor-pointer">Sign out</span>
                <span className="cursor-pointer">Delete account</span>
            </div>
            {updateUserSuccess && (
                <Alert color='success' className="mt-5">
                    {updateUserSuccess}
                </Alert>
            )}
            {updateUserError && (
                <Alert color='failure' className="mt-5">
                    {updateUserError}
                </Alert>
            )}
        </div>
    )
}