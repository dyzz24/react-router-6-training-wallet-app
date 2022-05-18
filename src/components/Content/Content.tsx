import React, {useState} from 'react';
import  style from './Content.module.scss';
import {UploadImageFileInput} from "../UploadImageFileInput/UploadImageFileInput";
import {ImagePreview} from "../ImagePreview/ImagePreview";

export const Content = () => {

    const [imgSrc, setImgSrc] = useState('');

    return <div className={style.wrapper}>
        {!imgSrc && <UploadImageFileInput setImgSrc={setImgSrc}/>}
        <ImagePreview src={imgSrc}/>
    </div>
}
