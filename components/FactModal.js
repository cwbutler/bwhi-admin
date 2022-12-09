import { Label, Input, TextArea, ImageInput, Modal } from './Modal'
import useModalEditState from './hooks/useModalEditState'
import { useState } from 'react'

export default function FactModal(props) {
    const [item, setItem] = useModalEditState({ isOpen: props.isOpen, item: props.item })
    const [imageToUpload, setImageToUpload] = useState()

    return (props.isOpen) ? (
        <Modal
            item={item}
            isEditing={props.isEditing}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onPublish={() => props.onPublish?.({ ...item, imageToUpload })}
            onPreview={props.onPreview}
            publishTitle="Publish Fact"
            addTitle="Add Fact"
            editTitle="Edit Fact"
        >
            <div className="flex flex-col mb-[24px]">
                <Label title="Title" htmlFor="title" />
                <Input
                    onChange={(e) => setItem({ ...item, title: e.target.value })}
                    name="title"
                    type="text"
                    required
                    value={item.title}
                />
            </div>

            <div className="flex flex-col mb-[24px]">
                <Label title="Description" htmlFor="description" />
                <TextArea
                    onChange={(e) => setItem({ ...item, description: e.target.value })}
                    name="description"
                    required
                    value={item.description}
                />
            </div>

            <ImageInput 
                image={item.image} 
                onChange={(image) => { 
                    setItem({ ...item, image: image.srcImg })
                    setImageToUpload(image.src)
                }}
            />
        </Modal>
    ) : null
}


