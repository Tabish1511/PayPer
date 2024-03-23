import { FC, ReactNode } from 'react';
import { Button } from './Button';
import axios from 'axios';
import { Heading } from './Heading';
import { SubHeading } from './SubHeading';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  clientId: number;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, clientId }) => {
  if (!isOpen) return null;

  const handleYesButtonClick = async () => {
    try {
      await axios.patch("http://localhost:3000/api/v1/client/paid", {
        id: clientId
      }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      });
      onClose();
    } catch (error) {
      console.error("Error occurred while updating client:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center" onClick={onClose}>
      <div className="bg-white p-5 h-72 w-96 rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="mt-3">
          <Heading label="Payment received" />
          <SubHeading label="Are you sure you would like to perform this action?" />
          <div className='flex justify-center'>
            <Button label="No" onClick={onClose} className="w-32" />
            <Button label="Yes" onClick={handleYesButtonClick} className="w-32" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;


















































// import { FC, ReactNode } from 'react';

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   children: ReactNode;
// }

// const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center" onClick={onClose}>
//       <div className="bg-white p-5 h-80 w-96 rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()}>
//         {children}
//       </div>
//     </div>
//   );
// };

// export default Modal;
