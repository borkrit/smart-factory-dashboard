import { Fragment, useId, useRef, useState } from "react"

type BlueprintProps = {
    blueprintImg: Blob| MediaSource,
    handleSetComponentsWithPoint: () => { title: string, points: [] }
}

const Blueprints = ({ blueprintImg, handleSetComponentsWithPoint }: BlueprintProps) => {
    const [points, setPoints] = useState<Array<[number, number]>>([])
    const refImag = useRef<HTMLDivElement | null>(null)

    const [openModal,setOpenModal] = useState<string|null>(null)

    const handlePointForMachine = (e) => {

        if(e.target.className.includes('point')) return

        if (!refImag.current) return;
        console.log(`e.clientX,e.clientY`, e.clientX, e.clientY)
        console.log(`e.clientX,e.clientY`, e.clientX, e.clientY)

        const rect = refImag.current.getBoundingClientRect();

        const xPx = e.clientX - rect.left;
        const yPx = e.clientY - rect.top;


        const xPercent = (xPx / rect.width) * 100;
        const yPercent = (yPx / rect.height) * 100;

        setPoints(prev => [...prev, [xPercent, yPercent]]);

        handleSetComponentsWithPoint('test',[])

    }

    const openPointModal = (el:string)=>{
        console.log('test1')
        setOpenModal(el)

    }


    return (

        <div className="relative max-w-fit" ref={refImag} onClick={handlePointForMachine} >
            <img src={URL.createObjectURL(blueprintImg)} className="max-w-full h-auto block relative" />
            {
                points.map((point) => {
                    
                    const idPoint =`point-${point[0]}-${point[1]}`
                    console.log(idPoint,openModal)
                    const display = idPoint === openModal ? <div className={`absolute`  }   id={`${idPoint}`} >test {idPoint}</div> : null
                    return (<Fragment key={idPoint}><p popoverTarget={`${idPoint}`} className={`point absolute w-[10px] h-[10px]  
                                -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-400 `} onClick={()=>openPointModal(idPoint)}
                    style={{ left: `${point[0]}%`, top: `${point[1]}%` }} />
                    
                    {
                        display
                    }
                    </Fragment> )

                })
            }
            
        </div>

    )
}

export default Blueprints