import { FaHistory, FaTrash } from 'react-icons/fa';

const History = ({ history, onClear }) => {
  return (
    <div className="history">
      <div className="history__header">
        <h3 className="history__title">
          <FaHistory style={{ marginRight: 10 }} />
          Previous Results
        </h3>
        {history.length > 0 && (
          <button className="history__clear-btn" onClick={onClear}>
            <FaTrash style={{ marginRight: 6 }} />
            Clear
          </button>
        )}
      </div>

      {history.length > 0 ? (
        <table className="history__table">
          <thead>
            <tr>
              <th>#</th>
              <th>Result</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={item.id}>
                <td>
                  <span className={`history__rank history__rank--${index + 1}`}>
                    {index + 1}
                  </span>
                </td>
                <td>
                  <span className="history__number">{item.result}</span>
                </td>
                <td>
                  <span className="history__time">{item.timestamp}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="history__empty">
          No draws yet. Click DRAW to start!
        </div>
      )}
    </div>
  );
};

export default History;
