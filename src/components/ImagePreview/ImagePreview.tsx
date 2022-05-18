import React, {useCallback, useLayoutEffect, useRef, useState} from 'react';
import style from './ImagePreview.module.scss';
import LabelContainer from "../LabelContainer";

export type imagePreviewSizeType = {width: number, height: number, left: number, top: number};
export type deltaState = {deltaX: number, deltaY: number};

export const ImagePreview: React.FC<{src: string}> = ({src}) => {

    const containerRef = useRef<HTMLDivElement | null>(null);
    const [size, setSize] = useState<imagePreviewSizeType>({width: 0, height: 0, left: 0, top: 0});
    const [firstBoxSize, setFirstBoxSize] = useState({firstWidth: 0, firstHeight: 0});

    const containerCalculate = useCallback((node?: HTMLDivElement | null) => {
        if (node) {
            setSize({
                height: node.getBoundingClientRect().height,
                width: node.getBoundingClientRect().width,
                left: node.getBoundingClientRect().left,
                top: node.getBoundingClientRect().top
            });
            containerRef.current = node;
            if(!firstBoxSize.firstWidth || !firstBoxSize.firstHeight) {
                setFirstBoxSize({firstWidth: node.getBoundingClientRect().width,
                    firstHeight: node.getBoundingClientRect().height})
            }
        }
    }, [firstBoxSize.firstWidth, firstBoxSize.firstHeight]);

    const resizeHandler = useCallback(() => {
            containerCalculate(containerRef.current)
    }, [containerCalculate])

    useLayoutEffect(() => {
        window.addEventListener('resize', resizeHandler)
        return () => window.removeEventListener('resize', resizeHandler)
    }, [resizeHandler])



    return (src ? <div className={style.wrapper} ref={containerCalculate}
    >
        <img src={src} alt={'downloaded-img'}
             className={style.image}/>
        <LabelContainer parentSize={size}  />
            </div> : <span>Изображение не загружено</span>)
}
