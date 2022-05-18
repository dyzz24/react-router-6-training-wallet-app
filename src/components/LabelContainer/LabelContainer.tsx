import React, {useState} from 'react';
import style from './LabelContainer.module.scss';
import { imagePreviewSizeType} from "../ImagePreview/ImagePreview";
import CreateLabel from "./CreateLabel";
import LabelList from "./LabelList";

export type labelListType = { top: number, left: number, text: string, id: string }

export const LabelContainer: React.FC<{parentSize: imagePreviewSizeType}>  =
    ({parentSize}) => {

    const [coords, setCoords] = useState({top: 0, left: 0});
    const [openLabelCreation, setOpenLabelCreation] = useState(false);
    const [labelList, setLabelList] = useState<labelListType[]>([]);

    const onOpenLabelCreate = (e:React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;
        if(target.className === style.wrapper) {
            setCoords({
                top: ((e.clientY - parentSize.top) * 100) / parentSize.height,
                left: ((e.clientX - parentSize.left) * 100) / parentSize.width
            }
            )
            setOpenLabelCreation(true);
        }
    }

    const onLabelCreate = (label: labelListType) => {
        setLabelList([...labelList, label])
        setCoords({top: 0, left: 0});
        setOpenLabelCreation(false);

    }

    return <div className={style.wrapper} onClick={onOpenLabelCreate} >
        {openLabelCreation && <CreateLabel {...coords}
                                           onLabelCreateCallback={onLabelCreate}/>}
        <LabelList list={labelList}/>
    </div>
}



