// import "./Modal.scss";

const Modal = ({ children, isOpen, closeModal, content }) => {
  const handleModalContainerClick = (e) => e.stopPropagation();

  return (
    <div className={`modal--search modal ${isOpen && "is-open"}`} onClick={closeModal}>
      <div className="modal-container" onClick={handleModalContainerClick}>
        <button className="modal-close" onClick={closeModal}>
          {content}
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
