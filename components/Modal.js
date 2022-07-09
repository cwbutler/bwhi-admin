import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4} from 'uuid';
import closeIcon from '../public/images/close.png'
import uploadImage from '../public/images/uploadImage.png'

export function ItemModalContainer(props) {
    return (
        <div className="absolute w-full h-full bg-[rgba(0,0,0,0.2)] flex flex-row justify-end">
            <div className="w-[550px] h-full bg-white px-[50px] py-[30px] overflow-y-auto">
                {props.children}
            </div>
        </div>
    )
}

export function ItemModalHeader(props) {
    return (
        <div className="flex flex-row justify-between items-center mb-[20px]">
            <h1 className="font-dmSans font-medium text-[24px]">{props.title}</h1>

            <button onClick={props.onClose}>
                <Image
                    alt="Close"
                    src={closeIcon}
                />
            </button>
        </div>
    )
}

export function Label({ title, ...props }) {
    return (
        <label className="font-dmSans font-medium text-[14px] text-[#8F92A1] mb-[16px]" {...props} >
            {title}
        </label>
    )
}

export function Input(props) {
    return (
        <input
            className="border-[1px] border-[#8F92A1] rounded-[8px] p-[16px]"
            {...props}
        />
    )
}

export function TextArea(props) {
    return (
        <textarea
            className="border-[1px] border-[#8F92A1] rounded-[8px] p-[16px]"
            rows={4}
            {...props}
        />
    )
}

export function ImageInput(props) {
    const [image, setImage] = useState(props.image)

    useEffect(() => {
        setImage(props.image)
    }, [props.image])

    return (
        <form className="flex flex-col mb-[24px]">
            <Label title="Add Image" htmlFor="imageDiv" />
            <label
                htmlFor="image"
                className="relative flex flex-col items-center justify-center border-[2px] border-[#8F92A1] rounded-[8px] p-[16px] border-dashed"
            >
                {(image) ? (
                    <div className="w-[375px] h-[250px]">
                        <Image
                            alt="Uploaded"
                            src={image}
                            width={375}
                            height={250}
                        />
                    </div>
                ) : (
                    <div className="flex flex-col justify-center items-center h-[250px]">
                        <Image
                            alt="Close"
                            src={uploadImage}
                            className="mb-[24px]"
                        />
                        <span className="font-dmSans text-ocean text-[16px] font-bold mb-[12px]">
                            Click here to upload image
                        </span>
                        <span className="font-dmSans text-[12px] text-[#8F92A1]">
                            375 x 250 recommended (up to 10mb)
                        </span>
                    </div>
                )}
                <input
                    onChange={(e) => {
                        if (e.target.files[0]) {
                            const srcImg = URL.createObjectURL(e.target.files[0])
                            setImage(srcImg)
                            props.onChange?.(srcImg)
                        }
                    }}
                    id="image"
                    name="image"
                    type="file"
                    accept="image/png, image/jpeg"
                    className="absolute left-[-1000px]"
                />
            </label>
        </form>
    )
}

export function PrimaryButton(props) {
    const onClick = (e) => {
        e.preventDefault()
        props.onClick?.(e)
    }

    return (
        <button
            className="bg-ocean p-[12px] rounded-[8px] w-full mb-[30px]"
            type="submit"
            {...props}
            onClick={onClick}
        >
            <span className="text-white">{props.title}</span>
        </button>
    )
}

export function Modal({ showPreview=true, ...props }) {
    const title = props.isEditing? props.editTitle || 'Edit' : props.addTitle || 'Add'
    return (props.isOpen) ? (
        <ItemModalContainer>
            <ItemModalHeader title={title} onClose={props.onClose} />

            {props.children}

            <PrimaryButton
                title={props.publishTitle || "Publish"}
                onClick={props.onPublish} 
            />

            {showPreview && (
                <button className="bg-[#8F92A1] p-[12px] rounded-[8px] w-full mb-[30px]" onClick={props.onPreview}>
                    <span className="text-white">Preview</span>
                </button>
            )}
        </ItemModalContainer>
    ) : null
}
