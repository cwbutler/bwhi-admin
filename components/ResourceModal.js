import { Label, Input, TextArea, Modal } from './Modal'
import useModalEditState from './hooks/useModalEditState'

export default function ResourceModal(props) {
    const [item, setItem] = useModalEditState({ isOpen: props.isOpen, item: props.item })

    return (props.isOpen) ? (
        <Modal
            item={item}
            isEditing={props.isEditing}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onPublish={() => props.onPublish?.(item)}
            onPreview={props.onPreview}
            publishTitle="Publish Resource"
            addTitle="Add Resource"
            editTitle="Edit Resource"
        >
            <div className="flex flex-col mb-[24px]">
                <Label title="Topic" htmlFor="topic" />
                <Input
                    onChange={(e) => setItem({ ...item, topic: e.target.value })}
                    name="topic"
                    type="text"
                    required
                    value={item.topic}
                />
            </div>

            <div className="flex flex-col mb-[24px]">
                <Label title="Name" htmlFor="name" />
                <TextArea
                    onChange={(e) => setItem({ ...item, name: e.target.value })}
                    name="name"
                    required
                    value={item.name}
                />
            </div>

            <div className="flex flex-col mb-[24px]">
                <Label title="URL" htmlFor="url" />
                <TextArea
                    onChange={(e) => setItem({ ...item, url: e.target.value })}
                    name="url"
                    required
                    value={item.url}
                />
            </div>
        </Modal>
    ) : null
}


