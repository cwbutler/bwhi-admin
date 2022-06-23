import { ItemModalContainer, ItemModalHeader, Label, Input, TextArea, ImageInput, PrimaryButton } from './Modal'

export default function AlertModal(props) {
    return (props.isOpen) ? (
        <ItemModalContainer>
            <ItemModalHeader title="Add New Alert" onClose={props.onClose} />

            <div className="flex flex-col mb-[24px]">
                <Label title="Alert Title" htmlFor="title" />
                <Input
                    onChange={(e) => props.onChange?.({ title: e.target.value })}
                    name="title"
                    type="text"
                    required
                />
            </div>

            <div className="flex flex-col mb-[24px]">
                <Label title="Description" htmlFor="description" />
                <TextArea
                    onChange={(e) => props.onChange?.({ description: e.target.value })}
                    name="description"
                    required
                />
            </div>

            <div className="flex flex-col mb-[24px]">
                <Label title="Schedule Alert" htmlFor="time" />
                <Input
                    onChange={(e) => props.onChange?.({ time: e.target.value })}
                    name="time"
                    type="datetime-local"
                    required
                />
            </div>

            <ImageInput onChange={(image) => props.onChange?.({ image })} />

            <PrimaryButton title="Publish Alert" onClick={props.onPublish} />

            <button className="bg-[#8F92A1] p-[12px] rounded-[8px] w-full mb-[30px]">
                <span className="text-white">Preview</span>
            </button>
        </ItemModalContainer>
    ) : null
}


