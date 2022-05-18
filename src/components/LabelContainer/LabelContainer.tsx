import React, {useState} from 'react';
import style from './LabelContainer.module.scss';
import {imagePreviewSizeType} from "../ImagePreview/ImagePreview";
import CreateLabel from "./CreateLabel";
import LabelList from "./LabelList";

export type labelListType = { top: string, left: string, text: string, id: string }

export const LabelContainer: React.FC<{parentSize: imagePreviewSizeType}>  = ({parentSize}) => {

    const [coords, setCoords] = useState({top: '0%', left: '0%'});
    const [openLabelCreation, setOpenLabelCreation] = useState(false);
    const [labelList, setLabelList] = useState<labelListType[]>([])

    const onOpenLabelCreate = (e:React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;
        if(target.className === style.wrapper) {
            calculatePositionInPercent({parentSize, x: e.clientX - parentSize.left, y:e.clientY - parentSize.top })
            setOpenLabelCreation(true);
        }
    }

    const calculatePositionInPercent = ({parentSize, y, x}: {parentSize: imagePreviewSizeType, x: number, y: number}) => {
        const xPositionInPercent = Math.round((x * 100) / parentSize.width);
        const yPositionInPercent = Math.round((y * 100) / parentSize.height);
        setCoords({top: `${yPositionInPercent}%`, left: `${xPositionInPercent}%`})
    }

    const onLabelCreate = (label: labelListType) => {
        setLabelList([...labelList, label])
        setCoords({top: '0%', left: '0%'});
        setOpenLabelCreation(false);

    }

    return <div className={style.wrapper} onClick={onOpenLabelCreate} >
        {openLabelCreation && <CreateLabel {...coords} onLabelCreateCallback={onLabelCreate}/>}
        <LabelList list={labelList}/>
    </div>
}
