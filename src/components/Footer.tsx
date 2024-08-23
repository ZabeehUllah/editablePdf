
export const DotGrid = ({ rows, cols }: { rows: number, cols: number }) => {
    return (
        <div className="dots">
            {Array.from({ length: rows }, (_, rowIndex) => (
                <div key={rowIndex} className="dot-row">
                    {Array.from({ length: cols }, (_, colIndex) => (
                        <div key={rowIndex * cols + colIndex} className="dot"></div>
                    ))}
                </div>
            ))}
        </div>
    );
};