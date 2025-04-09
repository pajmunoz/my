import { useCallback, useEffect, useState } from 'react'
import './Paint.css';
import Dialog from '../../components/Dialog/Dialog';
const colors = ['red', 'green', 'blue', 'yellow', 'black']

export default function Paint() {
    const [grid, setGrid] = useState([]);
    const [cellSize, setCellSize] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedColor, setSelectedColor] = useState('black');
    const [isPainting, setIsPainting] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateGrid = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const cellSize = 20;
            const columns = Math.floor(width / cellSize);
            const rows = Math.floor((height - 80) / cellSize);
            setCellSize(cellSize);
            setGrid(Array(rows * columns).fill(''))
            console.log(width, height, rows)
        }
        updateGrid();
        window.addEventListener('resize', updateGrid);
        return () => window.removeEventListener('resize', updateGrid);
    }, [])

    const toggleCell = useCallback((index) => {
        setGrid((prev) => {
            const newGrid = [...prev]
            newGrid[index] = newGrid[index] ? '' : selectedColor
            return newGrid
        })
    }, [selectedColor])

    const handleMouseDown = useCallback((e) => {
        e.preventDefault();
        setIsPainting(true);
        

    }, []);
    const handleMouseDownDialog = useCallback((e) => {
        e.preventDefault();
        setModalOpen(false);

    }, []);
    const handleMouseUp = useCallback((e) => { e.preventDefault(); setIsPainting(false); }, []);
    const handleMouseEnter = useCallback(
        (index) => {
            if (isPainting) toggleCell(index);
        },
        [isPainting, toggleCell]
    );


    const handleContextMenu = useCallback((e) => {
        e.preventDefault();
        setMousePosition({ x: e.clientX, y: e.clientY });
        setModalOpen(true);
    }, []);

    return (
        <div className='grid' style={{ display: 'flex', flexWrap: 'wrap' }} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onContextMenu={handleContextMenu}>
            {
                grid.map((color, index) => (
                    <div key={index} style={{ background: color, width: cellSize, height: cellSize }} className='border' onClick={() => toggleCell(index)} onMouseEnter={() => handleMouseEnter(index)}></div>
                )
                )
            }
            {modalOpen && (
                <Dialog colors={colors} open={modalOpen} mousePosition={mousePosition} onMouseDown={handleMouseDownDialog} setSelectedColor={setSelectedColor} setModalOpen={setModalOpen} />
            )}

        </div >

    );
}

