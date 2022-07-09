import useModalEditState from './hooks/useModalEditState'
import { Label, Input, TextArea, Modal } from './Modal'
import CommaSeparateLabel from './CommaSeperateLabel'

export default function SchoolModal(props) {
    const [item, setItem] = useModalEditState({ isOpen: props.isOpen, item: props.item })
    let health_physical_services = item.health_physical_services
    let health_sexual_services = item.health_sexual_services
    let counseling_services = item.counseling_services

    if (Array.isArray(item?.health_sexual_services)) {
        health_sexual_services = item.health_sexual_services.join(',')
    }
    if (Array.isArray(item?.health_physical_services)) {
        health_physical_services = item.health_physical_services.join(',')
    }
    if (Array.isArray(item?.counseling_services)) {
        counseling_services = item.counseling_services.join(',')
    }

    return (props.isOpen) ? (
        <Modal
            item={item}
            isEditing={props.isEditing}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onPublish={() => props.onPublish?.(item)}
            onPreview={props.onPreview}
            publishTitle="Publish School"
            addTitle="Add School"
            editTitle="Edit School"
        >
            <div className="flex flex-col mb-[24px]">
                <Label title="School Name" htmlFor="school_name" />
                <Input
                    onChange={(e) => setItem({ ...item, school_name: e.target.value })}
                    name="school_name"
                    type="text"
                    value={item.school_name}
                />
            </div>

            <div className="flex flex-col mb-[24px]">
                <Label title="Health Center Name" htmlFor="health_name" />
                <Input
                    onChange={(e) => setItem({ ...item, health_name: e.target.value })}
                    name="health_name"
                    type="text"
                    value={item.health_name}
                />
            </div>

            <div className="flex flex-col mb-[24px]">
                <Label title="Health Center Address" htmlFor="health_address" />
                <Input
                    onChange={(e) => setItem({ ...item, health_address: e.target.value })}
                    name="health_address"
                    type="text"
                    value={item.health_address}
                />
            </div>

            <div className="flex flex-col mb-[24px]">
                <Label title="Health Center Open Hours" htmlFor="health_hours" />
                <Input
                    onChange={(e) => setItem({  ...item, health_hours: e.target.value })}
                    name="health_hours"
                    type="text"
                    value={item.health_hours}
                />
            </div>

            <div className="flex flex-col mb-[24px]">
                <Label title="Health Center Phone Number" htmlFor="health_phone" />
                <Input
                    onChange={(e) => setItem({ ...item, health_phone: e.target.value })}
                    name="health_phone"
                    type="text"
                    value={item.health_phone}
                />
            </div>

            <div className="flex flex-col mb-[24px]">
                <Label title="Health Center Website" htmlFor="health_website" />
                <Input
                    onChange={(e) => setItem({ ...item, health_website: e.target.value })}
                    name="health_website"
                    type="text"
                    value={item.health_website}
                />
            </div>

            <div className="flex flex-col mb-[24px]">
                <Label title="Health Center Sexual Services" htmlFor="health_sexual_services" />
                <TextArea
                    value={health_sexual_services || ''}
                    onChange={(e) => setItem({ ...item, health_sexual_services: e.target.value })}
                    name="health_sexual_services"
                />
                <CommaSeparateLabel />
            </div>

            <div className="flex flex-col mb-[24px]">
                <Label title="Health Center Physical Services" htmlFor="health_physical_services" />
                <TextArea
                    value={health_physical_services || ''}
                    onChange={(e) => setItem({ ...item, health_physical_services: e.target.value })}
                    name="health_physical_services"
                />
                <CommaSeparateLabel />
            </div>

            <div className="flex flex-col mb-[24px]">
                <Label title="Counseling Service Name" htmlFor="counseling_name" />
                <Input
                    onChange={(e) => setItem({ ...item, counseling_name: e.target.value })}
                    name="counseling_name"
                    type="text"
                    value={item.counseling_name}
                />
            </div>

            <div className="flex flex-col mb-[24px]">
                <Label title="Counseling Service Address" htmlFor="counseling_location" />
                <Input
                    onChange={(e) => setItem({ ...item, counseling_location: e.target.value })}
                    name="counseling_location"
                    type="text"
                    value={item.counseling_location}
                />
            </div>

            <div className="flex flex-col mb-[24px]">
                <Label title="Counseling Service Website" htmlFor="counseling_website" />
                <Input
                    onChange={(e) => setItem({ ...item, counseling_website: e.target.value })}
                    name="counseling_website"
                    type="text"
                    value={item.counseling_website}
                />
            </div>

            <div className="flex flex-col mb-[24px]">
                <Label title="Counseling Service Open Hours" htmlFor="counseling_hours" />
                <Input
                    onChange={(e) => setItem({ ...item, counseling_hours: e.target.value })}
                    name="counseling_hours"
                    type="text"
                    value={item.counseling_hours}
                />
            </div>

            <div className="flex flex-col mb-[24px]">
                <Label title="Counseling Service Phone" htmlFor="counseling_phone" />
                <Input
                    onChange={(e) => setItem({ ...item, counseling_phone: e.target.value })}
                    name="counseling_phone"
                    type="text"
                    value={item.counseling_phone}
                />
            </div>

            <div className="flex flex-col mb-[24px]">
                <Label title="Counseling Services" htmlFor="counseling_services" />
                <TextArea
                    value={counseling_services || ''}
                    onChange={(e) => setItem({ ...item, counseling_services: e.target.value })}
                    name="counseling_services"
                />
                <CommaSeparateLabel />
            </div>

            <div className="flex flex-col mb-[24px]">
                <Label title="Counseling Crisis Phone" htmlFor="counseling_crisis_phone" />
                <Input
                    onChange={(e) => setItem({ ...item, counseling_crisis_phone: e.target.value })}
                    name="counseling_crisis_phone"
                    type="text"
                    value={item.counseling_crisis_phone}
                />
            </div>

            <div className="flex flex-col mb-[24px]">
                <Label title="Counseling Crisis SMS" htmlFor="counseling_crisis_text" />
                <Input
                    onChange={(e) => setItem({ ...item, counseling_crisis_text: e.target.value })}
                    name="counseling_crisis_text"
                    type="text"
                    value={item.counseling_crisis_text}
                />
            </div>
        </Modal>
    ) : null
}


