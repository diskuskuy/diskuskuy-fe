import Head from 'next/head'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import React, { useRef, useState, ChangeEvent } from 'react';
import styles from '@/styles/CreateForum.module.css'
import { Editor } from '@tinymce/tinymce-react';
import moment from 'moment/moment';

export default function CreateThread() {
    const editorRef = useRef(null);
    const [title, setTitle] = useState("");
    const [deadline, setDeadline] = useState("");
    const [description, setDescription] = useState("");
    const [mechAndExp, setMechAndExp] = useState("");
    const [referenceFileList, setReferenceFileList] = useState([]);
    const minDate = moment(new Date).format('YYYY-MM-DDTMM:SS');

    const handleChangeTitle = event => {
        setTitle(event.target.value);
    };

    const handleChangeDeadline = event => {
        setDeadline(event.target.value);
    };

    const handleChangeDescription = event => {
        setDescription(event.target.value);
    };

    const handleChangeMechAndExp = event => {
        setMechAndExp(event.target.value);
    };

    const handleReferenceFileChange = (e) => {
        setReferenceFileList(e.target.files);
    };

    const handleSubmit = event => {
        event.preventDefault();
        console.log(title);
        console.log(deadline);
        console.log(description);
        console.log(mechAndExp);
        console.log(referenceFileList);
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    }

    const files = referenceFileList ? [...referenceFileList] : [];

    
    return (
        <>
            <main className={styles.main}>
                <div className='flex flex-row items-center text-xs pb-10'>
                    <a className='cursor-pointer'>Sistem Interaksi - Gasal 2020/2021</a>
                    <ChevronRightIcon />
                    <a className='cursor-pointer'>Forum Diskusi Minggu ke-1</a>
                </div>
                <div className='container bg-white p-6 rounded-lg text-sm'>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                        <div className='flex flex-row gap-5'>
                            <div className=" basis-1/2 flex flex-col gap-2">
                                <h3 className='font-bold text-'>Judul Thread</h3>
                                <div className="h-1 w-5 bg-[#C4C4C4]"></div>
                                <input value={title} onChange={handleChangeTitle} required type="text" className="appearance-none block border w-full rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="grid-first-name"/>
                                <h3 className='font-bold'>Panduan Diskusi</h3>
                                <div className="h-1 w-5 bg-[#C4C4C4]"></div>
                                <label>Deadline</label>
                                <input value={deadline} onChange={handleChangeDeadline} required type="datetime-local" min={minDate} className="appearance-none block border w-full rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="deadline"/>
                                <label>Deskripsi</label>
                                <textarea value={description} onChange={handleChangeDescription} required className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline min-h-[100px]"/>
                                <label>Mekanisme dan Ekspektasi</label>
                                <textarea value={mechAndExp} onChange={handleChangeMechAndExp} required className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline min-h-[100px]"/>
                                <h3 className='font-bold'>Referensi Diskusi</h3>
                                <div className="h-1 w-5 bg-[#C4C4C4]"></div>
                                <div className='flex flex-col gap-2'>
                                <input type="file" onChange={handleReferenceFileChange} multiple required/>
                                {files.map((file, i) => (
                                <div className='flex flex-row items-center gap-2' key={i}>
                                    {file.type == 'application/pdf' && <img src='/pdf-icon.png' width={'30px'}/>}
                                    {file.type == 'image/png' && <img src='/png-icon.png' width={'30px'}/>}
                                    {file.type != 'application/pdf' && file.type != 'image/png' && <img src='/url-icon.png' width={'30px'}/>}
                                    <div className='flex flex-col'>
                                        <p>{file.name}</p>
                                    </div>
                                </div>
                                ))}
                                </div>
                            </div>
                            <div className='basis-1/2 flex flex-col gap-2'>
                                <h3 className='font-bold'>Initial Post</h3>
                                <div className="h-1 w-5 bg-[#C4C4C4]"></div>
                                <Editor
                                    apiKey='32ne23x277g7cdbgy01eos5p0f9hlaz55et1nzrf4rra50dl'
                                    onInit={(evt, editor) => editorRef.current = editor}
                                    init={{
                                        height: 500,
                                        menubar: false,
                                        plugins: 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks insertdatetime media table code help wordcount fullscreen emoticons codesample',
                                        toolbar: 'undo redo | formatselect | ' +
                                        'bold italic backcolor | alignleft aligncenter alignright alignjustify |' + 
                                        'bullist numlist outdent indent | image media emoticons link codesample charmap hr |' +
                                        'removeformat | help',
                                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                                        file_picker_types: 'image media',
                                        file_picker_callback: function(callback, value, meta) {
                                            console.log(value)
                                            console.log(meta)
                                            // // Provide file and text for the link dialog
                                            // if (meta.filetype == 'file') {
                                            //   callback('mypage.html', {text: 'My text'});
                                            // }
                                        
                                            // // Provide image and alt text for the image dialog
                                            // if (meta.filetype == 'image') {
                                            //   callback('myimage.jpg', {alt: 'My alt text'});
                                            // }
                                        
                                            // // Provide alternative source and posted for the media dialog
                                            // if (meta.filetype == 'media') {
                                            //   callback('movie.mp4', {source2: 'alt.ogg', poster: 'image.jpg'});
                                            // }
                                          }
                                    }}
                                />
                            </div>
                        </div>
                        {/* <div className='flex flex-row justify-end'> */}
                            <input type="submit" value="Simpan" className="bg-[#2ECC71] text-white p-2 rounded cursor-pointer"/>
                        {/* </div> */}
                    </form>
                </div>
            </main>
        </>
    )
}
