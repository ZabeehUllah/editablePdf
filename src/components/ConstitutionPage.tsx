import { forwardRef, useRef, useState } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import {
    INSTRUCTIONS,
    CONSTITUTION_TITLE,
    CONSTITUTION_SUBTITLE,
    CONSTITUTION_DESCRIPTION1,
    CONSTITUTION_DESCRIPTION2
} from "./constants";
import intoBanner from './../assets/images/constitution_banner.png';
import intoBanner1 from './../assets/images/footer-img.png';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { DotGrid } from "./Footer";

import './../assets/styles/constitution.css'

interface IntroductionPageProps {
    children?: React.ReactNode;
}

const ConstitutionPage = forwardRef<HTMLDivElement, IntroductionPageProps>((props, ref) => {
    const [imageSrc, setImageSrc] = useState(intoBanner); // Initial image source
    const [isHovered, setIsHovered] = useState(false);

    const titleRef = useRef(CONSTITUTION_TITLE);
    const subTitleRef = useRef(CONSTITUTION_SUBTITLE);
    const description1Ref = useRef(CONSTITUTION_DESCRIPTION1);
    const description2Ref = useRef(CONSTITUTION_DESCRIPTION2);
    const instructionsRef = useRef(INSTRUCTIONS);

    const imageSources = Array(5).fill(intoBanner1);

    // Handle changes in ContentEditable
    const handleChange = (evt: ContentEditableEvent) => {
        const content = evt.currentTarget.innerHTML;
        if (evt.currentTarget.className === 'title') {
            titleRef.current = content;
        } else if (evt.currentTarget.className === 'subtitle') {
            subTitleRef.current = content;
        } else if (evt.currentTarget.className === 'description') {
            description1Ref.current = content;
        } else if (evt.currentTarget.className === 'instruction') {
            instructionsRef.current = content;
        }
    };

    // Handle blur event
    const handleBlur = (evt: React.FocusEvent<HTMLDivElement>) => {
        if (evt.currentTarget.classList.contains('title')) {
            console.log(titleRef.current);
        } else if (evt.currentTarget.classList.contains('description')) {
            console.log(description1Ref.current);
        } else if (evt.currentTarget.classList.contains('subtitle')) {
            console.log(subTitleRef.current);
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
            <div className="text-content constitution">
                <ContentEditable
                    className="constitution-title"
                    html={titleRef.current}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />

                <ContentEditable
                    className="constitution-subtitle"
                    html={subTitleRef.current}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />

                <ContentEditable
                    className="constitution-description"
                    html={description1Ref.current}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />

                <ContentEditable
                    className="constitution-description2"
                    html={description2Ref.current}
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
                <div className="arrows constitution-arrows">
                    {imageSources.map((src, index) => (
                        <img key={index} src={src} alt={`Banner ${index + 1}`} />
                    ))}
                </div>
                <div className="pageNumber">3</div>

                <DotGrid rows={3} cols={6} />
            </div>
        </div>
    )
})

export default ConstitutionPage
