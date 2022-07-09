import { useEffect, useState } from "react";

export default function useModalEditState({ isOpen=false, item={} }={}) {
    const [state, setState] = useState(item)

    useEffect(() => { setState(item) }, [item])
    useEffect(() => { if (!isOpen) setState({}) }, [isOpen])

    return [state, setState];
}