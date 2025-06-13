
type ConfirmationPopUpProps = {
    title: string;
    specifiedElement?: string
    setPopUpState: React.Dispatch<React.SetStateAction<boolean>>
    confirmAction: () => void
}


export default function ConfirmationPopUp({ title, specifiedElement, setPopUpState, confirmAction }: ConfirmationPopUpProps) {
    return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="z-[9999] flex h-[30%] w-4/5 flex-col items-center justify-center gap-5 rounded-lg bg-white p-3 md:w-2/4">
            <p className="text-center">
                {title}
            </p>
            {specifiedElement && <p className="font-bold">{specifiedElement}</p>}
            <div className="flex gap-5">
                <button
                    className="rounded-full bg-red-700 px-6 py-1 font-bold text-white hover:bg-red-500"
                    onClick={() => setPopUpState(false)}
                >
                    Cancel
                </button>
                <button
                    className="rounded-full bg-green-900 px-6 py-1 font-bold text-white transition-colors hover:bg-green-700"
                    onClick={confirmAction}
                >
                    Confirm
                </button>
            </div>
        </div>
    </div>
}