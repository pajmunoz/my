import './Dialog.css'
export default function Dialog({ open, colors, mousePosition, setSelectedColor, setModalOpen }) {

    return open ? (

        <div className={`container-colors ${open ? 'fade-in':'fade-out'}` } style={{ top: `${mousePosition.y}px`, left: `${mousePosition.x}px` }}>
            <div className="colors">
                <div className='flex-container'>
                    {colors.map((color) => (
                        <button key={color} className='box-color' style={{ backgroundColor: color }} onClick={() => { setSelectedColor(color); setModalOpen(false) }}></button>
                    ))}
                </div></div>

        </div>

    ) : null
}
