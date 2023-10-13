import loadingSvg from "../../assets/loading.svg"

export function Loading() {
    return (
        <div className="flex w-full h-full justify-center items-center">
            <img src={loadingSvg} alt="Loading" />
        </div>
    )
}