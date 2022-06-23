import { ItemModalContainer, ItemModalHeader, Label, Input, TextArea, ImageInput, PrimaryButton } from './Modal'

export default function FactModal(props) {
    return (props.isOpen) ? (
        <ItemModalContainer>
            <ItemModalHeader title="Add New Fast Fact" onClose={props.onClose} />

            <div className="flex flex-col mb-[24px]">
                <Label title="Title" htmlFor="title" />
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

            <ImageInput onChange={(image) => props.onChange?.({ image })} />

            <PrimaryButton title="Publish Fast Fact " onClick={props.onPublish} />

            <button className="bg-[#8F92A1] p-[12px] rounded-[8px] w-full mb-[30px]" onClick={props.onCancel}>
                <span className="text-white">Cancel</span>
            </button>
        </ItemModalContainer>
    ) : null
}


