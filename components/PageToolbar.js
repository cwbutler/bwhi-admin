export default function PageToolbar(props) {
    return (
        <div className="flex flex-row items-center content-center px-[40px] pt-[42px]">
            <h1 className="text-inter text-black text-[32px] font-medium">{props.pageTitle}</h1>

            <div className="grow" />

            {props.actions && props.actions}

            <button
                className="bg-ocean px-[16px] py-[13px] rounded-[5px]"
                onClick={props.onActionClick}
            >
                <span className="text-white text-[16px]">{props.actionTitle}</span>
            </button>
        </div>
    )
}