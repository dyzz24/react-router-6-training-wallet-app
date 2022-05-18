import React from 'react';
import {fileLoadHelper} from "../../helpers/fileLoadHelper";

export const UploadImageFileInput: React.FC<{setImgSrc: (arg: string) => void}> = ({setImgSrc}) =>
{
    const onFileLoadHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const fileSrc = await fileLoadHelper(file) as string;
            setImgSrc(fileSrc)
        }
    }

    return <input type={'file'} placeholder={'Выберите файл'} onChange={onFileLoadHandler}
                  accept="image/*"
    />
}
