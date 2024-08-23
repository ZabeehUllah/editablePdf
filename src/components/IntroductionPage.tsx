/* eslint-disable @typescript-eslint/no-empty-object-type */
import { forwardRef, useRef, useState } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { INSTRUCTIONS, INTRODUCTION, TITLE } from "./constants";
import intoBanner from './../assets/images/intro_banner.png';
import intoBanner1 from './../assets/images/footer-img.png';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { DotGrid } from "./Footer";

import './../assets/styles/intro.css'

interface IntroductionPageProps {
    children?: React.ReactNode;
}

const IntroductionPage = forwardRef<HTMLDivElement, IntroductionPageProps>((props, ref) => {
    const [imageSrc, setImageSrc] = useState(intoBanner); // Initial image source
    const [isHovered, setIsHovered] = useState(false);

    const titleRef = useRef(TITLE);
    const introRef = useRef(INTRODUCTION);
    const instructionsRef = useRef(INSTRUCTIONS);

    const imageSources = Array(5).fill(intoBanner1);

    // Handle changes in ContentEditable
    const handleChange = (evt: ContentEditableEvent) => {
        const content = evt.currentTarget.innerHTML;
        if (evt.currentTarget.className === 'title') {
            titleRef.current = content;
        } else if (evt.currentTarget.className === 'description') {
            introRef.current = content;
        } else if (evt.currentTarget.className === 'instruction') {
            instructionsRef.current = content;
        }
    };

    // Handle blur event
    const handleBlur = (evt: React.FocusEvent<HTMLDivElement>) => {
        if (evt.currentTarget.classList.contains('title')) {
            console.log(titleRef.current);
        } else if (evt.currentTarget.classList.contains('description')) {
            console.log(introRef.current);
        } else if (evt.currentTarget.classList.contains('instruction')) {
            console.log(instructionsRef.current);
        }
    };

    const handleKeyDown = (evt: React.KeyboardEvent<HTMLDivElement>) => {
        if (evt.key === 'Enter') {
            evt.preventDefault();
            evt.currentTarget.blur();
        }
    };

    // Handle image upload
    const onDrop = (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageSrc(reader.result as string);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const dropzoneOptions = {
        onDrop,
        accept: {
            'image/*': []  // This is the correct type for 'accept'
        }
    } as DropzoneOptions;

    const { getRootProps, getInputProps } = useDropzone(dropzoneOptions);
    return (
        <div ref={ref}>
            {props?.children}
            <div className="text-content">
                <hr />
                <ContentEditable
                    className="title"
                    html={titleRef.current}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />

                <ContentEditable
                    className="description"
                    html={introRef.current}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />

                <ContentEditable
                    className="instruction"
                    html={instructionsRef.current}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
            </div>

            <div
                className="inrto-banner-img"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                {...getRootProps()}
            >
                <input {...getInputProps()} />
                <img src={imageSrc} alt="Intro Banner" />
                {isHovered && (
                    <div className="upload-overlay">
                        <span>Replace Image</span>
                    </div>
                )}
            </div>
            <div className="footer">
                <DotGrid rows={3} cols={6} />
                <div className="pageNumber">2</div>
                <div className="arrows">
                    {imageSources.map((src, index) => (
                        <img key={index} src={src} alt={`Banner ${index + 1}`} />
                    ))}
                </div>
            </div>
        </div>
    )
})

export default IntroductionPage
