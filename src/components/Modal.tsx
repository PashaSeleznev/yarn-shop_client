import type { ModalProps } from "../types/types";

/*
Модальное окно

Функционал:
- Требует от пользователя подтверждение действия или доносит до него какую-то информацию
- Максимум 2 кнопки: подтверждение и отмена
- При confirmText / cancelText используются значения по умолчанию

Примечания:
- Не отображается при isOpen = false
- При нажатии на confirm сначала выполняется onConfirm (если передан), затем onClose
- При нажатии на cancel вызывается только onClose
*/

const Modal = ({
  isOpen, 
  onClose, 
  text, 
  confirmText = "ОК", 
  cancelText = "Отмена", 
  onConfirm
} : ModalProps) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  return (
    <div className="modal-window">
      <div className="modal-window-container">
        <div className="modal-text">
          {text}
        </div>
        <div className="modal-btns">
          <div className="modal-btn" onClick={handleConfirm}>
            {confirmText}
          </div>
          <div className="modal-btn" onClick={onClose}>
            {cancelText}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
