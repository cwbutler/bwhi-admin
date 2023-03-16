import dayjs from 'dayjs'
import { useState } from 'react'
import useModalEditState from './hooks/useModalEditState'
import { Label, Input, TextArea, ImageInput, Modal, Select } from './Modal'

export default function AlertModal(props) {
    const [item, setItem] = useModalEditState({ isOpen: props.isOpen, item: props.item })
    const [imageToUpload, setImageToUpload] = useState()

    return (props.isOpen) ? (
        <Modal
            item={item}
            isEditing={props.isEditing}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onPublish={() => {
                item.type = item.type ?? "reminder";
                props.onPublish?.({ ...item, imageToUpload })}
            }
            publishTitle="Publish Alert"
            onPreview={props.onPreview}
            addTitle="Add Alert"
            editTitle="Edit Alert"
        >
            <div className="flex flex-col mb-[24px]">
                <Label title="Alerty Type" htmlFor="type" />
                <Select
                    value={item?.type}
                    onChange={(e) => setItem({ ...item, type: e.target.value })}
                    name="type"
                    type="text"
                    required
                >
                    <option value="reminder">Reminder</option>
                    <option value="affirmation">Daily Affirmation</option>
                </Select>
            </div>

            <div className="flex flex-col mb-[24px]">
                <Label title="Alert Title" htmlFor="title" />
                <Input
                    value={item?.title || ''}
                    onChange={(e) => setItem({ ...item, title: e.target.value })}
                    name="title"
                    type="text"
                    required
                />
            </div>

            <div className="flex flex-col mb-[24px]">
                <Label title="Body" htmlFor="body" />
                <TextArea
                    value={item?.body || ''}
                    onChange={(e) => setItem({ ...item, body: e.target.value })}
                    name="body"
                    required
                />
            </div>

            <div className="flex flex-col mb-[24px]">
                <Label title="Schedule Alert" htmlFor="scheduledTime" />
                <Input
                    value={item.scheduledTime ? dayjs(item.scheduledTime).format('YYYY-MM-DDTHH:mm') : ''}
                    onChange={(e) => setItem({ ...item, scheduledTime: dayjs(e.target.value).toISOString() })}
                    name="scheduledTime"
                    type="datetime-local"
                    required
                />
            </div>

            <ImageInput 
                image={item?.imageUrl} 
                onChange={(image) => { 
                    setItem({ ...item, image: image.srcImg })
                    setImageToUpload(image.src)
                }}
            />
        </Modal>
    ) : null
}


