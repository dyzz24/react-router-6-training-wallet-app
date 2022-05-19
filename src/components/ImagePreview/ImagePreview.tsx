import React, {useCallback, useLayoutEffect, useRef, useState} from 'react';
import style from './ImagePreview.module.scss';
import LabelContainer from "../LabelContainer";

export type imagePreviewSizeType = {width: number, height: number, left: number, top: number};
export type deltaState = {deltaX: number, deltaY: number};

export const ImagePreview: React.FC<{src: string}> = ({src}) => {

    const containerRef = useRef<HTMLDivElement | null>(null);
    const [size, setSize] = useState<imagePreviewSizeType>({width: 0, height: 0, left: 0, top: 0});

    const containerCalculate = useCallback((node?: HTMLDivElement | null) => {
        if (node) {
            setSize({
                height: node.getBoundingClientRect().height,
                width: node.getBoundingClientRect().width,
                left: node.getBoundingClientRect().left,
                top: node.getBoundingClientRect().top
            });
            // Нода нужна в дальнейшем при калькуляции размеров при ресайзе
            containerRef.current = node;
        }
    }, []);

    const resizeHandler = useCallback(() => {
        // INFO!!
        // Так как я высчитываю координаты меток в процентах относительно парента
        // При ресайзе и изменении его резиновых размеров я храню его размеры в стэйте
        // LabelContainer ложится поверх изображения
            containerCalculate(containerRef.current)
    }, [containerCalculate])

    useLayoutEffect(() => {
        window.addEventListener('resize', resizeHandler)
        return () => window.removeEventListener('resize', resizeHandler)
    }, [resizeHandler])



    return (src ? <div className={style.wrapper} ref={containerCalculate}
    >
        <LabelContainer parentSize={size}  />
        <img src={src} alt={'downloaded-img'}
             className={style.image}/>
            </div> : <span>Изображение не загружено</span>)
}
