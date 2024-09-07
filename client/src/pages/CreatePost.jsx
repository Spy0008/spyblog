import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function CreatePost() {
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formdata, setFormData] = useState({});
    const [file, setFile] = useState(null);
    const handleUploadImage = async () => {
        try {
            if (!file) {
                setImageUploadError('Please select an image')
                return;
            }
            setImageUploadError(null);
            const storage = getStorage(app);
            const fileName = new Date().getTime() + '-' + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageUploadProgress(progress.toFixed(0));
                },
                (error) => {
                    setImageUploadError('Image upload failed, try again.');
                    setImageUploadProgress(null);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageUploadProgress(null);
                        setImageUploadError(null);
                        setFormData({ ...formdata, image: downloadURL });
                    });
                }
            );
        } catch (error) {
            setImageUploadError('Image upload failed, try again.');
            setImageUploadProgress(null);
            console.log(error);
        }

    }
    return (
        <div className='p-3 max-w-3xl mx-auto min-h-screen'>
            <h1 className='text-center my-7 text-3xl font-bold'>Create a Blog</h1>
            <form className='flex flex-col gap-4'>
                <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                    <TextInput type='text' placeholder='Blog Title' required id='title' className='flex-1' />
                    <Select>
                        <option value='uncategorized'>Select a category</option>
                        <option value="technology">Technology</option>
                        <option value="lifestyle">Lifestyle</option>
                        <option value="business">Business</option>
                        <option value="health">Health</option>
                        <option value="travel">Travel</option>
                        <option value="food">Food</option>
                        <option value="education">Education</option>
                        <option value="finance">Finance</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="sports">Sports</option>
                        <option value="science">Science</option>
                        <option value="fashion">Fashion</option>
                        <option value="beauty">Beauty</option>
                        <option value="home">Home</option>
                        <option value="parenting">Parenting</option>
                        <option value="personal-development">Personal Development</option>
                        <option value="arts">Arts</option>
                        <option value="culture">Culture</option>
                        <option value="politics">Politics</option>
                        <option value="technology">Technology</option>
                        <option value="html-css">HTML/CSS</option>
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                        <option value="c-plus-plus">C++</option>
                        <option value="ruby">Ruby</option>
                        <option value="php">PHP</option>
                        <option value="sql">SQL</option>
                        <option value="typescript">TypeScript</option>
                        <option value="swift">Swift</option>
                        <option value="kotlin">Kotlin</option>
                        <option value="react">React</option>
                        <option value="angular">Angular</option>
                        <option value="vue">Vue.js</option>
                        <option value="nodejs">Node.js</option>
                        <option value="docker">Docker</option>
                        <option value="git">Git</option>
                    </Select>
                </div>
                <div className='flex gap-4 items-center justify-between border-4 border-orange-400 border-dashed p-3'>
                    <FileInput type='file' accept='image/*' onChange={(e) => setFile(e.target.files[0])} />
                    <Button disabled={imageUploadProgress} onClick={handleUploadImage} type='button' outline gradientDuoTone='pinkToOrange' size='sm' className='active:scale-95 disabled:opacity-95'>
                        {
                            imageUploadProgress ? (
                                <div className='w-16 h-16'>
                                    <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`} />
                                </div>
                            ) : (
                                'Upload Image'
                            )
                        }
                    </Button>
                </div>
                {imageUploadError && (
                    <Alert color='failure'>
                        {imageUploadError}
                    </Alert>
                )}
                {formdata.image && (
                    <img src={formdata.image} alt="upload" className='w-full h-72 object-cover' />
                )}
                <ReactQuill theme='snow' placeholder='write blog releted...' required className='mb-12 h-72' />
                <Button type='submit' gradientDuoTone='pinkToOrange'>Publish</Button>
            </form>
        </div>
    )
}

