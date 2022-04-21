import { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import modalLogo from '../../assets/modal-logo2.svg';
import map from '../../assets/map.png';
import download from '../../assets/download.png';
import { setActivePage } from '../../store/slices/activePageSlice';
import { useDispatch } from 'react-redux';
import 'react-responsive-modal/styles.css';
import './InformationalPortalModal.scss';

const InformationalPortalModal = () => {
  const [openModal, setOpenModal] = useState(true);
  const dispatch = useDispatch();

  const getActivePage = (event: any) => {
    const page = event.target.value;
    dispatch(setActivePage(page));
    setOpenModal(false);
  };
  return (
    <div className='informational-portal-modal'>
      <Modal
        closeOnOverlayClick={false}
        showCloseIcon={false}
        classNames={{
          modal: 'modal',
          overlay: 'modal-overlay',
        }}
        open={openModal}
        onClose={() => setOpenModal(false)}
        center
      >
        <div className='portal-modal-wrapper'>
          <div className='close-modal-btn'>
            <button onClick={() => setOpenModal(false)}>
              <i className='ri-close-circle-line'></i>
            </button>
          </div>
          <div className='portal-modal-header'>
            <img src={modalLogo} alt='Web-Based Hydrologic Informational Portal logo' />
          </div>
          <div className='portal-modal-content'>
            <div className='left-side'>
              <img src={map} alt='Example of the map' />
              <button value='explore-data' onClick={getActivePage}>
                EXPLORE DATA
              </button>
            </div>
            <div className='right-side'>
              <img src={download} alt='example of export functionality' />
              <button value='download-data' onClick={getActivePage}>
                DOWNLOAD DATA
              </button>
            </div>
          </div>
          <div className='portal-modal-footer'>
            <p className='mobile-screen'>
              The WHIP is best viewed from your desktop computer using Google Chrome or Firefox.
            </p>
            {/*<p className='desktop-screen'>
              Disclaimer: Any legal copy can go here Augue interdum velit euismod in pellentesque massa placerat
              duisultricies
            </p>*/}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default InformationalPortalModal;
