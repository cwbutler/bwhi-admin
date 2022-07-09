import dayjs from 'dayjs'
import useModalEditState from './hooks/useModalEditState'
import { Label, Input, TextArea, ImageInput, Modal } from './Modal'

export default function AlertModal(props) {
    const [item, setItem] = useModalEditState({ isOpen: props.isOpen, item: props.item })

    return (props.isOpen) ? (
        <Modal
            item={item}
            isEditing={props.isEditing}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onPublish={() => props.onPublish?.(item)}
            publishTitle="Publish Alert"
            onPreview={props.onPreview}
            addTitle="Add Alert"
            editTitle="Edit Alert"
        >
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
                <Label title="Description" htmlFor="description" />
                <TextArea
                    value={item?.description || ''}
                    onChange={(e) => setItem({ ...item, description: e.target.value })}
                    name="description"
                    required
                />
            </div>

            <div className="flex flex-col mb-[24px]">
                <Label title="Schedule Alert" htmlFor="datetime" />
                <Input
                    value={item.datetime ? dayjs(item.datetime).format('YYYY-MM-DDTHH:mm') : ''}
                    onChange={(e) => setItem({ ...item, datetime: dayjs(e.target.value).toISOString() })}
                    name="datetime"
                    type="datetime-local"
                    required
                />
            </div>

            <ImageInput 
                image={item?.image} 
                onChange={(img) => setItem({ ...item, image: img })}
            />
        </Modal>
    ) : null
}


