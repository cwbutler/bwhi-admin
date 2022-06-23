import { ItemModalContainer, ItemModalHeader, Label, Input, PrimaryButton } from './Modal'

export default function FactModal(props) {
    return (props.isOpen) ? (
        <ItemModalContainer>
            <ItemModalHeader title="Add New School" onClose={props.onClose} />

            <div className="flex flex-col mb-[24px]">
                <Label title="Name" htmlFor="name" />
                <Input
                    onChange={(e) => props.onChange?.({ name: e.target.value })}
                    name="name"
                    type="text"
                    required
                />
            </div>

            <div className="flex flex-col mb-[24px]">
                <Label title="Service Center" htmlFor="service_center" />
                <Input
                    onChange={(e) => props.onChange?.({ service_center: e.target.value })}
                    name="service_center"
                    type="text"
                    required
                />
            </div>

            <div className="flex flex-col mb-[24px]">
                <Label title="Address" htmlFor="address" />
                <Input
                    onChange={(e) => props.onChange?.({ address: e.target.value })}
                    name="address"
                    type="text"
                    required
                />
            </div>

            <div className="flex flex-col mb-[24px]">
                <Label title="Hours of Operation" htmlFor="hours" />
                <Input
                    onChange={(e) => props.onChange?.({ hours: e.target.value })}
                    name="hours"
                    type="text"
                    required
                />
            </div>

            <div className="flex flex-col mb-[24px]">
                <Label title="Phone Number" htmlFor="phone" />
                <Input
                    onChange={(e) => props.onChange?.({ phone: e.target.value })}
                    name="phone"
                    type="text"
                    required
                />
            </div>

            <div className="flex flex-col mb-[24px]">
                <Label title="Website" htmlFor="website" />
                <Input
                    onChange={(e) => props.onChange?.({ website: e.target.value })}
                    name="website"
                    type="text"
                    required
                />
            </div>

            <PrimaryButton title="Publish Fast Fact " onClick={props.onPublish} />

            <button className="bg-[#8F92A1] p-[12px] rounded-[8px] w-full mb-[30px]" onClick={props.onCancel}>
                <span className="text-white">Cancel</span>
            </button>
        </ItemModalContainer>
    ) : null
}


