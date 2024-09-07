import { Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {
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
                    <FileInput type='file' accept='image/*' />
                    <Button type='button' outline gradientDuoTone='pinkToOrange' size='sm' className='active:scale-95'>
                        Upload Image
                    </Button>
                </div>
                <ReactQuill theme='snow' placeholder='write blog releted...' required className='mb-12 h-72'/>
                <Button type='submit' gradientDuoTone='pinkToOrange'>Publish</Button>
            </form>
        </div>
    )
}

