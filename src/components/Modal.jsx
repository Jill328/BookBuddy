import './Modal.css';
import PropTypes from 'prop-types';

function Modal({ message, onClose, onConfirm}) {
    return (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>{message}</p>
            <div className="modal-buttons">
                <button onClick={onClose}>Cancel</button>
                <button onClick={onConfirm}>Register</button>
            </div>
        </div>
    </div>
    );
}

Modal.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
export default Modal;